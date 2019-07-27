import Directories from '../enums/Directories';
import mkdir from '../CommandLines/mkdir';

export default async function (appPath : string) : Promise<void> {
    const srcPath = `${appPath}/${Directories.SRC}`;
    const directories = [
        `${srcPath}/${Directories.FEATURES}`,
        `${srcPath}/${Directories.REDUCERS}`,
        `${srcPath}/${Directories.SAGA}`,
        `${srcPath}/${Directories.UX}`,
        `${srcPath}/${Directories.UX}/${Directories.ATOMS}`,
        `${srcPath}/${Directories.UX}/${Directories.MOLECULES}`,
        `${srcPath}/${Directories.UX}/${Directories.ORGANISMS}`,
        `${srcPath}/${Directories.UX}/${Directories.PAGES}`,
    ];
    await mkdir(directories);
    console.log("¤ App's skeleton updated");
}
