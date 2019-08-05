import Options from './enums/Options';
import { isUndefined } from 'lodash';
import getHelp from './getHelp';
import createProject from './createProject';
import checkRequiredCommands  from './checkRequiredCommands';

const isAnOption = arg => arg.startsWith('--');

const options = process.argv.filter(isAnOption);

const [appName, path] = process.argv.filter(arg => !isAnOption(arg)).slice(2);

if (isUndefined(appName) || isUndefined(path) || options.some(option => option === Options.HELP)) {
    console.log(getHelp());
}
else {
    checkRequiredCommands()
        .then(() => createProject(appName, path))
        .catch((e) => {
            console.log(e.message);
            process.exit(1);
        });
}

