import { expect } from 'chai';
import Automata from '../classes/Automata';
import State from '../classes/State';
import { it } from 'mocha';

const getState = (name: string, output: number, transitions: { [input: string]: string; } ) => {
    return new State(name, output, transitions);
}

const getAutomata =(states: State[], initialState: State, finalStates: State[], inputAlphabet: string[]) => {
    return new Automata(states, initialState, finalStates, inputAlphabet);
}

describe('Automata', () => {
    describe('findState', () => {
        it('should find a state if it exists', () => {
            const simpleTransition = {
                "a": "b"
            };
            const states = [
                getState('state1', 1, simpleTransition),
                getState('state2', 2, simpleTransition)
            ];
            const Automata = getAutomata(states, states[0], states, ['a','b']);
            expect(Automata.findState('state1')).to.haveOwnProperty('name');
            expect(Automata.findState('state1')).to.haveOwnProperty('output');
            expect(Automata.findState('state1')).to.haveOwnProperty('transitions');
            expect(Automata.findState('state1').output).to.equal(1);
            expect(Automata.findState('state1').name).to.equal('state1');
            expect(Automata.findState('state1').transitions['a']).to.equal('b');
        });
        it('should not find a state if it does not exists', () => {
            const simpleTransition = {
                "a": "b"
            };
            const states = [
                getState('state1', 1, simpleTransition),
                getState('state2', 2, simpleTransition)
            ];
            const Automata = getAutomata(states, states[0], states, ['a','b']);
            expect(Automata.findState('nothing')).to.be.undefined;
        });
    })
    describe('transitionState', () => {
        it('should transition to a new state if given correct input', () => {
            const transition1 = {
                "a": "state2",
                "b": "state1"
            };
            const transition2 = {
                "a": "state1",
                "b": "state2"
            }
            const states = [
                getState('state1', 1, transition1),
                getState('state2', 2, transition2)
            ];
            const automata = getAutomata(states, states[0], states, ['a','b']);
            automata.transitionState('a');
            expect(automata.currentState.name).to.equal('state2');
            automata.transitionState('b');
            expect(automata.currentState.name).to.equal('state2');
            automata.transitionState('a');
            expect(automata.currentState.name).to.equal('state1');
            automata.transitionState('b');
            expect(automata.currentState.name).to.equal('state1');
        });
        it('should throw an error if called with invalid input', () => {
            const transition1 = {
                "0": "state2",
                "1": "state1"
            };
            const states = [
                getState('state1', 1, transition1),
                getState('state2', 2, transition1)
            ];
            const automata = getAutomata(states, states[0], states, ['0', '1']);
            expect(() => {
                automata.transitionState('z');
            }).to.throw('Transition input character z not found in input Alphabet');
        });
        it('should throw an error if transitioning to unknown state', () => {
            const transition1 = {
                "0": "state2",
                "1": "unknownStateName"
            };
            const states = [
                getState('state1', 1, transition1),
                getState('state2', 2, transition1)
            ];
            const automata = getAutomata(states, states[0], states, ['0', '1']);
            expect(() => {
                automata.transitionState('1');
            }).to.throw('State transitioned to unknownStateName not found in Automata states');
        });
    })
    describe('run', () => {
        it('should end up in the correct state given input string', () => {
            const transition1 = {
                "a": "state2",
                "b": "state1"
            };
            const transition2 = {
                "a": "state1",
                "b": "state2"
            }
            const states = [
                getState('state1', 1, transition1),
                getState('state2', 2, transition2)
            ];
            const automata = getAutomata(states, states[0], states, ['a','b']);
            // (init) 1 -(a)> 2 -(a)> 1 -(b)> 1 -(a)> 2 
            expect(automata.run('aaba')).to.equal(2);
        });
        it('should return initial state output if run with empty string', () => {
            const transition1 = {
                "a": "state2",
                "b": "state1"
            };
            const transition2 = {
                "a": "state1",
                "b": "state2"
            }
            const states = [
                getState('state1', 1, transition1),
                getState('state2', 2, transition2)
            ];
            const automata = getAutomata(states, states[0], states, ['a','b']);
            // (init) 1 -(a)> 2 -(a)> 1 -(b)> 1 -(a)> 2 
            expect(automata.run('')).to.equal(1);
        });
        it('should return a message if final state not allowed', () => {
            const transition1 = {
                "a": "state2",
                "b": "state1"
            };
            const transition2 = {
                "a": "state1",
                "b": "state2"
            }
            const states = [
                getState('state1', 1, transition1),
                getState('state2', 2, transition2)
            ];
            const finalStates = [states[0]];
            const automata = getAutomata(states, states[0], finalStates, ['a','b']);
            // (init) 1 -(a)> 2 -(a)> 1 -(b)> 1 -(a)> 2 
            expect(automata.run('a')).to.equal('Final state with name state2 not in allowed final states');
        });
    })
})