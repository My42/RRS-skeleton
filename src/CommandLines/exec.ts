import { promisify } from 'util';
import { exec as _exec } from 'child_process';
import { CommandResult } from "../interfaces";
const execNode = promisify(_exec);

const exec = (command : string) : Promise<CommandResult> => execNode(command);

export default exec;
