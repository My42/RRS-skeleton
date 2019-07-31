import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import exec, { cp, yarn, createReactApp } from '../src/CommandLines';
import { readFile as _readFile, unlink } from 'fs';
import { promisify } from 'util';
import YarnCommands from "../src/enums/YarnCommands";

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

describe('yarn command', () => {
    const dependencyName = 'is-obj';

    it('should give the version', async () => {
        return yarn(YarnCommands.VERSION, [], './');
    });

    it('should add a dependency', async () => {
        await yarn(YarnCommands.ADD, [dependencyName], './');
        const { dependencies } = JSON.parse(await readFile('package.json', 'utf8'));
        return expect(dependencies).to.include.all.keys(['is-obj']);
    });

    it('should remove a dependency', async () => {
        await yarn(YarnCommands.REMOVE, [dependencyName], './');
        const { dependencies } = JSON.parse(await readFile('package.json', 'utf8'));
        return expect(dependencies).to.not.include.all.keys(['is-obj']);
    });
});

describe('createReactApp command', () => {
    it('should not throw an error', async function () {
        this.timeout(60000);
        await expect(createReactApp('tmp', './')).to.not.be.rejectedWith(Error);
        return exec('rm -rf ./tmp');
    });
});
