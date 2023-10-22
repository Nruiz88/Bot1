const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['filmento', 'fila']).addAnswer(
    [
        '📄 En este momento no Contamos con Ningun Stock de Filamento',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aca encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['pedidos', 'pedido']).addAnswer(
    [
        '🚀 Puedes revisar nuestros productos Online',
        '[*WebShop*] https://craft3d.com.ar',
        '[*Instagram*] https://www.instagram.com/craft3d_nqn/',
        '[*Facebook*] https://www.facebook.com/craft3dnqn/',
        '[*Volver*]',
        
        ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['presupuesto', 'Presupuesto']).addAnswer(
    ['🤪 Mandanos tu Stl o tu idea para que te la Cotizemos'],
    ['Volver'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'volver'])
    .addAnswer('🙌 Hola, que tal, en que podemos ayudarte?')
    .addAnswer(
        [
            'te comparto las siguientes opciones',
            '👉 *Filamento* para ver nuestro Stock',
            '👉 *Pedidos*  para ver nuestros productos',
            '👉 *Presupuesto* para consultarnos',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
