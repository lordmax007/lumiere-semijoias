import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#333', lineHeight:1.8 }
const h1 = { fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:19, color:'#b8922a', margin:'32px 0 8px' }

export default function Privacidade() {
  return (
    <div style={s}>
      <SEOMeta title="Política de Privacidade" />
      <h1 style={h1}>Política de Privacidade</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <h2 style={h2}>1. Quem somos (Controlador dos Dados)</h2>
      <p><strong>[PREENCHER — razão social ou nome completo]</strong>, inscrito(a) no CPF/CNPJ <strong>[PREENCHER]</strong>, com sede em <strong>[PREENCHER endereço]</strong>, é o controlador dos dados pessoais tratados por este site. Responsável pela proteção de dados (DPO): <strong>[PREENCHER nome]</strong> — <a href="mailto:[PREENCHER]" style={{ color:'#D4AF37' }}>[PREENCHER e-mail]</a>.</p>

      <h2 style={h2}>2. Quais dados coletamos</h2>
      <ul>
        <li><strong>Dados de cadastro:</strong> nome e e-mail, fornecidos voluntariamente ao criar conta.</li>
        <li><strong>Dados de navegação:</strong> endereço IP, páginas visitadas, tempo de sessão (via cookies).</li>
        <li><strong>Dados de atendimento:</strong> mensagens enviadas pelo formulário de contato.</li>
      </ul>

      <h2 style={h2}>3. Para quê usamos</h2>
      <ul>
        <li>Criar e gerenciar sua conta no site;</li>
        <li>Processar pedidos e responder solicitações de contato;</li>
        <li>Melhorar a experiência de navegação (análise anônima de uso);</li>
        <li>Enviar comunicações de marketing — <strong>somente com seu consentimento expresso.</strong></li>
      </ul>

      <h2 style={h2}>4. Base legal (LGPD, art. 7º)</h2>
      <ul>
        <li><em>Execução de contrato</em> — para processar pedidos;</li>
        <li><em>Legítimo interesse</em> — para segurança e funcionamento do site;</li>
        <li><em>Consentimento</em> — para cookies não essenciais e marketing.</li>
      </ul>

      <h2 style={h2}>5. Com quem compartilhamos</h2>
      <ul>
        <li><strong>Supabase</strong> (supabase.io) — armazenamento de dados e autenticação;</li>
        <li></li>
        <li><strong>Resend</strong> — envio de e-mails transacionais.</li>
      </ul>
      <p>Não vendemos dados pessoais a terceiros.</p>

      <h2 style={h2}>6. Por quanto tempo guardamos</h2>
      <ul>
        <li>Dados de pedidos: 5 anos (obrigação fiscal/legal);</li>
        <li>Dados de conta: enquanto a conta existir + 6 meses após exclusão;</li>
        <li>Cookies de sessão: conforme a <a href="/cookies" style={{ color:'#D4AF37' }}>Política de Cookies</a>.</li>
      </ul>

      <h2 style={h2}>7. Seus direitos (LGPD, art. 18)</h2>
      <p>Você pode solicitar: acesso, correção, exclusão, portabilidade, revogação do consentimento, e informações sobre o compartilhamento dos seus dados. Entre em contato pelo e-mail <a href="mailto:[PREENCHER]" style={{ color:'#D4AF37' }}>[PREENCHER]</a> com assunto "Direitos LGPD".</p>

      <h2 style={h2}>8. Segurança</h2>
      <p>Utilizamos criptografia TLS em trânsito, Row Level Security (RLS) no banco de dados Supabase, e acesso restrito por funções. Nenhuma medida é 100% infalível; em caso de incidente, notificaremos os titulares afetados.</p>

      <h2 style={h2}>9. Alterações nesta política</h2>
      <p>Esta política pode ser atualizada. A versão mais recente estará sempre nesta página com a data de atualização.</p>

      <h2 style={h2}>10. Contato</h2>
      <p>Para qualquer dúvida sobre esta política: <a href="mailto:[PREENCHER]" style={{ color:'#D4AF37' }}>[PREENCHER e-mail]</a> | WhatsApp: <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>(93) 99217-5713</a></p>

      <p style={{ marginTop:40, padding:16, background:'#fff3cd', borderRadius:8, fontSize:13, color:'#856404' }}>
        ⚠️ <strong>Aviso:</strong> Este texto é um modelo e deve ser revisado por um advogado especializado em LGPD antes da publicação do site.
      </p>
    </div>
  )
}
