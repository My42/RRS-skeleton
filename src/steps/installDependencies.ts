import Yarn from '../CommandLines/yarn';
import YarnCommands from "../enums/YarnCommands";

export default async function (appPath: string) : Promise<void> {
    await Yarn(YarnCommands.ADD, ['redux', 'react-redux', 'redux-saga'], appPath);
    console.log('#3 dependencies installed');
}
