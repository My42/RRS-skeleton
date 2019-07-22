import { Options } from './enums';

const isAnOption = arg => arg.startsWith('--');

const options = process.argv.filter(isAnOption);

const [appName] = process.argv.filter(arg => !isAnOption(arg)).slice(2);

if (options.some(option => option === Options.HELP)) {
    console.log(`Usage: node app.js APP_NAME [OPTIONS]
Create a skeleton of a react project ready for hacking with redux & saga configured
        --help      display this help and exit
    `);
} else {
    console.log({ appName, options });
}
