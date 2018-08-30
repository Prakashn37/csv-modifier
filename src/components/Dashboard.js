import React from 'react';

export default class Dashboard extends React.Component {
    state = {
        setsArray: [],
        input: "",
        error: ""
    }
    componentDidMount() {
        let setsArray = [];
        setsArray = Object.keys(JSON.parse(localStorage.getItem('csvModifierStore'))) || [];
        this.setState({ setsArray });
    }
    createSet = () => {
        let setsArray = this.state.setsArray;
        let input = this.state.input;
        if (input.length === 0) {
            this.setState({ error: "Please enter set name" });
            setTimeout(() => {
                this.setState({ error: "" });
            }, 1200);
        }
        else if (this.state.setsArray.indexOf(input) != -1) {
            this.setState({ error: `${input} already exists` });
            setTimeout(() => {
                this.setState({ error: "" });
            }, 1200);
        }
        if (input.length != 0 && this.state.setsArray.indexOf(input) === -1) {
            setsArray.push(this.state.input);
            let csvModifierStore = JSON.parse(localStorage.getItem('csvModifierStore'));
            csvModifierStore[input] = [];
            localStorage.setItem('csvModifierStore',JSON.stringify(csvModifierStore));
            console.log('test',localStorage.getItem('csvModifierStore'));
            this.setState(() => ({
                setsArray,
                input
            }));
        }
    }

    inputChange = (e) => {
        const input = e.target.value;
        this.setState(() => ({
            input
        }))
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Enter new set name" autoFocus onChange={this.inputChange}></input>
                <button onClick={this.createSet}>Create set</button>
                <p className="text-danger">{this.state.error}</p>
                <br />
                {
                    this.state.setsArray.map((element) => (<button>{element}</button>))
                }
            </div>
        )
    }
}
