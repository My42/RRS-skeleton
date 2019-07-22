import exec from './exec';
import CommandLineException from '../exceptions/CommandLineException';
import { ExecException } from "child_process";

const createReactApp = async (appName : string, path : string) => {
    try {
        const directoryPath = `${path}/${appName}`;
        await exec(`npx create-react-app ${directoryPath}`);
        console.log(`Directory "${path}/${appName}" created`);
    } catch (e) {
        throw new CommandLineException((e as ExecException) ? `An error occurred: ${e.stdout}` : `An unknown error occurred`);
    }
};

export default createReactApp;
