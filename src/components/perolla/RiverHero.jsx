import { useEffect, useRef } from 'react'

// ── Ajuste aqui ───────────────────────────────────────────────────────────────
const CFG = {
  waveSpeed:       2.8,    // velocidade das ondas (maior = mais agitado)
  waveAmplitude:   42,     // altura das ondas em px
  moonGlow:        0.75,   // brilho do reflexo da lua (0–1)
  sparkleCount:    90,     // quantidade de cintilações
  fps:             50,
  moonX:           0.5,    // posição horizontal da lua (0=esquerda, 1=direita)
}
// ─────────────────────────────────────────────────────────────────────────────

const COLORS = {
  bg:      ['#010c10', '#021820', '#011520'],
  wave:    ['rgba(2,40,55,0.85)', 'rgba(3,55,70,0.7)', 'rgba(1,30,42,0.9)', 'rgba(4,65,80,0.6)'],
  reflect: 'rgba(212,168,40,',   // prefixo — adicionar alpha depois
  sparkle: ['rgba(255,220,100,', 'rgba(255,240,160,', 'rgba(200,180,80,'],
}

function initSparkles(w, h) {
  return Array.from({ length: CFG.sparkleCount }, () => ({
    x: Math.random() * w,
    y: h * 0.3 + Math.random() * h * 0.65,
    r: 0.6 + Math.random() * 1.8,
    a: Math.random(),
    da: 0.008 + Math.random() * 0.018,
    color: COLORS.sparkle[Math.floor(Math.random() * COLORS.sparkle.length)],
  }))
}

function drawFrame(canvas, ctx, t, sparkles) {
  const W = canvas.width
  const H = canvas.height
  const moonCX = W * CFG.moonX

  // --- fundo degradê --------------------------------------------------------
  const bg = ctx.createLinearGradient(0, 0, 0, H)
  bg.addColorStop(0,   COLORS.bg[0])
  bg.addColorStop(0.5, COLORS.bg[1])
  bg.addColorStop(1,   COLORS.bg[2])
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  // --- reflexo da lua (faixa vertical central, vertical) --------------------
  const reflH = H * 0.75
  const reflW = W * 0.18
  const refl = ctx.createLinearGradient(0, H * 0.18, 0, H)
  refl.addColorStop(0,   COLORS.reflect + '0.0)')
  refl.addColorStop(0.2, COLORS.reflect + (CFG.moonGlow * 0.6).toFixed(2) + ')')
  refl.addColorStop(0.6, COLORS.reflect + (CFG.moonGlow * 0.35).toFixed(2) + ')')
  refl.addColorStop(1,   COLORS.reflect + '0.0)')
  ctx.save()
  // distorção ondulada no reflexo
  ctx.beginPath()
  const rx = moonCX - reflW / 2 + Math.sin(t * 0.9) * 8
  ctx.rect(rx - 10, H * 0.15, reflW + 20, reflH)
  ctx.clip()
  ctx.fillStyle = refl
  ctx.fillRect(rx, H * 0.15, reflW, reflH)
  ctx.restore()

  // --- ondas (4 camadas) ----------------------------------------------------
  const numWaves = 4
  for (let i = 0; i < numWaves; i++) {
    const phase   = t * CFG.waveSpeed * (0.7 + i * 0.3) + i * 1.5
    const phase2  = t * CFG.waveSpeed * (0.4 + i * 0.2) - i * 0.8
    const yBase   = H * (0.22 + i * 0.17)
    const amp     = CFG.waveAmplitude * (1 - i * 0.1)
    const freq    = 0.007 + i * 0.003
    const freq2   = 0.014 + i * 0.005
    const freq3   = 0.025 + i * 0.006

    ctx.beginPath()
    ctx.moveTo(0, H)
    for (let x = 0; x <= W; x += 2) {
      const y = yBase
        + Math.sin(x * freq  + phase)  * amp
        + Math.sin(x * freq2 - phase2) * amp * 0.6
        + Math.sin(x * freq3 + phase * 1.4) * amp * 0.35
        + Math.cos(x * 0.003 + phase * 0.5) * amp * 0.2
      ctx.lineTo(x, y)
    }
    ctx.lineTo(W, H)
    ctx.closePath()
    ctx.fillStyle = COLORS.wave[i]
    ctx.fill()
  }

  // --- cristas de onda (linhas brilhantes) ----------------------------------
  for (let i = 0; i < 3; i++) {
    const phase = t * CFG.waveSpeed * (0.8 + i * 0.3) + i * 2.1
    const yBase = H * (0.28 + i * 0.2)
    const amp   = CFG.waveAmplitude * 0.7

    ctx.beginPath()
    for (let x = 0; x <= W; x += 3) {
      const y = yBase
        + Math.sin(x * 0.009 + phase) * amp
        + Math.sin(x * 0.015 - phase * 0.8) * amp * 0.5
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
    }
    ctx.strokeStyle = `rgba(180,210,220,${0.06 + i * 0.02})`
    ctx.lineWidth = 1.2
    ctx.stroke()
  }

  // --- cintilações ----------------------------------------------------------
  for (const s of sparkles) {
    s.a += s.da
    if (s.a > 1 || s.a < 0) {
      s.da = -s.da
      if (s.a < 0) {
        s.x = Math.random() * W
        s.y = H * 0.3 + Math.random() * H * 0.65
        s.a = 0
      }
    }
    const alpha = Math.abs(Math.sin(s.a * Math.PI)) * 0.85
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fillStyle = s.color + alpha.toFixed(2) + ')'
    ctx.fill()
  }

  // --- vinheta --------------------------------------------------------------
  const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, W*0.8)
  vig.addColorStop(0,   'rgba(0,0,0,0)')
  vig.addColorStop(0.7, 'rgba(0,0,0,0.15)')
  vig.addColorStop(1,   'rgba(0,0,0,0.6)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)
}

export default function RiverHero({ children }) {
  const canvasRef = useRef(null)
  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId, lastFrame = 0, paused = false
    const interval = 1000 / CFG.fps
    let sparkles = []

    function resize() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (!w || !h) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      sparkles = initSparkles(w, h)
      if (reduced) {
        drawFrame(canvas, ctx, 0, sparkles)
      }
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    if (!reduced) {
      function loop(ts) {
        animId = requestAnimationFrame(loop)
        if (paused || ts - lastFrame < interval) return
        lastFrame = ts
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        ctx.setTransform(1,0,0,1,0,0)
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        ctx.scale(dpr, dpr)
        drawFrame({ width: w, height: h }, ctx, ts * 0.001, sparkles)
      }
      animId = requestAnimationFrame(loop)

      const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting })
      io.observe(canvas)
      const onVis = () => { paused = document.hidden }
      document.addEventListener('visibilitychange', onVis)

      return () => {
        cancelAnimationFrame(animId)
        ro.disconnect()
        io.disconnect()
        document.removeEventListener('visibilitychange', onVis)
      }
    }

    return () => ro.disconnect()
  }, [reduced])

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '420px' }}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 1 }}>
        <img
          src="/imgs/logo-perolla-transparent.png"
          alt="Pérolla do Tapajós"
          style={{
            maxWidth: 'min(500px, 88vw)',
            width: '100%',
            filter: 'drop-shadow(0 0 20px rgba(212,168,40,0.55))',
          }}
          loading="eager"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative flex flex-col items-center justify-end text-center text-white px-4 pb-10 pt-64 md:pt-72" style={{ zIndex: 2, minHeight: '420px' }}>
        {children}
      </div>
    </div>
  )
}
