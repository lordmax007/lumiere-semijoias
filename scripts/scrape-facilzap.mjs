import puppeteer from 'puppeteer'

const url = 'https://facilzap.com.br/perolladotapajos'

console.log('Abrindo navegador...')
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()

console.log('Acessando:', url)
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })

// Fechar cookie banner
try {
  await page.waitForSelector('button', { timeout: 5000 })
  const cookieBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'))
    return btns.find(b => b.textContent.includes('Compreendo') || b.textContent.includes('Aceitar'))
  })
  if (cookieBtn) {
    await cookieBtn.click()
    console.log('Cookie banner fechado')
    await new Promise(r => setTimeout(r, 1000))
  }
} catch (e) {
  console.log('Sem cookie banner')
}

// Fechar modal "Informações da Loja"
try {
  const modalCloseBtn = await page.evaluateHandle(() => {
    // Tentar botão X
    const closeX = document.querySelector('.modal button.close, .modal .btn-close, button[data-dismiss="modal"]')
    if (closeX) return closeX

    // Tentar botão "Seguir"
    const btns = Array.from(document.querySelectorAll('button'))
    return btns.find(b => b.textContent.includes('Seguir'))
  })

  if (modalCloseBtn) {
    await modalCloseBtn.click()
    console.log('Modal fechado')
    await new Promise(r => setTimeout(r, 2000))
  }
} catch (e) {
  console.log('Sem modal:', e.message)
}

await new Promise(r => setTimeout(r, 2000))

// Screenshot após fechar modais
await page.screenshot({ path: 'facilzap-debug2.png' })
console.log('Screenshot 2 salvo')

console.log('Aguardando produtos carregarem...')

// Esperar produtos aparecerem no DOM
await page.waitForSelector('.card-produto, [data-produto-id], .produto-item', { timeout: 30000 })
console.log('Produtos carregados no DOM')

// Extrair produtos do DOM da página
const produtos = await page.evaluate(() => {
  const cards = Array.from(document.querySelectorAll('[data-produto-id], .card-produto, .produto-item, .produto'))

  return cards.map(card => {
    const id = card.getAttribute('data-produto-id') || card.id

    // Tentar vários seletores para nome
    const nomeEl = card.querySelector('[data-produto-nome], .produto-nome, .card-title, .nome, h3, h4, h5')
    const nome = nomeEl?.textContent?.trim() || nomeEl?.innerText?.trim()

    // Preço
    const precoEl = card.querySelector('[data-produto-preco], .produto-preco, .price, .preco')
    const preco = precoEl?.textContent?.trim() || precoEl?.innerText?.trim()

    // Imagem
    const img = card.querySelector('img')?.src

    // Disponibilidade
    const esgotado = card.classList.contains('esgotado') ||
                     card.classList.contains('indisponivel') ||
                     card.querySelector('.esgotado, .indisponivel')
    const disponivel = !esgotado

    const sem_foto = !img || img.includes('sem-foto') || img.includes('placeholder') || img.includes('default')

    if (nome) {
      return { id: id || nome, nome, preco, img, disponivel, sem_foto }
    }
    return null
  }).filter(Boolean)
})

console.log(`Total produtos: ${produtos.length}`)

if (produtos.length > 0) {
  const disponiveis = produtos.filter(p => p.disponivel && !p.sem_foto)
  const indisponiveis = produtos.filter(p => !p.disponivel || p.sem_foto)

  console.log(`Disponíveis: ${disponiveis.length}`)
  console.log(`Indisponíveis: ${indisponiveis.length}`)

  console.log('\n=== PRODUTOS INDISPONÍVEIS/SEM FOTO ===')
  indisponiveis.forEach(p => {
    console.log(`- ${p.nome} (ID: ${p.id}, sem_foto: ${p.sem_foto}, disponivel: ${p.disponivel})`)
  })

  // Salvar JSON
  const fs = await import('fs')
  fs.writeFileSync('facilzap-products.json', JSON.stringify(produtos, null, 2))
  fs.writeFileSync('facilzap-indisponiveis.json', JSON.stringify(indisponiveis, null, 2))
  console.log('\n✅ Salvos: facilzap-products.json, facilzap-indisponiveis.json')
} else {
  console.log('❌ Nenhum produto encontrado')
}

await browser.close()
