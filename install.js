const { exec } = require('child_process');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Ingresa el token de acceso a Telegram: ', (telegramToken) => {
    rl.question('Ingresa el lenguaje del bot: ', (botLanguage) => {
        rl.question('Ingresa la URL de la base de datos: ', (databaseUrl) => {
            rl.question('Ingresa el apikey de ApiKasu: ', (apikey) => {
            rl.close();
            process.env.token = telegramToken;
            process.env.language = botLanguage;
            process.env.mongodb = databaseUrl;
            process.env.apikey = apikey;
            const config = {
                token: telegramToken,
                language: botLanguage,
                mongodb: databaseUrl,
                apikey: apikey
            };
            fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
            console.log('Variables de entorno configuradas:');
            console.log(`process.env.token: ${process.env.token}`);
            console.log(`process.env.language: ${process.env.language}`);
            console.log(`process.env.mongodb: ${process.env.mongodb}`);
            console.log(`process.env.apikey: ${process.env.apikey}`);
                const startProcess = exec('npm start', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error al ejecutar npm start: ${error}`);
                        return;
                    }
                    console.log(`npm start ejecutado exitosamente: ${stdout}`);
                    console.log('El paquete se ha instalado correctamente.');
                });
                startProcess.stdout.pipe(process.stdout);
                startProcess.stderr.pipe(process.stderr);
                startProcess.on('exit', (code) => {
                    console.log(`npm start ha terminado con código de salida: ${code}`);
                });
            });
        });
    });
})
