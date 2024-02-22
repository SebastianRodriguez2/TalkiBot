const { exec } = require('child_process');

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
