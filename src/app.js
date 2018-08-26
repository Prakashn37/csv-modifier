import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import DisplayCSV from './components/DisplayCSV';

class Test extends React.Component {
  state = {
    filesArray: [],
    submitted: false
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
    if (this.state.filesArray.length) {
      this.setState({ submitted: true });
    }
  }

  render() {
    return (
      <div className={"container"}>
      <h1><u>CSV Modifier - Beta</u></h1>
        {this.state.submitted == true ? (
          <div className={"container"}>
          <DisplayCSV contents={this.state.filesArray}/>
          </div>
        )
          : (
            <div className={"container"}>

              {this.state.filesArray.length == 0 ?
                <div>
                <h3>Instructions:</h3>
                  <ul className="list-group">
                    <li>Please upload CSV files only</li>
                    <li>Keep the input file small</li>
                    <li>To change the value in a cell, double click on the cell</li>
                  </ul>
                </div> : <p></p>}
              {this.state.filesArray.length == 4 ? <h3>You can't choose any more files</h3>
                :
                <h3>You can choose up to {4 - this.state.filesArray.length} file(s)</h3>}

              <input type="file" className={"btn btn-light btn-block"} onChange={this.readSingleFile} />
              <button type="button" className="btn btn-secondary btn-lg btn-block" disabled={this.state.filesArray.length == 0} onClick={this.filesSubmitted}>
                {
                  this.state.filesArray.length == 0 ?
                    <span>Choose at least one file</span>
                    :
                    <span>Submit {this.state.filesArray.length} {this.state.filesArray.length == 1 ? <span> File</span> : <span> Files</span>}
                    </span>
                }
              </button>
            </div>
          )
        }
      </div>
    );
  }
}
ReactDOM.render(<Test />, document.getElementById('app'));