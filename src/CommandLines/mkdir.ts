import { platform } from 'os';
import exec from './exec';
import { CommandLineException } from '../exceptions';

const mkdir = async (directories : string[]) => {
    try {
        const tmp = directories.map(dir => `"${dir}"`);

        switch (platform()) {
            case 'win32':
                await exec(`md ${tmp.join(' ')}`);
                break;
            default:
                console.log(await exec(`mkdir ${tmp.join(' ')}`));
        }
    } catch (e) {
        throw new CommandLineException(e.message);
    }
};

export default mkdir;
