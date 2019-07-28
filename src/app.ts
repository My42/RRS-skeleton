import Options from './enums/Options';
import {
    createReactApp,
    updateSkeleton,
    installDependencies,
    createReduxFiles,
    createSagaFiles,
    updateAppIndex,
} from './steps';

const isAnOption = arg => arg.startsWith('--');

const options = process.argv.filter(isAnOption);

const [appName, path] = process.argv.filter(arg => !isAnOption(arg)).slice(2);

async function asyncForEach<T>(array : T[], cb : (T) => void) : Promise<void> {
    if (array.length === 0) return;
    await cb(array[0]);
    await asyncForEach(array.slice(1), cb);
}

if (options.some(option => option === Options.HELP)) {
    console.log(`Usage: node app.js APP_NAME PATH [OPTIONS]
Create a skeleton of a react project ready for hacking with redux & saga configured
        --help      display this help and exit
    `);
} else {
    const appPath : string = `${path}/${appName}`;
    const steps = [
        () => createReactApp(appName, path),
        () => updateSkeleton(appPath),
        () => installDependencies(appPath),
        () => createReduxFiles(appPath),
        () => createSagaFiles(appPath),
        () => updateAppIndex(appPath),
    ];

    console.log({ appName, path, options });

    asyncForEach(steps, (step) => step())
        .then(() => console.log('Happy hacking!')) // TODO: add how many seconds it took
        .catch((e) => {
            console.log(e.message);
            process.exit(1);
        });
}

