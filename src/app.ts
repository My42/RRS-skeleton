import Options from './enums/Options';
import { isUndefined } from 'lodash';
import getHelp from './getHelp';
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

if (isUndefined(appName) || isUndefined(path) || options.some(option => option === Options.HELP)) {
    console.log(getHelp());
} else {
    const appPath : string = `${path}/${appName}`;
    let seconds : number = 0;
    const steps = [
        () => createReactApp(appName, path),
        () => updateSkeleton(appPath),
        () => installDependencies(appPath),
        () => createReduxFiles(appPath),
        () => createSagaFiles(appPath),
        () => updateAppIndex(appPath),
    ];

    const intervalId = setInterval(() => { seconds += 1 }, 1000);
    console.log({ appName, path, options });
    asyncForEach(steps, (step) => step())
        .then(() => {
            console.log('Happy hacking!');
            console.log(`done in ${seconds}s.`);
            clearInterval(intervalId);
        })
        .catch((e) => {
            console.log(e.message);
            process.exit(1);
        });
}

