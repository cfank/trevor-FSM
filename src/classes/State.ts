class State {
    name: string;
    output: number;
    // mappings for an arbitrary number of input strings to state names
    transitions: {
        [input: string]: string;
    }

    constructor(name: string, output: number, transitions: { [input: string]: string; }) {
        this.name = name;
        this.output = output;
        this.transitions = transitions;
    }

    transition = (input: string): string => {
        if (this.transitions && this.transitions[input]) {
            return this.transitions[input];
        }
    }
}

export default State;