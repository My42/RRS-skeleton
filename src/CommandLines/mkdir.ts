import { mkdir as _mkdir } from 'fs';
import { promisify } from 'util';
import { CommandLineException } from '../exceptions';
import asyncForEach from '../utils/asyncForEach';

const mkdir = promisify(_mkdir);

const mkdirCommand = async (directories : string[]) => {
    try {
        await asyncForEach(directories, async (dir) => mkdir(dir));
    } catch (e) {
        throw new CommandLineException(e.message);
    }
};

export default mkdirCommand;
