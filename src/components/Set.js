import React from 'react';
import { Redirect } from 'react-router-dom';

export default class Set extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    filesArray: [],
    submitted: false,
    setName: '',
    redirect: false,
    pathName: ''
  }
  readSingleFile = (evt) => {
    var f = evt.target.files[0];

    if (f) {
      var r = new FileReader();
      var filesArray = this.state.filesArray;
      r.onload = (e) => {
        var contents = e.target.result;
        contents = contents.toString().split('\r\n');
        contents = contents.map(element => element.split(','));
        console.log('testing', contents);
        contents.pop();
        filesArray.push(contents);
        this.setState({ filesArray });
        console.log(this.state.filesArray);
      }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }

  filesSubmitted = () => {
    let csvModifierStore = JSON.parse(localStorage.getItem('csvModifierStore'));
    console.log('state',this.state);
    csvModifierStore[this.state.setName]["filesArray"] = this.state.filesArray;
    localStorage.setItem('csvModifierStore',JSON.stringify(csvModifierStore));
    console.log('testing submit',localStorage.getItem('csvModifierStore')); 
    this.setState(()=>(
      { submitted: true, redirect: true }
    ));

  }
  continue = () => {
    this.setState(()=>(
      { submitted: true, redirect: true }
    ));
  }
  componentDidMount() {
      let setName = this.props.match.params.set;
      let pathName = "/" + setName + "/";
      this.setState(()=>({
        setName,
        pathName
      }));
}

  render() {
    return (
      <div className={"container"}>

        {this.state.filesArray.length == 0 ?
          <div>
            <h3>Instructions</h3>
            <ul className="list-group">
              <li>Please upload CSV files only</li>
              <li>Keep the input file small</li>
              <li>To change the value of a cell, double click on the cell</li>
            </ul>
          </div> : <p></p>}
        {this.state.filesArray.length == 4 ? <h3>You can't choose any more files</h3>
          :
          <h3>You can choose up to {4 - this.state.filesArray.length} file(s)</h3>}

        <input type="file" className={"btn btn-light btn-block"} onChange={this.readSingleFile} />
        <button type="button" className="btn btn-secondary btn-lg btn-block" disabled={this.state.filesArray.length == 0} onClick={this.filesSubmitted}>
          {
            this.state.filesArray.length == 0 ?
              <span>Add new file(s)</span>
              :
              <span>Submit {this.state.filesArray.length} {this.state.filesArray.length == 1 ? <span> File</span> : <span> Files</span>}
              </span>
          }
        </button>
        <button onClick={this.continue} className={"btn btn-dark btn-block"}>Continue with existing data</button>
        {
          this.state.redirect?<Redirect to={{
            pathname:this.state.pathName, 
            state:{referrer:this.state.setName}}} />:''
        }
      </div>
    )
  }
}

/*        <div className={"container"}>
        <h1><u>CSV Modifier - Beta</u></h1>
          {this.state.submitted == true ? (
            <div className={"container"}>
            <DisplayCSV contents={this.state.filesArray}/>
            </div>
          )
            :  */