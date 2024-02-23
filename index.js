const { Telegraf } = require('telegraf');
const fetch = require('node-fetch')
const mongoose = require('mongoose');
const fs = require('fs');
const cfonts = require('cfonts');
const { say } = cfonts

let startTime = new Date();

const logo = 'https://i.imgur.com/ZCeiOY4.jpg';
const perfildeterminado = 'https://i.imgur.com/VVA2sbG.jpg'
const apikasu = "https://apikasu.onrender.com"
const apikey = "SebastianDevelop"

const bot = new Telegraf(process.env.token);
const mongoUrl = process.env.mongodb;

const idiomaCodigo = process.env.language || 'es'
const jsonidioma = `./idiomas/${idiomaCodigo}.json`;
const jsonlanguage = JSON.parse(fs.readFileSync(jsonidioma, 'utf8'));


function imprimirMensaje(ctx) {
    const { chat, from, message } = ctx;
    const formattedMessage = `
    \x1b[30mID: ${ctx.from.id}\x1b[0m \x1b[41m\x1b[30mUsername: ${ctx.from.username} \x1b[43m\x1b[30mHora: ${new Date().toLocaleTimeString()} \x1b[0m
    \x1b[0m${message.text}
    `;
    console.log(formattedMessage);
}
bot.use((ctx, next) => {
    if (ctx.message.text == undefined) {
    } else {
        imprimirMensaje(ctx);
    }
    next();
});

function getLevelName(xp) {
    if (xp >= 3000) return '30';
    if (xp >= 2900) return '29';
    if (xp >= 2800) return '28';
    if (xp >= 2700) return '27';
    if (xp >= 2600) return '26';
    if (xp >= 2500) return '25';
    if (xp >= 2400) return '24';
    if (xp >= 2300) return '23';
    if (xp >= 2200) return '22';
    if (xp >= 2100) return '21';
    if (xp >= 2000) return '20';
    if (xp >= 1900) return '19';
    if (xp >= 1800) return '18';
    if (xp >= 1700) return '17';
    if (xp >= 1600) return '16';
    if (xp >= 1500) return '15';
    if (xp >= 1400) return '14';
    if (xp >= 1300) return '13';
    if (xp >= 1200) return '12';
    if (xp >= 1100) return '11';
    if (xp >= 1000) return '10';
    if (xp >= 900) return '9';
    if (xp >= 800) return '8';
    if (xp >= 700) return '7';
    if (xp >= 600) return '6';
    if (xp >= 500) return '5';
    if (xp >= 400) return '4';
    if (xp >= 300) return '3';
    if (xp >= 200) return '2';
    if (xp >= 100) return '1';
    return '0';
}

say(`TALKI BOT`, {
    font: 'chrome',
    align: 'center',
    gradient: ['red', 'magenta']
})
say(`@Sebastian, @Traxnox.`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
})

say(`Intentando hacer conexion con MongoDB.`, {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
})


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
    xp: { type: Number, default: 0 },
    lastxptime: { type: Date, default: null },
});
const chatSchema = new mongoose.Schema({
    chatId: { type: Number, unique: true },
    title: String,
    chatType: String,
    Avatar: String,
});
const Chat = mongoose.model('Chat', chatSchema);
const User = mongoose.model('User', userSchema);


// menus (modificar los 2)
bot.start(async (ctx) => {
    const user = ctx.from;
    const name = ctx.message.from.first_name;
    if (ctx.chat.type !== 'private') {
        ctx.reply(`${jsonlanguage.comandoprivado}`)
        return;
    }
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
   
    ${jsonlanguage.menuinicial}
        
      /help
      /creadores
      /cuentasoficiales
      /miapi
      /ping
      /uptime
      /info
      /registrarme`
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
            Avatar: perfildeterminado
        }, { upsert: true });
        ctx.replyWithPhoto({ url: logo }, {
            caption: menu,
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                    [{ text: 'INFORMACION', callback_data: 'informacion' }],
                    [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                    [{ text: 'ECONOMIA', callback_data: 'economia' }],
                    [{ text: 'JUEGOS', callback_data: 'juegos' }],
                    [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
                ],
            },
        });
    } catch (error) {
        console.error('Error al guardar la información del usuario en MongoDB:', error);
        ctx.reply(`${jsonlanguage.errorprocesarsolicitud}`);
    }
});
// menus (modificar los 2)
bot.command('help', async (ctx) => {
    const name = ctx.message.from.first_name;
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
   
    ${jsonlanguage.menuinicial}
        
     /help
     /creadores
     /cuentasoficiales
     /miapi
     /ping
     /uptime
     /info
     /registrarme
     /registrargrupo`;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                [{ text: 'INFORMACION', callback_data: 'informacion' }],
                [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                [{ text: 'ECONOMIA', callback_data: 'economia' }],
                [{ text: 'JUEGOS', callback_data: 'juegos' }],
                [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
            ],
        }
    });
});
//acciones de los botones del menu
bot.action('acerca', async (ctx) => {
    const name = ctx.from.first_name
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
  
  ${jsonlanguage.menutalki} 
      
    ${jsonlanguage.acercade} 

      /help
      /creadores
      /cuentasoficiales
      /miapi
      /ping
      /uptime
      /info
      /registrarme
      /registrargrupo`;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'INFORMACION', callback_data: 'informacion' }],
                [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                [{ text: 'ECONOMIA', callback_data: 'economia' }],
                [{ text: 'JUEGOS', callback_data: 'juegos' }],
                [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
            ],
        }
    });
});
bot.action('informacion', async (ctx) => {
    const name = ctx.from.first_name
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
  
  ${jsonlanguage.menutalki}
      
    ${jsonlanguage.informacion}
  
      /cambiarnombre
      /cambiarfoto
      /perfil
      /registrarme
      /registrargrupo
      /infogrupo`;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                [{ text: 'ECONOMIA', callback_data: 'economia' }],
                [{ text: 'JUEGOS', callback_data: 'juegos' }],
                [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
            ],
        }
    });
});
bot.action('herramientas', async (ctx) => {
    const name = ctx.from.first_name
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}

  ${jsonlanguage.menutalki}
      
    ${jsonlanguage.herramientas}
      
      /chatgpt
      /bard
      /gemini
      /ipinfo
      /bingcreator
      /imagina
      /imagina2
      /traducir
      /ssweb
      /textoavoz
      /acortarurl`;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                [{ text: 'INFORMACION', callback_data: 'informacion' }],
                [{ text: 'ECONOMIA', callback_data: 'economia' }],
                [{ text: 'JUEGOS', callback_data: 'juegos' }],
                [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
            ],
        }
    });
});
bot.action('economia', async (ctx) => {
    const name = ctx.from.first_name
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
  
  ${jsonlanguage.menutalki}
      
    ${jsonlanguage.economia}
  
      /trabajar
      /interesesportrabajo
      /comprarpropiedad`;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                [{ text: 'INFORMACION', callback_data: 'informacion' }],
                [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                [{ text: 'JUEGOS', callback_data: 'juegos' }],
                [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
            ],
        }
    });
});
bot.action('juegos', async (ctx) => {
    const name = ctx.from.first_name
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
  
  ${jsonlanguage.menutalki}
      
    ${jsonlanguage.juegos}

      /acertijo
      /ganarxp
      /caso
      `;
    ctx.replyWithPhoto({ url: logo }, {
        caption: menu, reply_markup: {
            inline_keyboard: [
                [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                [{ text: 'INFORMACION', callback_data: 'informacion' }],
                [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                [{ text: 'ECONOMIA', callback_data: 'economia' }],
                [{ text: 'DESCARGAS, BUSQUEDAS Y STALKEOS', callback_data: 'dl' }],
            ],
        }
    });
});
bot.action('dl', async (ctx) => {
    const name = ctx.from.first_name
    const menu = `
${jsonlanguage.hola} ${name}

${jsonlanguage.limitestelegram}
 
  ${jsonlanguage.menutalki}
      
    ${jsonlanguage.dl}
      
      /tiktokstalk
      /instagramstalk
      /githubstalk
      /peliculainfo
      /tiktoksearch
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
                [{ text: 'ACERCA DE', callback_data: 'acerca' }],
                [{ text: 'INFORMACION', callback_data: 'informacion' }],
                [{ text: 'HERRAMIENTAS', callback_data: 'herramientas' }],
                [{ text: 'ECONOMIA', callback_data: 'economia' }],
                [{ text: 'JUEGOS', callback_data: 'juegos' }],
            ],
        }
    });
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
            console.error(`${jsonlanguage.error1}`);
            ctx.reply(`${jsonlanguage.error2}`);
        });
});
bot.command('info', async (ctx) => {
    const activeStatus = (lastPingTime > 0) ? `${jsonlanguage.activo}` : `${jsonlanguage.inactivo}`;
    const lastPing = (lastPingTime > 0) ? `${lastPingTime.toFixed(2)} ms` : 'N/A';
    ctx.reply(`
${jsonlanguage.informacionbot}

${jsonlanguage.estado} ${activeStatus}
${jsonlanguage.ultimoping} ${lastPing}`);
});
bot.command('creadores', async (ctx) => {
    ctx.reply(`
𝗦𝗲𝗯𝗮𝘀𝘁𝗶𝗮𝗻

${jsonlanguage.nombre} Sebastian
${jsonlanguage.numerotel} +57 301 4953662
𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: https://www.instagram.com/seebastian_88/
𝗚𝗶𝘁𝗛𝘂𝗯: https://github.com/BOT-TX

𝗚𝘂𝗶𝗹𝗹𝗲𝗿𝗺𝗼

${jsonlanguage.nombre} Guillermo
${jsonlanguage.numerotel} +593 99 566 8111
𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺: https://www.instagram.com/traxnox/
𝗚𝗶𝘁𝗛𝘂𝗯: https://github.com/ByTraxnox-X`);
});
bot.command('cuentasoficiales', (ctx) => {
    ctx.reply(`
${jsonlanguage.cuentasof}
https://solo.to/talki`);
});
bot.command('miapi', async (ctx) => {
    ctx.reply(`
${jsonlanguage.miapi}
https://apikasu.onrender.com/`);
});
bot.command('uptime', (ctx) => {
    const currentTime = new Date();
    const uptimeInSeconds = Math.floor((currentTime - startTime) / 1000);
    ctx.reply(`${jsonlanguage.botactivo} ${formatUptime(uptimeInSeconds)}`);
});
function formatUptime(uptimeInSeconds) {
    const hours = Math.floor(uptimeInSeconds / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
}
// termina comandos de acerca de

// PLUGINS


//comienza categoria de informacion
bot.command('registrarme', async (ctx) => {
    const user = ctx.from;
    const userId = ctx.from.id;
    if (ctx.chat.type !== 'private') {
        ctx.reply(`${jsonlanguage.comandoprivado}`)
        return;
    }
    try {
        const existingUser = await User.findOne({ userId: userId });
        if (existingUser) {
            ctx.reply(`${jsonlanguage.registrado}`);
        } else {
            const fullName = user.first_name + (user.last_name ? ' ' + user.last_name : '');
            await User.create({
                userId: userId,
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
                Avatar: perfildeterminado
            });
            try {
                const userDocument = await User.findOne({ userId: userId });
                if (userDocument) {
                    const msgperfil = `
${jsonlanguage.registrado2}

${jsonlanguage.nombre} ${userDocument.firstName}
${jsonlanguage.nombrecompleto} ${userDocument.fullName}
${jsonlanguage.id} ${userDocument.userId}
${jsonlanguage.lenguaje} ${userDocument.languageCode}

${jsonlanguage.informacionadicc}

${jsonlanguage.dinero} ${userDocument.Dinero}
${jsonlanguage.diastrabajados} ${userDocument.DiasTrabajados}
${jsonlanguage.patrimonio} ${userDocument.Patrimonio}
${jsonlanguage.propiedades} ${userDocument.Propiedades}`
                    ctx.replyWithPhoto({ url: userDocument.Avatar }, {
                        caption: msgperfil
                    })
                } else {
                    ctx.reply(`${jsonlanguage.usuarionoconbase}`);
                }
            } catch (error) {
                console.error(`${jsonlanguage.error3}`, error);
                ctx.reply(`${jsonlanguage.error4}`);
            }
        }
    } catch (error) {
        console.error(`${jsonlanguage.error5}`, error);
        ctx.reply(`${jsonlanguage.error4}`);
    }
});
bot.command('registrargrupo', async (ctx) => {
    if (ctx.chat.type !== 'group') {
        ctx.reply(`${jsonlanguage.comandogroup}`);
        return;
    }
    const chat = ctx.chat;
    try {
        const existingChat = await Chat.findOne({ chatId: chat.id });
        if (existingChat) {
            ctx.reply(`${jsonlanguage.gruporegistrado}`);
        } else {
            const chatInfo = {
                chatId: chat.id,
                title: chat.title || chat.username || '',
                chatType: chat.type,
                Avatar: perfildeterminado,
            };
            await Chat.create(chatInfo);
            const mensajegroup = `
${jsonlanguage.registrado2}

${jsonlanguage.nombregrupo} ${chatInfo.title}
${jsonlanguage.idchat} ${chatInfo.chatId}
${jsonlanguage.tipochat} ${chatInfo.chatType}
${jsonlanguage.logodeter} ${chatInfo.Avatar}
`;
            ctx.replyWithPhoto({ url: chatInfo.Avatar }, { caption: mensajegroup });
        }
    } catch (error) {
        console.error(`${jsonlanguage.error3}`, error);
        ctx.reply(`${jsonlanguage.error4}`);
    }
});
bot.command('infogrupo', async (ctx) => {
    const chat = ctx.chat;

    try {
        const chatInfo = await Chat.findOne({ chatId: chat.id });

        if (chatInfo) {
            const infoGrupo = `
${jsonlanguage.infogrupo}

${jsonlanguage.nombregrupo} ${chatInfo.title}
${jsonlanguage.idchat} ${chatInfo.chatId}
${jsonlanguage.tipochat} ${chatInfo.chatType}
${jsonlanguage.logodeter} ${chatInfo.Avatar}
`;
            ctx.replyWithPhoto({ url: chatInfo.Avatar }, { caption: infoGrupo })
        } else {
            ctx.reply(`${jsonlanguage.registrargrupo} /registrargrupo`);
        }
    } catch (error) {
        console.error(`${jsonlanguage.error3}`, error);
        ctx.reply(`${jsonlanguage.error4}`);
    }
});
bot.command('cambiarnombre', async (ctx) => {
    const userId = ctx.from.id;
    const userText = ctx.message.text.replace('/cambiarnombre', '').trim();
    if (!userText) {
        ctx.reply(`${jsonlanguage.ingrenombre}`);
        return;
    }
    try {
        const userDocument = await User.findOne({ userId: userId });
        if (userDocument) {
            userDocument.fullName = userText;
            await userDocument.save();
            ctx.reply(`${jsonlanguage.nombreactualizado} ${userText}`);
        } else {
            ctx.reply(`${jsonlanguage.base1} /registrarme.`);
        }
    } catch (error) {
        console.error(`${jsonlanguage.error6}`, error);
        ctx.reply(`${jsonlanguage.error4}`);
    }
});

bot.command('perfil', async (ctx) => {
    const userId = ctx.from.id;
    try {
        const userDocument = await User.findOne({ userId: userId });
        const levelName = getLevelName(userDocument.xp);
        if (userDocument) {
            const mensaje = `
${jsonlanguage.perfil}

${jsonlanguage.nombre} ${userDocument.firstName}
${jsonlanguage.nombrecompleto} ${userDocument.fullName}
${jsonlanguage.id} ${userDocument.userId}
${jsonlanguage.lenguaje} ${userDocument.languageCode}

${jsonlanguage.informacionadicc}

${jsonlanguage.dinero} ${userDocument.Dinero}
${jsonlanguage.diastrabajados} ${userDocument.DiasTrabajados}
${jsonlanguage.patrimonio} ${userDocument.Patrimonio}
${jsonlanguage.propiedades} ${userDocument.Propiedades}
${jsonlanguage.xp} ${userDocument.xp}
${jsonlanguage.nivel} ${levelName}`
            ctx.replyWithPhoto({ url: userDocument.Avatar }, {
                caption: mensaje
            })
        } else {
            ctx.reply(`${jsonlanguage.error7} /registrarme ${jsonlanguage.registrarte}`);
        }
    } catch (error) {
        console.error(`${jsonlanguage.error3}:`, error);
        ctx.reply(`${jsonlanguage.error4}`);
    }
});
bot.command('cambiarfoto', async (ctx) => {
    const userId = ctx.from.id;
    const userText = ctx.message.text.replace('/cambiarfoto', '').trim();
    if (!userText) {
        ctx.reply(`${jsonlanguage.nuevafoto}`);
        return;
    }
    try {
        const userDocument = await User.findOne({ userId: userId });
        if (userDocument) {
            userDocument.Avatar = userText;
            await userDocument.save();
            ctx.replyWithPhoto({ url: userDocument.Avatar }, {
                caption: `${jsonlanguage.avataractualizado}`
            });
        } else {
            ctx.reply(`${jsonlanguage.base1} /registrarme.`);
        }
    } catch (error) {
        console.error(`${jsonlanguage.error8}`, error);
        ctx.reply(`${jsonlanguage.error4}`);
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
        ctx.reply('${jsonlanguage.error4}');
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
        ctx.reply('${jsonlanguage.error4}');
    }
});
bot.command('ssweb', async (ctx) => {
    const command = '/ssweb';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el enlace de la web`);
        return;
    }
    const apiUrl = `${apikasu}/api/tools/ssweb?link=https://${encodeURIComponent(userText)}&apikey=${apikey}`;
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const PhotoBuffer = await response.buffer();
            ctx.replyWithPhoto({ source: PhotoBuffer });
        } else {
            ctx.reply(`Error al obtener la iamgen`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:');
        ctx.reply('${jsonlanguage.error4}');
    }
});
bot.command('traducir', async (ctx) => {
    const command = '/traducir';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    const [languageCode, ...textArray] = userText.split(' ');
    const userTextToTranslate = textArray.join(' ');
    if (!isValidLanguageCode(languageCode)) {
        ctx.reply('Código de idioma no válido.');
        return;
    }
    if (!userTextToTranslate) {
        ctx.reply('Por favor, ingresa el texto que deseas traducir.');
        return;
    }
    try {
        const translationApiUrl = `${apikasu}/api/info/translate?text=${encodeURIComponent(userTextToTranslate)}&lang=${languageCode}&apikey=${apikey}`;
        const response = await fetch(translationApiUrl);
        if (response.ok) {
            const translationResult = await response.json();
            const caption = `
𝗧𝗥𝗔𝗗𝗨𝗖𝗖𝗜𝗢𝗡

𝗧𝗲𝘅𝘁𝗼 𝗼𝗿𝗶𝗴𝗶𝗻𝗮𝗹: ${userTextToTranslate}
𝗧𝗿𝗮𝗱𝘂𝗰𝗰𝗶𝗼𝗻 (${languageCode}): ${translationResult.result}`;
            ctx.reply(caption);
        } else {
            ctx.reply('Hubo un error al obtener la traducción desde la API.');
        }
    } catch (error) {
        console.error('Error al traducir');
        ctx.reply('Hubo un error al realizar la traducción.');
    }
});
function isValidLanguageCode(code) {
    const allLanguageCodes = [
        'aa', 'ab', 'af', 'ak', 'sq', 'am', 'ar', 'an', 'hy', 'as', 'av', 'ae', 'ay', 'az', 'bm', 'ba',
        'eu', 'be', 'bn', 'bh', 'bi', 'bs', 'br', 'bg', 'my', 'ca', 'km', 'ch', 'ce', 'ny', 'zh', 'cu',
        'cv', 'kw', 'co', 'cr', 'hr', 'cs', 'da', 'dv', 'nl', 'dz', 'en', 'eo', 'et', 'ee', 'fo', 'fj',
        'fi', 'fr', 'ff', 'gl', 'ka', 'de', 'el', 'gn', 'gu', 'ht', 'ha', 'he', 'hz', 'hi', 'ho', 'hu',
        'ia', 'id', 'ie', 'ga', 'ig', 'ik', 'io', 'is', 'it', 'iu', 'ja', 'jv', 'kl', 'kn', 'kr', 'ks',
        'kk', 'km', 'ki', 'rw', 'ky', 'kv', 'kg', 'ko', 'ku', 'kj', 'la', 'lb', 'lg', 'li', 'ln', 'lo',
        'lt', 'lu', 'lv', 'gv', 'mk', 'mg', 'ms', 'ml', 'mt', 'mr', 'mh', 'mn', 'na', 'nv', 'nd', 'ne',
        'ng', 'nb', 'nn', 'no', 'ii', 'nr', 'oc', 'oj', 'cu', 'om', 'or', 'os', 'pa', 'pi', 'fa', 'pl',
        'ps', 'pt', 'qu', 'rm', 'rn', 'ro', 'ru', 'rw', 'sm', 'sg', 'sa', 'sc', 'sr', 'sn', 'sd', 'si',
        'sk', 'sl', 'so', 'st', 'es', 'su', 'sw', 'ss', 'sv', 'ta', 'te', 'tg', 'th', 'ti', 'bo', 'tk',
        'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk', 'ur', 'uz', 've', 'vi', 'vo', 'wa',
        'cy', 'wo', 'fy', 'xh', 'yi', 'yo', 'za', 'zu'
    ];
    return allLanguageCodes.includes(code);
}
bot.command('textoavoz', async (ctx) => {
    const command = '/textoavoz';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el texto a convertir en audio`);
        return;
    }
    try {
        const response = await fetch(`${apikasu}/api/soundoftext?text=${encodeURIComponent(userText)}&lang=es-ES&apikey=${apikey}`);
        if (response.ok) {
            const Audio = await response.json();
            const result = Audio.result
            const audioBuffer = result
            ctx.replyWithAudio({ url: audioBuffer, filename: userText });
        } else {
            ctx.reply('Hubo un error al obtener el audio.');
        }
    } catch (error) {
        console.error('Error al procesar la solicitud.');
        ctx.reply('Hubo un error al procesar la solicitud..');
    }
});
bot.command('acortarurl', async (ctx) => {
    const command = '/acortarurl';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa una url`);
        return;
    }
    const response = await fetch(`${apikasu}/api/linkshort/bitly?link=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        ctx.reply(`
𝗨𝗥𝗟 𝗮𝗻𝘁𝗲𝗿𝗶𝗼𝗿: ${userText}
𝗨𝗥𝗟 𝗮𝗰𝗼𝗿𝘁𝗮𝗱𝗼: ${textResponse.result}
`);
    } else {
        ctx.reply('Hubo un error al obtener el enlace acortado desde la API.');
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
bot.command('githubstalk', async (ctx) => {
    const command = '/githubstalk';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa un nombre de usuario de GitHub`);
        return;
    }
    const response = await fetch(`${apikasu}/api/info/githubstalk?user=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗡𝗼𝗺𝗯𝗿𝗲 𝗱𝗲 𝘂𝘀𝘂𝗮𝗿𝗶𝗼: ${result.login}
𝗡𝗼𝗺𝗯𝗿𝗲: ${result.name}
𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻: ${result.bio}
𝗧𝗶𝗽𝗼 𝗱𝗲 𝗰𝘂𝗲𝗻𝘁𝗮: ${result.type}
𝗦𝗲𝗴𝘂𝗶𝗱𝗼𝗿𝗲𝘀:: ${result.followers}
𝗦𝗶𝗴𝘂𝗶𝗲𝗻𝗱𝗼: ${result.following}
𝗘𝗺𝗮𝗶𝗹: ${result.email}
𝗖𝗼𝗺𝗽𝗮𝗻𝗶𝗮: ${result.company}
𝗟𝗼𝗰𝗮𝗰𝗶𝗼𝗻: ${result.location}
𝗥𝗲𝗽𝗼𝘀𝗶𝘁𝗼𝗿𝗶𝗼𝘀 𝗽𝘂𝗯𝗹𝗶𝗰𝗼𝘀: ${result.public_repos}
𝗙𝗲𝗰𝗵𝗮 𝗱𝗲 𝗰𝗿𝗲𝗮𝗰𝗶𝗼𝗻: ${result.created_at}
𝗙𝗲𝗰𝗵𝗮 𝗱𝗲 𝗮𝗰𝘁𝘂𝗮𝗹𝗶𝘇𝗮𝗰𝗶𝗼𝗻: ${result.updated_at}`;
        const imageUrl = `${result.avatar_url}`;
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
        ctx.reply('${jsonlanguage.error4}');
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
        ctx.reply('${jsonlanguage.error4}');
    }
});
bot.command('peliculainfo', async (ctx) => {
    const command = '/peliculainfo';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el nombre de la pelicula`);
        return;
    }
    const response = await fetch(`${apikasu}/api/search/movieinfo?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗔𝗻̃𝗼: ${result._yearData}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${result.runtime}
𝗚𝗲𝗻𝗲𝗿𝗼: ${result.genres}
𝗔𝗰𝘁𝗼𝗿𝗲𝘀: ${result.actors}
𝗣𝗿𝗲𝗺𝗶𝗼𝘀: ${result.awards}
𝗖𝗼𝗻𝘁𝗶𝗻𝗲𝗻𝘁𝗲: ${result.country}
𝗖𝗮𝗹𝗶𝗳𝗶𝗰𝗮𝗰𝗶𝗼𝗻𝗲𝘀: ${result.rating}
𝗨𝗥𝗟: ${result.imdburl}`;
        const imageUrl = `${result.poster}`;
        ctx.replyWithPhoto({ url: imageUrl }, { caption: caption });
    } else {
        ctx.reply('Hubo un error al obtener la informacion desde la API.');
    }
});
bot.command('tiktoksearch', async (ctx) => {
    const command = '/tiktoksearch';
    const userText = ctx.message.text.slice(command.length + 1).trim();
    if (!userText) {
        ctx.reply(`Por favor, ingresa el texto a buscar`);
        return;
    }
    const response = await fetch(`${apikasu}/api/search/tiktoksearch?text=${encodeURIComponent(userText)}&apikey=${apikey}`);
    if (response.ok) {
        const textResponse = await response.json();
        const result = textResponse.result[0]
        const caption = `
𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗖𝗜𝗢𝗡

𝗧𝗶𝘁𝘂𝗹𝗼: ${result.title}
𝗗𝘂𝗿𝗮𝗰𝗶𝗼𝗻: ${result.duration} segundos
𝗥𝗲𝗽𝗿𝗼𝗱𝘂𝗰𝗰𝗶𝗼𝗻𝗲𝘀: ${result.play_count}
𝗟𝗶𝗸𝗲𝘀: ${result.digg_count}
𝗖𝗼𝗺𝗽𝗮𝗿𝘁𝗶𝗱𝗮𝘀: ${result.share_count}
𝗗𝗲𝘀𝗰𝗮𝗿𝗴𝗮𝘀: ${result.download_count}
𝗥𝗲𝗴𝗶𝗼𝗻: ${result.region}`;
        const video = `${result.play}`;
        ctx.replyWithVideo({ url: video }, { caption: caption });
    } else {
        ctx.reply('Hubo un error al obtener la informacion desde la API.');
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
bot.command('ganarxp', async (ctx) => {
    const userId = ctx.from.id;
    const user = await User.findOne({ userId });
    if (user) {
        const now = new Date();
        if (!user.lastxptime || (now - user.lastxptime) > 24 * 60 * 60 * 1000) {
            const xp2 = '10'
            user.xp = Number(user.xp) + Number(xp2);
            user.lastxptime = now;
            await user.save();
            ctx.reply(`Has ganado 10 xp, para seguir ganando debes incrementar tu uso con el bot!`);
        } else {
            ctx.reply('Ya has utilizado este comando hoy. Intenta de nuevo mañana.');
        }
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
let acertijosJSON;
try {
    const data = fs.readFileSync('./media/acertijo.json', 'utf8');
    acertijosJSON = JSON.parse(data);
} catch (error) {
    console.error('Error al cargar el archivo JSON de acertijos');
}
let juegoActivo = false;
let acertijoActual;
let tiempoLimite = 30000;
let tiempoInicio;
let intervaloTiempo;
function obtenerAcertijoAleatorio() {
    const indexAleatorio = Math.floor(Math.random() * acertijosJSON.length);
    return acertijosJSON[indexAleatorio];
}
function iniciarJuego(ctx) {
    if (!juegoActivo) {
        juegoActivo = true;
        acertijoActual = obtenerAcertijoAleatorio();
        tiempoInicio = Date.now();
        ctx.reply(`
Acertijo: ${acertijoActual.question}
Tiempo: 30 segundos`);
        intervaloTiempo = setInterval(() => {
            const tiempoTranscurrido = Date.now() - tiempoInicio;
            if (tiempoTranscurrido >= tiempoLimite) {
                clearInterval(intervaloTiempo);
                finalizarJuego(ctx, 'Tiempo para responder agotado. El acertijo ha finalizado.');
            }
        }, 1000);
    } else {
        ctx.reply('Ya hay un acertijo activo en este momento. Finaliza el acertijo actual antes de iniciar uno nuevo.');
    }
}
function finalizarJuego(ctx, mensaje) {
    juegoActivo = false;
    ctx.reply(mensaje);
    clearInterval(intervaloTiempo);
}
function calcularSimilitud(str1, str2) {
    const set1 = new Set(str1);
    const set2 = new Set(str2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    const jaccardCoefficient = intersection.size / union.size;
    return jaccardCoefficient;
}
function manejarRespuesta(ctx) {
    if (juegoActivo) {
        const respuestaUsuario = ctx.message.text.split(' ').slice(1).join(' ').toLowerCase();
        const tiempoTranscurrido = Date.now() - tiempoInicio;
        const similitud = calcularSimilitud(respuestaUsuario, acertijoActual.response.toLowerCase());
        if (tiempoTranscurrido <= tiempoLimite && similitud >= 0.7) {
            finalizarJuego(ctx, '¡Respuesta correcta!');
        } else if (tiempoTranscurrido > tiempoLimite) {
            finalizarJuego(ctx, 'Tiempo para responder agotado. El acertijo ha finalizado.');
        } else {
            ctx.reply(`Respuesta incorrecta. La similitud es ${similitud * 100}%. ¡Inténtalo de nuevo!`);
        }
    } else {
        ctx.reply('No hay un acertijo activo en este momento. Inicia un nuevo juego con /acertijo.');
    }
}
bot.command('acertijo', (ctx) => {
    iniciarJuego(ctx);
    ctx.reply('¡Acertijo iniciado! Responde con /responderacertijo seguido de tu respuesta.');
});

bot.command('responderacertijo', (ctx) => {
    manejarRespuesta(ctx);
});

let CasosJSON;
let tiempoLimite2 = 60000;
let tiempoInicio2;
let intervaloTiempo2;
try {
    const data = fs.readFileSync('./media/casos.json', 'utf8');
    CasosJSON = JSON.parse(data);
} catch (error) {
    console.error('Error al cargar el archivo JSON de casos');
}
let JuegoActivo2 = false;
let CasoActual;
function ObtenerCasoAleatorio() {
    const indexAleatorio = Math.floor(Math.random() * CasosJSON.length);
    return CasosJSON[indexAleatorio];
}
function iniciarJuego(ctx) {
    if (!JuegoActivo2) {
        JuegoActivo2 = true;
        CasoActual = ObtenerCasoAleatorio();
        tiempoInicio2 = Date.now();
        ctx.reply(`
Caso: ${CasoActual.caso}\n
sospechosos: ${CasoActual.Sospechosos}\n
Tiempo: 60 segundos`);
        intervaloTiempo2 = setInterval(() => {
            const tiempoTranscurrido = Date.now() - tiempoInicio2;
            if (tiempoTranscurrido >= tiempoLimite2) {
                clearInterval(intervaloTiempo2);
                finalizarJuego(ctx, 'Tiempo para responder agotado. El caso ha finalizado.');
            }
        }, 1000);
    } else {
        ctx.reply('Ya hay un caso activo en este momento. Finaliza el caso actual antes de iniciar uno nuevo.');
    }
}
function finalizarJuego(ctx, mensaje) {
    JuegoActivo2 = false;
    ctx.reply(mensaje);
    clearInterval(intervaloTiempo2);
}
function calcularSimilitud(str1, str2) {
    const set1 = new Set(str1);
    const set2 = new Set(str2);
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    const jaccardCoefficient = intersection.size / union.size;
    return jaccardCoefficient;
}
function manejarRespuesta(ctx) {
    if (JuegoActivo2) {
        const respuestaUsuario = ctx.message.text.split(' ').slice(1).join(' ').toLowerCase();
        const tiempoTranscurrido = Date.now() - tiempoInicio2;
        const similitud = calcularSimilitud(respuestaUsuario, CasoActual.response.toLowerCase());
        if (tiempoTranscurrido <= tiempoLimite2 && similitud >= 0.7) {
            finalizarJuego(ctx, '¡Respuesta correcta!');
        } else if (tiempoTranscurrido > tiempoLimite2) {
            finalizarJuego(ctx, 'Tiempo para responder agotado. El caso ha finalizado.');
        } else {
            ctx.reply(`Respuesta incorrecta. La similitud es ${similitud * 100}%. ¡Inténtalo de nuevo!`);
        }
    } else {
        ctx.reply('No hay un caso activo en este momento. Inicia un nuevo juego con /caso.');
    }
}
bot.command('caso', (ctx) => {
    iniciarJuego(ctx);
    ctx.reply('¡Caso iniciado! Responde con /respondercaso seguido de tu respuesta.');
});

bot.command('respondercaso', (ctx) => {
    manejarRespuesta(ctx);
});
//termina categoria de juegos
bot.launch();
