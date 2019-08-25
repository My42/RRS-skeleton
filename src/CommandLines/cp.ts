import { copy } from 'fs-extra';
import CommandLineException from '../exceptions/CommandLineException';

export default async function (src : string, dest : string) : Promise<void> {
    try {
        await copy(src, dest);
    } catch (e) {
        throw new CommandLineException(e.message);
    }
}
