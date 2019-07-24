import exec from './exec';
import YarnCommands from '../enums/YarnCommands';
import CommandLineException from '../exceptions/CommandLineException';

export default async function (command : YarnCommands, args: string[], cwd: string) : Promise<void> {
    try {
        await exec(`yarn ${command} ${args.join(' ')} --cwd ${cwd}`);
    } catch (e) {
        console.log(e);
        throw new CommandLineException(e.message);
    }
}

