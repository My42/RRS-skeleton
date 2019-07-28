import cp from '../CommandLines/cp';

export default async function (appPath : string) : Promise<void> {
    await cp('RSSFiles/js/src/sagas/*',`${appPath}/src/sagas`);
    console.log('¤ Saga files created');
}
