import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import exec, { cp } from '../src/CommandLines';
import { readFile as _readFile, unlink } from 'fs';
import { promisify } from 'util';

const { expect } = chai;
const readFile = promisify(_readFile);

before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

describe('Exec command', () => {
    it('should return a CommandLineResult', async () => {
        const result = await exec('ls');
        expect(result).to.have.all.keys(['stdout', 'stderr']);
    });

    it('should throw an error when the command is bad', async () => {
        return expect(exec('bad command')).to.be.rejectedWith(Error);
    });
});

describe('cp command', () => {
   it('should copy a file', async () => {
       const srcPath = 'test/commandLines.test.ts';
       const tmpPath = 'test/tmp';

        await cp(srcPath, tmpPath);
        const srcContent = await readFile(srcPath, 'utf8');
        const tmpContent = await readFile(tmpPath, 'utf8');
        expect(srcContent).to.be.equal(tmpContent, 'expected the content of src file be equal to the content of dest file');
        unlink(tmpPath, (err) => { if (err) console.log("Couldn't remove test/tmp file") });
   });

    it ('should throw an error when src path is bad', async () => {
        const srcPath = 'INVALID_PATH';
        const tmpPath = 'tmp';

        return expect(cp(srcPath, tmpPath)).to.be.rejectedWith(Error);
    });
});
