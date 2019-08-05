import * as commandExists from 'command-exists';
import asyncForEach from './utils/asyncForEach';

export default async function() : Promise<void> {
    const requiredCommands = ['tsc', 'yarn'];

    await asyncForEach(requiredCommands, async (requiredCmd) => {
        try {
            await commandExists(requiredCmd);
        } catch (e) {
            throw new Error(`"${requiredCmd}" command is required`);
        }
    });
}
