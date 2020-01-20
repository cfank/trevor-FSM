import State from './State';


class Automata {
    states: State[];
    initialState: State;
    finalStates: State[];
    currentState: State;
    inputAlphabet: string[];

    constructor(states: State[], initialState: State, finalStates: State[], inputAlphabet: string[]) {
        this.initialState = initialState;
        this.currentState = initialState;
        this.states = states;
        this.finalStates = finalStates;
        this.inputAlphabet = inputAlphabet;
    }

    findState(name: string): State {
        return this.states.find((state) => state.name === name);
    }

    // Verify input against allowed alphabet, and transition to next state if it exists
    transitionState(input: string) {
        if (this.inputAlphabet.includes(input)) {
            const nextStateName = this.currentState.transition(input);
            const nextState = this.findState(nextStateName);
            if (nextState) {
                this.currentState = nextState;
            } else {
                throw new Error(`State transitioned to ${nextStateName} not found in Automata states`);
            }
        } else {
            throw new Error(`Transition input character ${input} not found in input Alphabet`);
        }
    }

    // Process entire input string
    run = (input: string) => {
        for (let i of input) {
            try {
                this.transitionState(i);
            } catch (e) {
                return `Error while transitioning states: ${e}`;
            }
        }
        if (this.finalStates.map((s) => s.name).includes(this.currentState.name)) {
            return this.currentState.output;
        } else {
            return `Final state with name ${this.currentState.name} not in allowed final states`;
        }
    }
}

export default Automata;