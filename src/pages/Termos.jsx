import SEOMeta from '../components/SEOMeta'

const s = { maxWidth:720, margin:'0 auto', padding:'48px 20px', color:'#333', lineHeight:1.8 }
const h2 = { fontFamily:'serif', fontWeight:400, fontSize:19, color:'#b8922a', margin:'32px 0 8px' }

export default function Termos() {
  return (
    <div style={s}>
      <SEOMeta title="Termos de Uso" />
      <h1 style={{ fontFamily:'serif', fontWeight:300, fontSize:34, color:'#D4AF37', marginBottom:8 }}>Termos de Uso</h1>
      <p style={{ color:'#888', fontStyle:'italic', fontSize:13, marginBottom:32 }}>Última atualização: outubro de 2026</p>

      <h2 style={h2}>1. Uso do site</h2>
      <p>O site da Pérolla do Tapajós é destinado ao uso pessoal e não comercial. É proibido reproduzir, distribuir ou usar o conteúdo do site para fins comerciais sem autorização expressa.</p>

      <h2 style={h2}>2. Cadastro e responsabilidade</h2>
      <p>Ao criar uma conta, você se compromete a fornecer informações verdadeiras e a manter seus dados atualizados. Você é responsável pela segurança da sua senha e pelas ações realizadas com sua conta.</p>

      <h2 style={h2}>3. Propriedade intelectual</h2>
      <p>Todas as imagens, textos, logotipos e elementos visuais do site são propriedade da Pérolla do Tapajós ou de seus fornecedores. O uso não autorizado constitui violação dos direitos de propriedade intelectual.</p>

      <h2 style={h2}>4. Produtos e preços</h2>
      <p>Nos reservamos o direito de alterar preços e disponibilidade de produtos sem aviso prévio. Erros de precificação serão comunicados antes da conclusão da compra. O contrato de compra e venda se forma apenas após a confirmação do pedido.</p>

      <h2 style={h2}>5. Limitação de responsabilidade</h2>
      <p>A Pérolla do Tapajós não se responsabiliza por danos indiretos decorrentes do uso do site. Nossa responsabilidade fica limitada ao valor do produto adquirido, nos termos do Código de Defesa do Consumidor.</p>

      <h2 style={h2}>6. Foro</h2>
      <p>Para dirimir qualquer controvérsia decorrente destes Termos, fica eleito o foro da comarca de <strong>Santarém-PA</strong>, com renúncia a qualquer outro, por mais privilegiado que seja.</p>

      <h2 style={h2}>7. Contato</h2>
      <p>Dúvidas: <a href="mailto:[PREENCHER]" style={{ color:'#D4AF37' }}>[PREENCHER e-mail]</a> | WhatsApp <a href="https://wa.me/5593992175713" style={{ color:'#D4AF37' }}>(93) 99217-5713</a></p>

      <p style={{ marginTop:40, padding:16, background:'#fff3cd', borderRadius:8, fontSize:13, color:'#856404' }}>
        ⚠️ Modelo — revise com advogado antes de publicar.
      </p>
    </div>
  )
}
