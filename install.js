const { exec } = require('child_process');
const fs = require('fs');
exec('git clone https://github.com/BOT-TX/TalkiBot', (error, stdout, stderr) => {
   if (error) {
       console.error(`Error al clonar el repositorio: ${error}`);
       return;
   }
   console.log(`Repositorio clonado exitosamente: ${stdout}`);
   process.chdir('repo');
   exec('npm install', (error, stdout, stderr) => {
       if (error) {
           console.error(`Error al instalar dependencias: ${error}`);
           return;
       }
       console.log(`Dependencias instaladas exitosamente: ${stdout}`);
       exec('npm start', (error, stdout, stderr) => {
           if (error) {
               console.error(`Error al ejecutar npm start: ${error}`);
               return;
           }
           console.log(`npm start ejecutado exitosamente: ${stdout}`);
           console.log('El paquete se ha instalado correctamente.');
       });
   });
});
