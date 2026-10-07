export const collections = [
  { id: '1', name: 'Minimalista',   slug: 'minimalista',   image: '/imgs/col-minimalista.jpg',    description: 'Peças simples e sofisticadas' },
  { id: '2', name: 'Boêmia',        slug: 'bohemia',        image: '/imgs/col-bohemia.jpg',         description: 'Liberdade e estilo próprio' },
  { id: '3', name: 'Clássica',      slug: 'classica',       image: '/imgs/col-classica.jpg',        description: 'Elegância atemporal' },
  { id: '4', name: 'Contemporânea', slug: 'contemporanea',  image: '/imgs/col-contemporanea.jpg',   description: 'Design moderno e ousado' },
]

export const products = [
  {
    id: '1', name: 'Anel Fio Dourado', slug: 'anel-fio-dourado',
    price: 8990, original_price: 12990,
    images: ['/imgs/p01-anel-fio.jpg', '/imgs/p02-aneis-empilhados.jpg'],
    collection_id: '1', stock: 15, active: true,
    description: 'Anel delicado em banho de ouro 18k. Hipoalergênico e resistente ao dia a dia.',
    variants: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: '2', name: 'Colar Pérola Natural', slug: 'colar-perola-natural',
    price: 15990, original_price: 19990,
    images: ['/imgs/p03-colar-perola.jpg', '/imgs/p10-conjunto-colar.jpg'],
    collection_id: '3', stock: 8, active: true,
    description: 'Colar com pérola natural cultivada, corrente banhada a ouro 18k.',
  },
  {
    id: '3', name: 'Brinco Argola Slim', slug: 'brinco-argola-slim',
    price: 5990, original_price: null,
    images: ['/imgs/p04-brinco-argola.jpg', '/imgs/p09-brinco-lua.jpg'],
    collection_id: '1', stock: 20, active: true,
    description: 'Brinco argola fininha banhada a ouro. Leve e sofisticado.',
  },
  {
    id: '4', name: 'Pulseira Elos Dourados', slug: 'pulseira-elos-dourados',
    price: 10990, original_price: 14990,
    images: ['/imgs/p05-pulseira-elos.jpg', '/imgs/p11-pulseira-coracao.jpg'],
    collection_id: '3', stock: 12, active: true,
    description: 'Pulseira de elos lisos em banho de ouro 18k. Fecho lagosta.',
  },
  {
    id: '5', name: 'Colar Boho Turquesa', slug: 'colar-boho-turquesa',
    price: 13490, original_price: 17990,
    images: ['/imgs/p06-colar-turquesa.jpg', '/imgs/p07-colar-turquesa2.jpg'],
    collection_id: '2', stock: 6, active: true,
    description: 'Colar com pedras de turquesa e detalhes dourados feitos à mão.',
  },
  {
    id: '6', name: 'Anel Solitário Cristal', slug: 'anel-solitario-cristal',
    price: 11990, original_price: 15990,
    images: ['/imgs/p08-anel-cristal.jpg', '/imgs/p01-anel-fio.jpg'],
    collection_id: '4', stock: 10, active: true,
    description: 'Anel solitário com cristal zircônia AAAAA e banho de ouro 18k.',
    variants: ['PP', 'P', 'M', 'G', 'GG'],
  },
  {
    id: '7', name: 'Brinco Pingente Lua', slug: 'brinco-pingente-lua',
    price: 7990, original_price: 9990,
    images: ['/imgs/p09-brinco-lua.jpg', '/imgs/p04-brinco-argola.jpg'],
    collection_id: '2', stock: 18, active: true,
    description: 'Brinco pingente em formato de lua crescente, banhado a ouro.',
  },
  {
    id: '8', name: 'Conjunto Colar + Brinco', slug: 'conjunto-colar-brinco',
    price: 24990, original_price: 32990,
    images: ['/imgs/p10-conjunto-colar.jpg', '/imgs/p03-colar-perola.jpg'],
    collection_id: '3', stock: 5, active: true,
    description: 'Conjunto completo com colar choker e brincos combinando, banhados a ouro.',
  },
  {
    id: '9', name: 'Tornozeleira Delicada', slug: 'tornozeleira-delicada',
    price: 6990, original_price: null,
    images: ['/imgs/p11-pulseira-coracao.jpg', '/imgs/p05-pulseira-elos.jpg'],
    collection_id: '1', stock: 14, active: true,
    description: 'Tornozeleira fina com pingente coração, banhada a ouro 18k.',
  },
  {
    id: '10', name: 'Anel Geométrico Bold', slug: 'anel-geometrico-bold',
    price: 14990, original_price: 18990,
    images: ['/imgs/p12-anel-geometrico.jpg', '/imgs/p08-anel-cristal.jpg'],
    collection_id: '4', stock: 9, active: true,
    description: 'Anel largo com design geométrico contemporâneo em prata com banho de ouro.',
    variants: ['P', 'M', 'G'],
  },
  {
    id: '11', name: 'Colar Choker Veludo', slug: 'colar-choker-veludo',
    price: 8490, original_price: 10990,
    images: ['/imgs/p13-choker.jpg', '/imgs/p07-colar-turquesa2.jpg'],
    collection_id: '4', stock: 0, active: true,
    description: 'Choker de veludo preto com pingente dourado exclusivo.',
  },
  {
    id: '12', name: 'Pulseira Cristais Coloridos', slug: 'pulseira-cristais-coloridos',
    price: 9990, original_price: 12990,
    images: ['/imgs/p14-pulseira-cristais.jpg', '/imgs/p05-pulseira-elos.jpg'],
    collection_id: '2', stock: 11, active: true,
    description: 'Pulseira elástica com cristais multicoloridos de alta qualidade.',
  },
]

export const reviews = [
  { id: '1', name: 'Ana Carolina', rating: 5, text: 'Amei demais! A qualidade é incrível e o acabamento é perfeito. Super recomendo!' },
  { id: '2', name: 'Mariana S.', rating: 5, text: 'Entrega super rápida e a semijoia é linda de verdade. Já é o terceiro pedido!' },
  { id: '3', name: 'Juliana M.', rating: 5, text: 'O colar chegou numa caixinha linda. Presentei minha mãe e ela adorou!' },
  { id: '4', name: 'Fernanda R.', rating: 5, text: 'Qualidade excelente! Uso todo dia e não manchou nada. Vale muito o investimento.' },
  { id: '5', name: 'Beatriz L.', rating: 5, text: 'Finalmente uma semijoia que não oxida! Estou super satisfeita com a compra.' },
]

export const formatPrice = (cents) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
