const { Telegraf } = require('telegraf');
const fetch = require('node-fetch')
const mongoose = require('mongoose');

const logo = 'https://i.imgur.com/ZCeiOY4.jpg';
const apikasu = "https://apikasu.onrender.com"
const apikey = "SebastianDevelop"
const bot = new Telegraf('');
const mongoUrl = '';

console.log(`
 ████████╗ █████╗ ██╗     ██╗  ██╗██╗    ██████╗  ██████╗ ████████╗
 ╚══██╔══╝██╔══██╗██║     ██║ ██╔╝██║    ██╔══██╗██╔═══██╗╚══██╔══╝
    ██║   ███████║██║     █████╔╝ ██║    ██████╔╝██║   ██║   ██║   
    ██║   ██╔══██║██║     ██╔═██╗ ██║    ██╔══██╗██║   ██║   ██║   
    ██║   ██║  ██║███████╗██║  ██╗██║    ██████╔╝╚██████╔╝   ██║   
    ╚═╝   ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝    ╚═════╝  ╚═════╝    ╚═╝ @Sebastian @Traxnox
                      BOT DE TELEGRAM

Intentando hacer conexión con la base de datos de MongoDB`);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, '\x1b[41m\x1b[30m%s\x1b[0m', 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('\x1b[42m\x1b[30m%s\x1b[0m', 'Conexión exitosa a MongoDB');
});
const userSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    username: String,
    firstName: String,
    lastName: String,
    fullName: String,
    chatType: String,
    languageCode: String,
    Dinero: String,
    Avatar: String,
    lastWorkTime: { type: Date, default: null },
    DiasTrabajados: String,
    Patrimonio: String,
    Propiedades: String,
});
const User = mongoose.model('User', userSchema);


// menus (modificar los 2)
bot.start(async (ctx) => {
    const user = ctx.from;
    const name = ctx.message.from.first_name;
    const menu = `
𝗛𝗼𝗹𝗮: ${name}
    
      𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 𝗗𝗘 𝗧𝗔𝗟𝗞𝗜
        
        𝗔𝗖𝗘𝗥𝗖𝗔 𝗗𝗘
        
        /help
        /creadores
        /cuentasoficiales
        /miapi
        /ping
        /info
    
        𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡
    
        /cambiarnombre
        /cambiarfoto
        /perfil
        
        𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦
        
        /chatgpt
        /bard
        /gemini
        /ipinfo
        /bingcreator
        /imagina
        /imagina2
    
        𝗘𝗖𝗢𝗡𝗢𝗠𝗜𝗔
    
        /trabajar
        /interesesportrabajo
        /comprarpropiedad
    
        𝗝𝗨𝗘𝗚𝗢𝗦
    
        /ahorcado
        
        𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦, 𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔𝗦 𝗬 𝗦𝗧𝗔𝗟𝗞𝗘𝗢𝗦
        
        /tiktokstalk
        /instagramstalk
        /letra
        /spotify
        /applemusic
        /deezer
        /googlesearch
        /image
        /pinterest
        /wallpaper
        /facebook
        /youtubevideo
        /youtubechannel
        /youtubeaudio
        /tiktok
        /tiktokimg
        /instagram
        /instagramstory
        /twitter
        /threads
        /mediafire
        /googledrive`
    try {
        const fullName = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        await User.updateOne({ userId: user.id }, {
            userId: user.id,
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name || '',
            fullName: fullName,
            chatType: ctx.chat.type,
            languageCode: ctx.from.language_code,
            Dinero: 1,
            Patrimonio: 1,
            Propiedades: 1,
            DiasTrabajados: 1,
            Avatar: 'https://i.imgur.com/ZCeiOY4.jpg'
        }, { upsert: true });
        ctx.replyWithPhoto({ url: logo }, {
            caption: menu,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Mis creadores', callback_data: 'creadores' }],
                    [{ text: 'Mis cuentas oficiales', callback_data: 'cuentasoficiales' }],
                ],
            },
        });
    } catch (error) {
        console.error('Error al guardar la información del usuario en MongoDB:', error);
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});
// menus (modificar los 2)
bot.command('help', async (ctx) => {
    const name = ctx.message.from.first_name;
    const menu = `
𝗛𝗼𝗹𝗮: ${name}
    
    𝗠𝗘𝗡𝗨 𝗖𝗢𝗠𝗣𝗟𝗘𝗧𝗢 𝗗𝗘 𝗧𝗔𝗟𝗞𝗜
      
      𝗔𝗖𝗘𝗥𝗖𝗔 𝗗𝗘
      
      /help
      /creadores
      /cuentasoficiales
      /miapi
      /ping
      /info
  
      𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡
  
      /cambiarnombre
      /cambiarfoto
      /perfil
      
      𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦
      
      /chatgpt
      /bard
      /gemini
      /ipinfo
      /bingcreator
      /imagina
      /imagina2
  
      𝗘𝗖𝗢𝗡𝗢𝗠𝗜𝗔
  
      /trabajar
      /interesesportrabajo
      /comprarpropiedad
  
      𝗝𝗨𝗘𝗚𝗢𝗦
  
      /ahorcado
      
      𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦, 𝗕𝗨𝗦𝗤𝗨𝗘𝗗𝗔𝗦 𝗬 𝗦𝗧𝗔𝗟𝗞𝗘𝗢𝗦
      
      /tiktokstalk
      /instagramstalk
      /letra
      /spotify
      /applemusic
      /deezer
      /googlesearch
      /image
      /pinterest
      /wallpaper
      /facebook
      /youtubevideo
      /youtubechannel
      /youtubeaudio
      /tiktok
      /tiktokimg
      /instagram
      /instagramstory
      /twitter
      /threads
      /mediafire
      /googledrive`;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'Mis creadores', callback_data: 'creadores' }],
                [{ text: 'Mis cuentas oficiales', callback_data: 'cuentasoficiales' }],
            ],
        }
    });
});
//acciones de los botones del menu
bot.action('creadores', (ctx) => {
    ctx.reply(`
𝗦𝗲𝗯𝗮𝘀𝘁𝗶𝗮𝗻

𝗡𝗼𝗺𝗯𝗿𝗲: Sebastian
𝗡𝘂𝗺𝗲𝗿𝗼 𝘁𝗲𝗹𝗲𝗳𝗼𝗻𝗶𝗰𝗼: +57 301 4953662
𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: https://www.instagram.com/seebastian_88/
𝗚𝗶𝘁𝗛𝘂𝗯: https://github.com/BOT-TX

𝗚𝘂𝗶𝗹𝗹𝗲𝗿𝗺𝗼

𝗡𝗼𝗺𝗯𝗿𝗲: Guillermo
𝗡𝘂𝗺𝗲𝗿𝗼 𝘁𝗲𝗹𝗲𝗳𝗼𝗻𝗶𝗰𝗼: +593 99 566 8111
𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: https://www.instagram.com/traxnox/
𝗚𝗶𝘁𝗛𝘂𝗯: https://github.com/ByTraxnox-X`);
});
bot.action('cuentasoficiales', (ctx) => {
    ctx.reply(`
Mis unicas cuentas oficiales son las de este enlace!
https://solo.to/talki`);
});
// comienza categoria acerca de
let lastPingTime = 0;
bot.command('ping', async (ctx) => {
    const startTime = performance.now();
    await ctx.telegram.getMe()
        .then(() => {
            const endTime = performance.now();
            const pingTime = endTime - startTime;
            lastPingTime = pingTime;
            ctx.reply(`𝗣𝗶𝗻𝗴: ${pingTime.toFixed(2)} ms`);
        })
        .catch((error) => {
            console.error('Error al obtener información del bot');
            ctx.reply('Ocurrió un error al obtener información del bot.');
        });
});
bot.command('info', async (ctx) => {
    const activeStatus = (lastPingTime > 0) ? 'Activo' : 'Inactivo';
    const lastPing = (lastPingTime > 0) ? `${lastPingTime.toFixed(2)} ms` : 'N/A';
    ctx.reply(`
𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝗰𝗶𝗼𝗻 𝗱𝗲𝗹 𝗯𝗼𝘁:

𝗘𝘀𝘁𝗮𝗱𝗼: ${activeStatus}
𝗨𝗹𝘁𝗶𝗺𝗼 𝗽𝗶𝗻𝗴: ${lastPing}`);
});
bot.command('creadores', async (ctx) => {
    ctx.reply(`
𝗦𝗲𝗯𝗮𝘀𝘁𝗶𝗮𝗻

𝗡𝗼𝗺𝗯𝗿𝗲: Sebastian
𝗡𝘂𝗺𝗲𝗿𝗼 𝘁𝗲𝗹𝗲𝗳𝗼𝗻𝗶𝗰𝗼: +57 301 4953662
𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: https://www.instagram.com/seebastian_88/
𝗚𝗶𝘁𝗛𝘂𝗯: https://github.com/BOT-TX

𝗚𝘂𝗶𝗹𝗹𝗲𝗿𝗺𝗼

𝗡𝗼𝗺𝗯𝗿𝗲: Guillermo
𝗡𝘂𝗺𝗲𝗿𝗼 𝘁𝗲𝗹𝗲𝗳𝗼𝗻𝗶𝗰𝗼: +593 99 566 8111
𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: https://www.instagram.com/traxnox/
𝗚𝗶𝘁𝗛𝘂𝗯: https://github.com/ByTraxnox-X`);
});
bot.command('cuentasoficiales', (ctx) => {
    ctx.reply(`
Mis unicas cuentas oficiales son las de este enlace!
https://solo.to/talki`);
});
bot.command('miapi', async (ctx) => {
    ctx.reply(`
la unica API de nuestro team es la del siguiente link!
https://apikasu.onrender.com/`);
});
// termina comandos de acerca de

// PLUGINS


//comienza categoria de informacion
bot.command('cambiarnombre', async (ctx) => {
    const command = '/cambiarnombre';
    const userId = ctx.from.id;
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el nuevo nombre`);
        return;
    }
    try {
        const userDocument = await User.findOne({ userId: userId });
        if (userDocument) {
            userDocument.fullName = userText;
            await userDocument.save();
            ctx.reply(`𝗡𝗼𝗺𝗯𝗿𝗲 𝗮𝗰𝘁𝘂𝗮𝗹𝗶𝘇𝗮𝗱𝗼 𝗰𝗼𝗻 𝗲́𝘅𝗶𝘁𝗼 𝗮: ${userText}`);
        } else {
            ctx.reply('Usuario no encontrado en la base de datos.');
        }
    } catch (error) {
        console.error('Error al actualizar el nombre del usuario en MongoDB:', error);
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});

bot.command('perfil', async (ctx) => {
    const userId = ctx.from.id;
    try {
        const userDocument = await User.findOne({ userId: userId });
        if (userDocument) {
            const mensaje = `
𝗣𝗘𝗥𝗙𝗜𝗟

𝗡𝗼𝗺𝗯𝗿𝗲: ${userDocument.firstName}
𝗡𝗼𝗺𝗯𝗿𝗲 𝗰𝗼𝗺𝗽𝗹𝗲𝘁𝗼: ${userDocument.fullName}
𝗜𝗗: ${userDocument.userId}
𝗹𝗲𝗻𝗴𝘂𝗮𝗷𝗲: ${userDocument.languageCode}

𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡 𝗔𝗗𝗜𝗖𝗜𝗢𝗡𝗔𝗟:

𝗗𝗶𝗻𝗲𝗿𝗼: ${userDocument.Dinero}
𝗗𝗶𝗮𝘀 𝘁𝗿𝗮𝗯𝗮𝗷𝗮𝗱𝗼𝘀: ${userDocument.DiasTrabajados}
𝗣𝗮𝘁𝗿𝗶𝗺𝗼𝗻𝗶𝗼: ${userDocument.Patrimonio}
𝗣𝗿𝗼𝗽𝗶𝗲𝗱𝗮𝗱𝗲𝘀: ${userDocument.Propiedades}`
            ctx.replyWithPhoto({ url: userDocument.Avatar }, {
                caption: mensaje
            })
        } else {
            ctx.reply('Usuario no encontrado en la base de datos.');
        }
    } catch (error) {
        console.error('Error al leer el nombre del usuario en MongoDB:', error);
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});
bot.command('cambiarfoto', async (ctx) => {
    const command = '/cambiarfoto';
    const userId = ctx.from.id;
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace de la nueva foto`);
        return;
    }
    try {
        const userDocument = await User.findOne({ userId: userId });
        if (userDocument) {
            userDocument.Avatar = userText;
            await userDocument.save();
            ctx.replyWithPhoto({ url: userDocument.Avatar }, {
                caption: `𝗔𝘃𝗮𝘁𝗮𝗿 𝗔𝗰𝘁𝘂𝗮𝗹𝗶𝘇𝗮𝗱𝗼.`
            })
        } else {
            ctx.reply('Usuario no encontrado en la base de datos.');
        }
    } catch (error) {
        console.error('Error al actualizar el nombre del usuario en MongoDB:', error);
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});
//termina categoria de informacion


//comienza categoria de 𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦
bot.command('chatgpt', async (ctx) => {
    const command = '/chatgpt';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/chatgpt?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        ctx.reply(textResponse.result);
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('bard', async (ctx) => {
    const command = '/bard';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/bard?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        ctx.reply(textResponse.result);
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('gemini', async (ctx) => {
    const command = '/gemini';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/gemini?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        ctx.reply(textResponse.result);
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('ipinfo', async (ctx) => {
    const command = '/ipinfo';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa una IP`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/ip?ip=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        ctx.reply(`
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗜𝗣: ${result.query}
𝗣𝗮𝗶𝘀: ${result.country}
𝗖𝗼𝗱𝗶𝗴𝗼 𝗱𝗲 𝗽𝗮𝗶𝘀: ${result.countryCode}
𝗥𝗲𝗴𝗶𝗼𝗻: ${result.regionName}
𝗖𝗼𝗱𝗶𝗴𝗼 𝗱𝗲 𝗹𝗮 𝗿𝗲𝗴𝗶𝗼𝗻: ${result.region}
𝗖𝗶𝘂𝗱𝗮𝗱: ${result.city}
𝗭𝗜𝗣: ${result.zip}
𝗹𝗮𝘁𝗶𝘁𝘂𝗱: ${result.lat}
𝗟𝗼𝗻𝗴𝗶𝘁𝘂𝗱: ${result.lon}
𝗭𝗼𝗻𝗮 𝗵𝗼𝗿𝗮𝗿𝗶𝗮: ${result.timezone}
𝗜𝗦𝗣: ${result.isp}
𝗢𝗿𝗴𝗮𝗻𝗶𝘇𝗮𝗰𝗶𝗼𝗻: ${result.org}
𝗘𝗺𝗽𝗿𝗲𝘀𝗮 𝗱𝗲 𝘁𝗲𝗹𝗲𝗳𝗼𝗻𝗶𝗮: ${result.as}`);
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('bingcreator', async (ctx) => {
    const command = '/bingcreator';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa una peticion para crear la imagen`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/bingimg?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const imageUrl = `${result[0]}`;
        ctx.replyWithPhoto({ url: imageUrl });
    } else {
        ctx.reply('Hubo un error al obtener la creacion desde la API.');
    }
});

bot.command('imagina', async (ctx) => {
    const command = '/imagina';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa una peticion para crear la imagen`);
        return;
    }
    const apiUrl = `${apikasu}/api/tools/imagine?text=${encodeURIComponent(userText)}&apikey=${apikey}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const PhotoBuffer = await response.buffer();
            ctx.replyWithPhoto({ source: PhotoBuffer });
        } else {
            ctx.reply(`Error al generar la imagen`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:');
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});

bot.command('imagina2', async (ctx) => {
    const command = '/imagina2';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa una peticion para crear la imagen`);
        return;
    }
    const apiUrl = `${apikasu}/api/tools/imagine2?text=${encodeURIComponent(userText)}&apikey=${apikey}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const PhotoBuffer = await response.buffer();
            ctx.replyWithPhoto({ source: PhotoBuffer });
        } else {
            ctx.reply(`Error al generar la imagen`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:');
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});
//termina categoria de 𝗛𝗘𝗥𝗥𝗔𝗠𝗜𝗘𝗡𝗧𝗔𝗦


//inicia categoria de descarga, busqueda y stalkeo
bot.command('image', async (ctx) => {
    const command = '/image';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto para buscar la imagen`);
        return;
    }
    const response = await fetch(`${apikasu}/api/search/googleimg?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const imageUrl = `${result[0]}`;
        ctx.replyWithPhoto({ url: imageUrl });
    } else {
        ctx.reply('Hubo un error al obtener la imagen.');
    }
});
bot.command('pinterest', async (ctx) => {
    const command = '/pinterest';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto para buscar la imagen`);
        return;
    }
    const response = await fetch(`${apikasu}/api/search/pinterest?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const imageUrl = `${result[0]}`;
        ctx.replyWithPhoto({ url: imageUrl });
    } else {
        ctx.reply('Hubo un error al obtener la imagen.');
    }
});
bot.command('wallpaper', async (ctx) => {
    const command = '/wallpaper';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto para buscar el wallpaper`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/search/wallpaper?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
        if (response.ok) {
            const { result } = await response.json();
            if (result && result.length > 0) {
                const imageUrl = result[0].image;
                ctx.replyWithPhoto({ url: imageUrl });
            } else {
                ctx.reply('No se encontraron imágenes.');
            }
        } else {
            ctx.reply('Hubo un error al obtener la imagen.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud de wallpaper:', error);
        ctx.reply('Hubo un error al procesar la solicitud de wallpaper.');
    }
});


bot.command('googlesearch', async (ctx) => {
    const command = '/googlesearch';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un texto a buscar`);
        return;
    }
    const response = await fetch(`${apikasu}/api/search/google?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const respon = textResponse.result[0]
        const result = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${respon.title}
𝗟𝗶𝗻𝗸: ${respon.link}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻 𝗰𝗼𝗿𝘁𝗮: ${respon.snippet}     `
        ctx.reply(result)
    } else {
        ctx.reply('Hubo un error al obtener la creacion desde la API.');
    }
});

bot.command('tiktokstalk', async (ctx) => {
    const command = '/tiktokstalk';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un nombre de usuario de tiktok`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/tiktokstalk?username=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲 𝗱𝗲 𝘂𝘀𝘂𝗮𝗿𝗶𝗼: ${result.username}
𝗡𝗼𝗺𝗯𝗿𝗲: ${result.nickname}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻: ${result.description}
𝗦𝗲𝗴𝘂𝗶𝗱𝗼𝗿𝗲𝘀:: ${result.followers}
𝗦𝗶𝗴𝘂𝗶𝗲𝗻𝗱𝗼: ${result.following}
𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮𝗱𝗼: ${result.isVerify ? 'Si' : 'No'}
𝗖𝘂𝗲𝗻𝘁𝗮 𝗽𝗿𝗶𝘃𝗮𝗱𝗮: ${result.isPrivate ? 'Si' : 'No'}

𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡 ADICIONAL
𝗔𝗺𝗶𝗴𝗼𝘀: ${result.friends}
𝗟𝗶𝗸𝗲𝘀: ${result.totalLikes}
𝗩𝗶𝗱𝗲𝗼𝘀: ${result.totalVideos}
𝗥𝗲𝗴𝗶𝗼𝗻: ${result.region} `;
        const imageUrl = `${result.pp_thumbnail}`;
        ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('instagramstalk', async (ctx) => {
    const command = '/instagramstalk';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un nombre de usuario de instagram`);
        return;
    }
    const response = await fetch(`${apikasu}/api/tools/igstalk?username=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲 𝗱𝗲 𝘂𝘀𝘂𝗮𝗿𝗶𝗼: ${result.username}
𝗡𝗼𝗺𝗯𝗿𝗲: ${result.full_name}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻: ${result.biography}
𝗘𝗻𝗹𝗮𝗰𝗲𝘀 𝘃𝗶𝗻𝗰𝘂𝗹𝗮𝗱𝗼𝘀: ${result.external_url}
𝗦𝗲𝗴𝘂𝗶𝗱𝗼𝗿𝗲𝘀:: ${result.followers}
𝗦𝗶𝗴𝘂𝗶𝗲𝗻𝗱𝗼: ${result.following}
𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮𝗱𝗼: ${result.is_verified ? 'Si' : 'No'}
𝗖𝘂𝗲𝗻𝘁𝗮 𝗽𝗿𝗶𝘃𝗮𝗱𝗮: ${result.is_private ? 'Si' : 'No'}`;
        const imageUrl = `${result.profile_pic_url}`;
        ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('letra', async (ctx) => {
    const command = '/letra';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el nombre de la cancion`);
        return;
    }
    const response = await fetch(`${apikasu}/api/search/lyrics?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗔𝗿𝘁𝗶𝘀𝘁𝗮: ${result.artist}
𝗟𝗲𝘁𝗿𝗮: ${result.lyrics}`;
        ctx.reply(caption);
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('twitter', async (ctx) => {
    const command = '/twitter';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el link de twitter`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/twitter?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        ctx.replyWithVideo({ url: result.video });
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('facebook', async (ctx) => {
    const command = '/facebook';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace de Facebook`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/fbdown?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.result && textResponse.result) {
            const result = textResponse.result;
            ctx.replyWithVideo({ url: result.Normal_video });
        } else {
            ctx.reply('La API no devolvió la información esperada o no se encontró el enlace HD.');
        }
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('spotify', async (ctx) => {
    const command = '/spotify';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace de Spotify`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/search/spotifyinfo?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
        if (response.ok) {
            const sptyInfo = await response.json();
            const result = sptyInfo.spotify.resultado
            const audioBuffer = await fetch(`${apikasu}/api/dowloader/spotify?url=${result.url}&apikey=${apikey}`).then(res => res.buffer());
            const message = `
 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗔𝗿𝘁𝗶𝘀𝘁𝗮: ${result.artist}
𝗔𝗹𝗯𝘂𝗺: ${result.album}
𝗚𝗲𝗻𝗲𝗿𝗼: ${result.genre}
𝗣𝘂𝗯𝗹𝗶𝗰𝗮𝗱𝗼: ${result.year}`;
            ctx.replyWithAudio({ source: audioBuffer }, { caption: message });
        } else {
            ctx.reply('Hubo un error al obtener información de Spotify desde la API.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud de Spotify');
        ctx.reply('Hubo un error al procesar la solicitud de Spotify.');
    }
});
bot.command('deezer', async (ctx) => {
    function formatDuration(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const command = '/deezer';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace de Deezer`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/dowloader/deezer?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
        if (response.ok) {
            const sptyInfo = await response.json();
            const firstResult = sptyInfo.result[0]; 
            if (firstResult) {
                const audioUrl = firstResult.preview;
                const message = `
 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${firstResult.title}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${formatDuration(firstResult.duration)} Minutos
𝗟𝗶𝗻𝗸: ${firstResult.link}
𝗔𝗿𝘁𝗶𝘀𝘁𝗮: ${firstResult.artist.name}
𝗟𝗶𝗻𝗸 𝗱𝗲𝗹 𝗽𝗲𝗿𝗳𝗶𝗹 𝗱𝗲𝗹 𝗮𝗿𝘁𝗶𝘀𝘁𝗮: ${firstResult.artist.link}`;
                ctx.replyWithAudio({ url: audioUrl }, { caption: message });
            } else {
                ctx.reply('No se encontraron resultados de Deezer.');
            }
        } else {
            ctx.reply('Hubo un error al obtener información de Deezer desde la API.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud de Deezer:', error);
        ctx.reply('Hubo un error al procesar la solicitud de Deezer.');
    }
});

bot.command('applemusic', async (ctx) => {
    function formatDuration(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const command = '/applemusic';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace de Apple Music`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/dowloader/apple-music?url=${encodeURIComponent(userText)}&apikey=${apikey}`);
        if (response.ok) {
            const applemusic = await response.json();
            const result = applemusic.result;
            const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.name}
𝗔𝗿𝘁𝗶𝘀𝘁𝗮: ${result.artists}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${formatDuration(result.duration_ms)} Minutos
𝗧𝗶𝗽𝗼: ${result.type}`;
            const audioUrl = result.url;
            ctx.replyWithAudio({ url: audioUrl }, { caption: message });
        } else {
            ctx.reply('Hubo un error al obtener información de Apple Music desde la API.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud de Apple Music');
        ctx.reply('Hubo un error al procesar la solicitud de Apple Music.');
    }
});

bot.command('tiktok', async (ctx) => {
    const command = '/tiktok';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del video de TikTok`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/tikok?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
            const result = textResponse.result;
            const videoUrl = result.video
            const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲 𝗱𝗲 𝘂𝘀𝘂𝗮𝗿𝗶𝗼: ${result.username}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻: ${result.description}`;
            ctx.replyWithVideo({ url: videoUrl }, { caption: message });
        } else {
            ctx.reply('La API no devolvió la información esperada.');
        }
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('instagram', async (ctx) => {
    const command = '/instagram';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del video de Instagram`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/instagram?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const apiResponse = await response.json();
        if (apiResponse.status && apiResponse.result && apiResponse.result.length > 0) {
            const mediaArray = apiResponse.result;
            for (const mediaUrl of mediaArray) {
                if (mediaUrl.includes('.mp4')) {
                    ctx.replyWithVideo({ url: mediaUrl });
                } else if (mediaUrl.includes('.jpg') || mediaUrl.includes('.png')) {
                    ctx.replyWithPhoto({ url: mediaUrl });
                }
            }
        } else {
            ctx.reply('La API no devolvió resultados válidos.');
        }
    } else {
        ctx.reply('Hubo un error al obtener los medios desde la API.');
    }
});

bot.command('instagramstory', async (ctx) => {
    const command = '/instagramstory';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el usuario de Instagram para descargar sus historias`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/igstory?username=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result && textResponse.result.length > 0) {
            for (const videoUrl of textResponse.result) {
                ctx.replyWithVideo({ url: videoUrl });
            }
        } else {
            ctx.reply('La API no devolvió URLs de video válidas.');
        }
    } else {
        ctx.reply('Hubo un error al obtener las historias desde la API.');
    }
});

bot.command('tiktokimg', async (ctx) => {
    const command = '/tiktokimg';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del tiktok con fotos`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/tikok?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
            const result = textResponse.result;
            if (result.photo && result.photo.length > 0) {
                for (const photo of result.photo) {
                    ctx.replyWithPhoto({ url: photo.url_download });
                }
            }
        } else {
            ctx.reply('La API no devolvió la información esperada.');
        }
    } else {
        ctx.reply('Hubo un error al obtener el contenido desde la API.');
    }
});

bot.command('threads', async (ctx) => {
    const command = '/threads';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del contenido de Threads`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/threads?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result && textResponse.result.length > 0) {
            const result = textResponse.result;
            for (const item of result) {
                if (item.ext === 'jpg' || item.ext === 'jpeg' || item.mime === 'image/jpeg') {
                    ctx.replyWithPhoto({ url: item.link }, { caption: `` });
                } else if (item.ext === 'mp4' || item.mime === 'video/mp4') {
                    ctx.replyWithVideo({ url: item.link });
                }
            }
        } else {
            ctx.reply('La API no devolvió la información esperada.');
        }
    } else {
        ctx.reply('Hubo un error al obtener el contenido desde la API.');
    }
});

bot.command('mediafire', async (ctx) => {
    const command = '/mediafire';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del archivo de MediaFire`);
        return;
    }
    const response = await fetch(`${apikasu}/api/dowloader/mediafire?url=${userText}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        if (textResponse.status && textResponse.result) {
            const result = textResponse.result;
            const documentUrl = result.url;
            const extension = result.ext.toLowerCase();
            const allowedExtensions = ['mp4', 'mp3', 'jpg', 'jpeg', 'png', 'gif', 'pdf', 'rar', 'zip'];
            if (allowedExtensions.includes(extension)) {
                const document = `${documentUrl}.${extension}`;
                const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲: ${result.filename}
𝗧𝗶𝗽𝗼: ${result.filetype}
𝗽𝗲𝘀𝗼: ${result.filesizeH}`;
                if (['mp4'].includes(extension)) {
                    ctx.replyWithVideo({ url: document }, { caption: message, supports_streaming: true });
                } else if (['mp3'].includes(extension)) {
                    ctx.replyWithAudio({ url: document }, { caption: message, supports_streaming: true });
                } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                    ctx.replyWithPhoto({ url: document }, { caption: message });
                } else if (['pdf', 'rar', 'zip'].includes(extension)) {
                    ctx.replyWithDocument({ url: document, filename: result.filename });
                } else {
                    ctx.reply('Extensión no admitida.');
                }
            } else {
                ctx.reply('Extensión no admitida.');
            }
        } else {
            ctx.reply('La API no devolvió la información esperada.');
        }
    } else {
        ctx.reply('Hubo un error al obtener el texto desde la API.');
    }
});

bot.command('googledrive', async (ctx) => {
    const command = '/googledrive';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del archivo de Google Drive`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/dowloader/googledrive?url=${userText}&apikey=${apikey}`);
        if (response.ok) {
            const textResponse = await response.json();
            if (textResponse.status && textResponse.result) {
                const result = textResponse.result;
                const documentUrl = result.url;
                const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲: ${result.fileName}
𝗽𝗲𝘀𝗼: ${result.fileSize}`;
                ctx.replyWithDocument({ url: documentUrl, filename: result.fileName, caption: message });
            } else {
                ctx.reply('La API no devolvió la información esperada.');
            }
        } else {
            ctx.reply('Hubo un error al obtener el texto desde la API.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud de Google Drive:', error);
        ctx.reply('Hubo un error al procesar la solicitud de Google Drive.');
    }
});
bot.command('youtubechannel', async (ctx) => {
    const command = '/youtubechannel';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el nombre del canal de YouTube`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/search/youtubechannel?channel=${encodeURIComponent(userText)}&apikey=${apikey}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.status && jsonResponse.result && jsonResponse.result.length > 0) {
                const channels = jsonResponse.result.slice(0, 2);
                channels.forEach(channel => {
                    const message = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲: ${channel.channel_name}
𝗖𝗮𝗻𝗮𝗹 𝗜𝗗: ${channel.channel_id}
𝗔𝗰𝗲𝗿𝗰𝗮 𝗗𝗲𝗹 𝗖𝗮𝗻𝗮𝗹: ${channel.channel_about}
𝗖𝗿𝗲𝗮𝗱𝗼 𝗘𝗻: ${new Date(channel.channel_created).toDateString()}`;
                    ctx.replyWithPhoto({ url: channel.channel_picture.medium.url }, { caption: message });
                });
            } else {
                ctx.reply('No se encontraron canales de YouTube con ese nombre.');
            }
        } else {
            ctx.reply('Hubo un error al obtener la información desde la API.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud de YouTube Channel');
        ctx.reply('Hubo un error al procesar la solicitud de YouTube Channel.');
    }
});

bot.command('youtubevideo', async (ctx) => {
    const command = '/youtubevideo';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del video de Youtube`);
        return;
    }
    const apiUrl = `${apikasu}/api/dowloader/youtubemp4?url=${encodeURIComponent(userText)}&apikey=${apikey}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const videoBuffer = await response.buffer();
            ctx.replyWithVideo({ source: videoBuffer });
        } else {
            ctx.reply(`Error al descargar el video`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:');
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});

bot.command('youtubeaudio', async (ctx) => {
    const command = '/youtubeaudio';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace del audio de Youtube`);
        return;
    }
    const apiUrl = `${apikasu}/api/dowloader/youtubemp3?url=${encodeURIComponent(userText)}&apikey=${apikey}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const audioBuff = await response.buffer();
            ctx.replyWithAudio({ source: audioBuff });
        } else {
            ctx.reply(`Error al descargar el audio`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:');
        ctx.reply('¡Ups! Ha ocurrido un error al procesar tu solicitud.');
    }
});
//termina categoria de descarga, busqueda y stalkeo



//comienza categoria de economia
function convertirMinutosAHoras(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas}h ${minutosRestantes}m`;
}

bot.command('trabajar', async (ctx) => {
    const userId = ctx.from.id;
    try {
        const db = await User.findOne({ userId: userId });
        if (db && (!db.lastWorkTime || (Date.now() - db.lastWorkTime.getTime()) > 24 * 60 * 60 * 1000)) {
            const response = await fetch('https://raw.githubusercontent.com/fgmods/fg-team/main/games/work.json');
            const trabajos = await response.json();
            const trabajo = trabajos[Math.floor(Math.random() * trabajos.length)];
            const DolaresGanados = Math.floor(Math.random() * 100) + 1;
            const dias = '1'
            db.DiasTrabajados = Number(db.DiasTrabajados) + Number(dias);
            db.Dinero = Number(db.Dinero) + Number(DolaresGanados);
            db.lastWorkTime = new Date();
            await db.save();
            ctx.reply(`${trabajo.fgwork} ${DolaresGanados} Dolares`);
        } else if (db && db.lastWorkTime) {
            const tiempoRestanteEnMinutos = Math.ceil((24 * 60 * 60 * 1000 - (Date.now() - db.lastWorkTime.getTime())) / (60 * 1000));
            ctx.reply(`¡Debes esperar ${convertirMinutosAHoras(tiempoRestanteEnMinutos)} antes de poder trabajar nuevamente!`);
        } else {
            ctx.reply('¡Ups! Ha ocurrido un error al obtener la información del usuario.');
        }
    } catch (error) {
        console.error('Error al obtener trabajo');
        ctx.reply('¡Ups! Ha ocurrido un error al obtener la información del trabajo.');
    }
});

bot.command('interesesportrabajo', async (ctx) => {
    const userId = ctx.from.id;
    try {
        const db = await User.findOne({ userId: userId });
        if (db) {
            const diasTrabajados = db.DiasTrabajados || 0;
            if (diasTrabajados >= 30) {
                const factorAleatorio = Math.floor(Math.random() * (70 * 50 + 1) + 50);
                const intereses = Math.floor(diasTrabajados * (factorAleatorio / 100));
                db.Dinero = Number(db.Dinero) + intereses;
                await db.save();
                ctx.reply(`¡Felicidades! Has ganado ${intereses} Dolares en intereses por tus días trabajados.`);
                db.DiasTrabajados = 0
                await db.save();
            } else {
                ctx.reply('No tienes suficientes días trabajados para ganar intereses. Trabaja más para acumular días.');
            }
        } else {
            ctx.reply('No tienes un trabajo registrado. ¡Trabaja primero para ganar intereses!');
        }
    } catch (error) {
        console.error('Error al calcular intereses');
        ctx.reply('¡Ups! Ha ocurrido un error al calcular los intereses por trabajo.');
    }
});

bot.command('comprarpropiedad', async (ctx) => {
    const userId = ctx.from.id;
    try {
        const user = await User.findOne({ userId: userId });
        if (!user) {
            ctx.reply('No tienes un trabajo registrado. ¡Trabaja primero para ganar dinero!');
            return;
        }
        const mensaje = `
𝗣𝗿𝗼𝗽𝗶𝗲𝗱𝗮𝗱𝗲𝘀 𝗱𝗶𝘀𝗽𝗼𝗻𝗶𝗯𝗹𝗲𝘀 𝘆 𝘀𝘂𝘀 𝘃𝗮𝗹𝗼𝗿𝗲𝘀.

𝗖𝗶𝘂𝗱𝗮𝗱: Texas y Orlando
𝗩𝗮𝗹𝗼𝗿: 25.000 - 50.000

𝗖𝗶𝘂𝗱𝗮𝗱: Miami y NewYork
𝗩𝗮𝗹𝗼𝗿: 50.000 - 150.000

𝗖𝗶𝘂𝗱𝗮𝗱: California y Washington D.C
𝗩𝗮𝗹𝗼𝗿: 170.000`;
        const imagen = 'https://i.imgur.com/00O1jnT.jpg';
        ctx.replyWithPhoto({ url: imagen }, {
            caption: mensaje,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Texas o Orlando', callback_data: 'textasyorlando' }],
                    [{ text: 'Miami o NewYork', callback_data: 'miamiynewyork' }],
                    [{ text: 'California o Whashington', callback_data: 'californiaywhashington' }],
                ],
            },
        });
    } catch (error) {
        console.error('Error al obtener la información del usuario', error);
        ctx.reply('¡Ups! Ha ocurrido un error al obtener la información.');
    }
});

bot.action('textasyorlando', async (ctx) => {
    const imagen = 'https://i.imgur.com/1UZXKic.jpg';
    const ciudades = ['Texas', 'Orlando'];
    const ciudadpropiedad = ciudades[Math.floor(Math.random() * ciudades.length)];
    const precios = [25000, 50000];
    const preciopropiedad = precios[Math.floor(Math.random() * precios.length)];
    const userId = ctx.from.id;
    const propiedad = 1;
    try {
        const db = await User.findOne({ userId: userId });
        if (!db) {
            ctx.reply('No tienes un trabajo registrado. ¡Trabaja primero para ganar dinero!');
            return;
        }
        if (db.Dinero >= preciopropiedad) {
            db.Dinero = Number(db.Dinero) - Number(preciopropiedad);
            db.Patrimonio = Number(db.Patrimonio) + Number(preciopropiedad);
            db.Propiedades = Number(db.Propiedades) + Number(propiedad);
            await db.save();
            ctx.replyWithPhoto({ url: imagen }, {
                caption: `¡Felicidades! Has comprado una propiedad en ${ciudadpropiedad} por ${preciopropiedad} Dolares.`
            });
        } else {
            ctx.reply(`Lo siento, no tienes suficiente dinero para comprar la propiedad en ${ciudadpropiedad}.`);
        }
    } catch (error) {
        console.error('Error al comprar propiedad', error);
        ctx.reply('¡Ups! Ha ocurrido un error al comprar la propiedad.');
    }
});

bot.action('miamiynewyork', async (ctx) => {
    const imagen = 'https://i.pinimg.com/originals/09/7a/ff/097aff4ba5931283509093fd50ceafe5.jpg'
    const ciudad = ['Miami', 'NewYork'];
    const ciudadpropiedad = ciudad[Math.floor(Math.random() * ciudad.length)];
    const precio = ['50000', '150000'];
    const preciopropiedad = precio[Math.floor(Math.random() * precio.length)];
    const userId = ctx.from.id;
    const propiedad = '1'
    try {
        const db = await User.findOne({ userId: userId });
        if (!db) {
            ctx.reply('No tienes un trabajo registrado. ¡Trabaja primero para ganar dinero!');
            return;
        }
        if (db.Dinero >= preciopropiedad) {
            db.Dinero = Number(db.Dinero) - Number(preciopropiedad);
            db.Patrimonio = Number(db.Patrimonio) + Number(preciopropiedad);
            db.Propiedades = Number(db.Propiedades) + Number(propiedad);
            await db.save();
            ctx.replyWithPhoto({ url: imagen }, {
                caption: `¡Felicidades! Has comprado una propiedad en ${ciudadpropiedad} por ${preciopropiedad} Dolares.`
            });
        } else {
            ctx.reply(`Lo siento, no tienes suficiente dinero para comprar la propiedad en ${ciudadpropiedad}.`);
        }
    } catch (error) {
        console.error('Error al comprar propiedad', error);
        ctx.reply('¡Ups! Ha ocurrido un error al comprar la propiedad.');
    }
});

bot.action('californiaywhashington', async (ctx) => {
    const imagen = 'https://megaricos.com/wp-content/uploads/2019/09/mansion-nueva-york-1-673x449.jpg';
    const ciudades = ['California', 'Washington'];
    const ciudadpropiedad = ciudades[Math.floor(Math.random() * ciudades.length)];
    const precios = [150000, 250000];
    const preciopropiedad = precios[Math.floor(Math.random() * precios.length)];
    const userId = ctx.from.id;
    const propiedad = 1;
    try {
        const db = await User.findOne({ userId: userId });
        if (!db) {
            ctx.reply('No tienes un trabajo registrado. ¡Trabaja primero para ganar dinero!');
            return;
        }
        if (db.Dinero >= preciopropiedad) {
            db.Dinero = Number(db.Dinero) - Number(preciopropiedad);
            db.Patrimonio = Number(db.Patrimonio) + Number(preciopropiedad);
            db.Propiedades = Number(db.Propiedades) + Number(propiedad);
            await db.save();
            ctx.replyWithPhoto({ url: imagen }, {
                caption: `¡Felicidades! Has comprado una propiedad en ${ciudadpropiedad} por ${preciopropiedad} Dolares.`
            });
        } else {
            ctx.reply(`Lo siento, no tienes suficiente dinero para comprar la propiedad en ${ciudadpropiedad}.`);
        }
    } catch (error) {
        console.error('Error al comprar propiedad', error);
        ctx.reply('¡Ups! Ha ocurrido un error al comprar la propiedad.');
    }
});
//termina categoria de economia


//comienza categoria de juegos

let currentWord = '';
let guessedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;
let hangmanParts = 0;

const words = [
    'elefante', 'platano', 'programacion', 'telegrama', 'javascript',
    'computadora', 'espanol', 'telefono', 'guitarra', 'frutas',
    'montana', 'familia', 'cancion', 'emocion', 'aventura',
    'chocolate', 'naturaleza', 'oceanografia', 'elevar', 'feliz',
    'invierno', 'radiante', 'paisaje', 'ocasional', 'trabajo',
    'hipopotamo', 'radiacion', 'querido', 'exquisito', 'arquitectura',
    'rejuvenecer', 'xylofono', 'quiosco', 'zebra', 'sabroso',
    'noviembre', 'sublime', 'ilusion', 'xylografia',
    'ahorcado', 'abrazo', 'burro', 'cine', 'delfin',
    'espejo', 'felicidad', 'galleta', 'huevo', 'iglesia',
    'jirafa', 'kiosco', 'lampara', 'mariposa', 'naranja',
    'oso', 'piano', 'quijote', 'rosa', 'sol',
    'telescopio', 'uva', 'viento', 'waffle', 'xilofono',
    'yoga', 'zapato', 'llama', 'agua', 'solucion',
    'bicicleta', 'cascada', 'dinosaurio', 'escalera', 'fantasma',
    'guitarra', 'helado', 'isla', 'jardin', 'kiwi'
];

bot.command('ahorcado', (ctx) => {
    startGame();
    displayWord(ctx);
});

bot.on('callback_query', (ctx) => {
    const guessedLetter = ctx.callbackQuery.data;
    ctx.answerCbQuery();

    if (currentWord.includes(guessedLetter)) {
        updateGuessedWord(guessedLetter);
    } else {
        incorrectGuesses++;
        hangmanParts++;
    }

    displayWord(ctx);

    if (checkGameStatus(ctx)) {
        startGame();
        ctx.reply('¡Has ganado! Vamos por otra palabra.', getPlayAgainButton());
        displayWord(ctx);
    }
});

function startGame() {
    currentWord = getRandomWord();
    guessedWord = Array(currentWord.length).fill('_');
    incorrectGuesses = 0;
    hangmanParts = 0;
}

function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function updateGuessedWord(guessedLetter) {
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === guessedLetter) {
            guessedWord[i] = guessedLetter;
        }
    }
}

function displayWord(ctx) {
    const displayText = `Palabra: ${guessedWord.join(' ')}\nIncorrectas: ${incorrectGuesses}/${maxIncorrectGuesses}`;
    const hangmanText = getHangmanText(hangmanParts);
    const keyboard = Markup.inlineKeyboard(getAlphabetButtons()).extra();

    ctx.replyWithMarkdown(`${displayText}\n${hangmanText}`, keyboard);
}

function getHangmanText(parts) {
    switch (parts) {
        case 0:
            return 'Ahorcado:\n\n';
        case 1:
            return 'Ahorcado:\n\n  O';
        case 2:
            return 'Ahorcado:\n\n  O\n  |';
        case 3:
            return 'Ahorcado:\n\n  O\n /|';
        case 4:
            return 'Ahorcado:\n\n  O\n /|\\';
        case 5:
            return 'Ahorcado:\n\n  O\n /|\\ \n /';
        case 6:
            return 'Ahorcado:\n\n  O\n /|\\ \n / \\';
        default:
            return '¡Has perdido! La palabra era: ' + currentWord;
    }
}

function checkGameStatus(ctx) {
    if (guessedWord.join('') === currentWord) {
        return true;
    }

    if (hangmanParts >= maxIncorrectGuesses) {
        ctx.reply(`¡Has perdido! La palabra era "${currentWord}". Intentemos con una nueva palabra.`, getPlayAgainButton());
        return true;
    }

    return false;
}

function getAlphabetButtons() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.map(letter => Markup.callbackButton(letter, letter));
}

function getPlayAgainButton() {
    return Markup.inlineKeyboard([Markup.callbackButton('Jugar de nuevo', 'play_again')]).extra();
}

bot.on('callback_query', (ctx) => {
    if (ctx.callbackQuery.data === 'play_again') {
        startGame();
        ctx.reply('¡Vamos de nuevo! Adivina la palabra:');
        displayWord(ctx);
    }
});

//termina categoria de juegos

bot.launch();