import cp from "../CommandLines/cp";


export default async function (appPath : string) : Promise<void> {
    await cp('RSSFiles/js/src/index.js', `${appPath}/src`);
    console.log("App's index updated");
}
