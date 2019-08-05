import {
    createReactApp,
    createReduxFiles,
    createSagaFiles,
    installDependencies,
    updateAppIndex,
    updateSkeleton
} from "./steps";
import asyncForEach from "./utils/asyncForEach";

export default async function(appName : string, path : string) : Promise<void> {
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
    await asyncForEach(steps, (step) => step());
    console.log('Happy hacking!');
    console.log(`done in ${seconds}s.`);
    clearInterval(intervalId);
}
