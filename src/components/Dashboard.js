import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends React.Component {
    state = {
        setsArray:[],
        input: "",
        error: "",
        display:false,
        path:"",
        set:""

    }
    componentDidMount() {
        let setsArray = Object.keys(JSON.parse(localStorage.getItem('csvModifierStore')));
        this.setState(()=>({
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
                filesArray:[]
            }
            localStorage.setItem('csvModifierStore',JSON.stringify(csvModifierStore));
            console.log('test',localStorage.getItem('csvModifierStore'));
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
    routeToSet = (e) => {
        let path = "";
        let set = e.target.innerText; 
        path = "/upload/"+e.target.innerText+"/";
        /*    if(JSON.parse(localStorage.getItem('csvModifierStore'))[e.target.innerText]["filesArray"]==[]){
            path = "/upload/"+e.target.innerText+"/";
        }
        else {
            path = "/"+e.target.innerText+"/";
        } */
        console.log(path);
        this.setState(()=>({
            path,
            display:true,
            set
        }));

    }

    render() {
        return (
            <div>
                <input type="text" placeholder="Enter new set name" autoFocus onChange={this.inputChange}></input>
                <button onClick={this.createSet}>Create set</button>
                <p className="text-danger">{this.state.error}</p>
                <br />
                {
                    this.state.setsArray.map((element) => (<button onClick={this.routeToSet}>{element}</button>))
                }
                {this.state.display?<Redirect to={{
                    pathname:this.state.path, 
                    state:{referrer:this.state.set}}} />:''}
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