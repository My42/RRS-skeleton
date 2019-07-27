import cp from '../CommandLines/cp';

export default async function (appPath : string) : Promise<void> {
    await cp('RSSFiles/js/src/reducers/*', `${appPath}/src/reducers`);
    console.log('¤ Redux files created');
}
