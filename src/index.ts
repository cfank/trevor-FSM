import State from './classes/State';
import Automata from './classes/Automata';
import * as data from './transitions.json';

const buildStates = (data): State[] => {
    const states = [];
    if (data.transitions) {
        const table = data.transitions;
        Object.keys(table).forEach((key) => {
            if (table && table[key] && table[key].output !== undefined) {
                states.push(new State(key, table[key].output, table[key].transitions));
            }
    })} else {
        console.log('Could not find transitions from data')
        return states;
    }
    return states;
}

const run = (input: string) => {
    const states = buildStates(data);
    if (states.length) {
        if (data.inputAlphabet) {
            const initialState = states.find((state) => state.name === 's0');
            const automata = new Automata(states, initialState, states, data.inputAlphabet);
            return automata.run(input);
        } else {
            return 'Could not find input alphabet from data';
        }
    }
}


if (process.argv && process.argv.length > 2) {
    const input = process.argv[2];
    console.log(run(input));
} else {
    console.log('Could not find input');
}