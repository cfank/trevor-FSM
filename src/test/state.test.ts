import { expect } from 'chai';
import State from '../classes/State';
import { it } from 'mocha';

const getState = (name: string, output: number, transitions: { [input: string]: string; } ) => {
    return new State(name, output, transitions);
}

describe('State', () => {
    describe('transition', () => {
        it('should return a proper transition if constructed with good data', () => {
            const simpleTransition = {
                "a": "b"
            };            
            const testState = getState('state1', 1, simpleTransition);
            expect(testState.transition('a')).to.equal('b');
        });
        it('should properly transition if there are multiple transitions', () => {
            const multipleTransitions = {
                "1": 'otherState',
                "2": 'differentState',
            };
            const testState = getState('state1', 2, multipleTransitions);
            expect(testState.transition('1')).to.equal('otherState');
            expect(testState.transition('2')).to.equal('differentState');
        });
        it('should return undefined if transitions do not exist', () => {
            const notExistTransitions = {
                'foo': 'bar',
                'test': 'state',
            };
            const testState = getState('notExist', 1, notExistTransitions);
            expect(testState.transition('unknown')).to.be.undefined;
            expect(testState.transition('')).to.be.undefined;
            expect(testState.transition(undefined)).to.be.undefined;
        });
    })
})