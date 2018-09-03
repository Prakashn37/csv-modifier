import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends React.Component {
    state = {
        setsArray: [],
        input: "",
        error: "",
        display: false,
        path: "",
        set: ""

    }
    componentDidMount() {
        let setsArray = Object.keys(JSON.parse(localStorage.getItem('csvModifierStore')));
        this.setState(() => ({
            setsArray
        }));
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
            csvModifierStore[input] = {
                filesArray: []
            }
            localStorage.setItem('csvModifierStore', JSON.stringify(csvModifierStore));
            console.log('test', localStorage.getItem('csvModifierStore'));
            this.setState(() => ({
                setsArray,
                input
            }));
            console.log(setsArray);
            console.log(localStorage.getItem('csvModifierStore'));
        }
    }

    inputChange = (e) => {
        const input = e.target.value;
        this.setState(() => ({
            input
        }))
    }
    routeToSet = (element) => {
        let path = "";
        //let set = e.target.innerText;
        let set = element;
        //path = "/upload/"+e.target.innerText+"/";
        path = "/upload/" + set + "/";
        /*    if(JSON.parse(localStorage.getItem('csvModifierStore'))[e.target.innerText]["filesArray"]==[]){
            path = "/upload/"+e.target.innerText+"/";
        }
        else {
            path = "/"+e.target.innerText+"/";
        } */
        console.log(path);
        this.setState(() => ({
            path,
            display: true,
            set
        }));

    }

    render() {
        return (
            <div style={{ margin: 10 }}>
                <div className={"form-group row"}>
                    <div className="col-xs-3">
                        <input style={{ marginLeft: 10 }} type="text" className="form-control" placeholder="Enter new set name" autoFocus onChange={this.inputChange}></input>
                    </div>
                    <div style={{ margin: 10 }}>
                    </div>
                    <div className={"col-xs-3"}>
                    <button className="form-control btn btn-success" onClick={this.createSet}>Create set</button>
                    </div>
                </div>
                <p className="text-danger">{this.state.error}</p>
                <br />
                <h3>Existing set(s)</h3>
                {
                    this.state.setsArray.map((element) =>
                        (
                            <div class="btn-group" style={{ margin: 10 }}>
                                <button type="button" class="btn btn-outline-dark"
                                    onClick={(e) => this.routeToSet(element, e)}>
                                    <i class="material-icons">&#xe2c8;</i>{element}
                                </button>
                            </div>))
                }
                {this.state.display ? <Redirect to={{
                    pathname: this.state.path,
                    state: { referrer: this.state.set }
                }} /> : ''}
            </div>
        )
    }
}
/* 
        if(JSON.parse(localStorage.getItem('csvModifierStore'))[e.target.innerText]["filesArray"]==[]){
            path = "/set"+e.target.innerText+"/";
        }
        else {
            path = "/"+e.target.innerText+"/";
        }

*/