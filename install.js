const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('\x1b[42m\x1b[30m%s\x1b[0m', 'Ingresa el token de acceso a Telegram: ', (telegramToken) => {
    rl.question('\x1b[42m\x1b[30m%s\x1b[0m', 'Ingresa el lenguaje del bot: ', (botLanguage) => {
        rl.question('\x1b[42m\x1b[30m%s\x1b[0m', 'Ingresa la URL de la base de datos: ', (databaseUrl) => {
            rl.close();
            const config = {
                token: telegramToken,
                language: botLanguage,
                mongodb: databaseUrl
            };
            fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
            process.env.token = telegramToken;
            process.env.language = botLanguage;
            process.env.mongodb = databaseUrl;
            exec('npm install', (error, stdout, stderr) => {
                if (error) {
                    console.error('\x1b[41m\x1b[30m%s\x1b[0m', `Error al instalar dependencias: ${error}`);
                    return;
                }
                console.log('\x1b[42m\x1b[30m%s\x1b[0m', `Dependencias instaladas exitosamente: ${stdout}`);
                exec('npm start', (error, stdout, stderr) => {
                    if (error) {
                        console.error('\x1b[41m\x1b[30m%s\x1b[0m', `Error al ejecutar npm start: ${error}`);
                        return;
                    }
                    console.log('\x1b[42m\x1b[30m%s\x1b[0m', `npm start ejecutado exitosamente: ${stdout}`);
                    console.log('\x1b[42m\x1b[30m%s\x1b[0m', 'El paquete se ha instalado correctamente.');
                });
            });
        });
    });
});
