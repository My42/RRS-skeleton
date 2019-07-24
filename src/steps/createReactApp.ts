import { createReactApp } from '../CommandLines';

export default async function (appName : string, path : string) : Promise<void> {
    await createReactApp(appName, path);
    console.log(`#1 Directory "${path}/${appName}" created`);
}
