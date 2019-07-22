import Options from './enums/Options';
import {step1, step2 } from './steps';

const isAnOption = arg => arg.startsWith('--');

const options = process.argv.filter(isAnOption);

const [appName, path] = process.argv.filter(arg => !isAnOption(arg)).slice(2);

if (options.some(option => option === Options.HELP)) {
    console.log(`Usage: node app.js APP_NAME PATH [OPTIONS]
Create a skeleton of a react project ready for hacking with redux & saga configured
        --help      display this help and exit
    `);
} else {
    console.log({ appName, path, options });
    (async function() {
        try {
            await step1(appName, path); // create react-app
            await step2(`${path}/${appName}`); // create react-app
        } catch (e) {
            console.log(e.message);
            process.exit(1);
        }
    })();
}

