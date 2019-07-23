import exec from './exec';
import YarnCommands from '../enums/YarnCommands';
import CommandLineException from '../exceptions/CommandLineException';

export default async function (command : YarnCommands, args: string[]) : Promise<void> {
    try {
        await exec(`yarn ${command} ${args.join(' ')}`);
    } catch (e) {
        throw new CommandLineException(e.message);
    }
}

