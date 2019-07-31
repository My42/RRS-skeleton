import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import asyncForEach from '../src/utils/asyncForEach';

const { expect } = chai;

before(() => {
    chai.should();
    chai.use(chaiAsPromised);
});

const sleep = (ms) => new Promise((res) => {
    setTimeout(() => res(), ms);
});

describe('asyncForEach', () => {
   it('should call each callback one by one', async () => {
       const steps = [1, 2, 3];
       const checkSteps = [];

       await asyncForEach(steps, async (step) => {
           await sleep(500);
           checkSteps.push(step);
       });

       expect(checkSteps.toString()).to.equal(steps.toString());
   })
});
