import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import exec from '../src/CommandLines';

const { expect } = chai;

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
