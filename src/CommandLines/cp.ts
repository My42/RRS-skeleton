import exec from './exec';
import CommandLineException from '../exceptions/CommandLineException';

export default async function (src : string, dest : string) : Promise<void> {
    try {
        await exec(`cp ${src} ${dest}`);
    } catch (e) {
        throw new CommandLineException(e.message);
    }
}
