import React from 'react';

export default class DisplayCSV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CSV: [[[['loading']]], [[['loading']]]],
            clickBuffer: [],
            headerClickBuffer: [],
            setName: '',
            message:''
        }
    }
    eraseBuffers = () => {
        let clickBuffer = [];
        let headerClickBuffer = [];
        let message = '';
        this.setState(()=>({ clickBuffer, headerClickBuffer,message }));
    }
    handleClick = (fileIndex, rowIndex, e) => {
        var clickBuffer = this.state.clickBuffer;
        let message = this.state.message;
        clickBuffer.push(fileIndex, rowIndex);
        this.setState({ clickBuffer });
        console.log(clickBuffer);
        if(rowIndex!=0)
        message = `${message} File: ${fileIndex+1} row ${rowIndex} clicked\n`;
        this.setState(()=>({message})); 
        if (clickBuffer.length === 4 && (clickBuffer[1] != 0 && clickBuffer[3] != 0)) {
            let CSV = this.state.CSV;
            let buf = CSV[clickBuffer[0]][clickBuffer[1]];
            CSV[clickBuffer[0]][clickBuffer[1]] = CSV[clickBuffer[2]][clickBuffer[3]];
            CSV[clickBuffer[2]][clickBuffer[3]] = buf;
            clickBuffer = [];
            console.log('swapped');
            this.setState(()=>({ CSV, clickBuffer}));
            setTimeout(() => {
                this.setState(()=>({message:''}));
            }, 500);
        }
        else if (clickBuffer.length === 4) {
            clickBuffer = [];
            this.setState({ clickBuffer });
        }
    }
    headerClick = (fileIndex, rowIndex, cellIndex, e) => {
        let CSV = this.state.CSV;
        var headerClickBuffer = this.state.headerClickBuffer;
        headerClickBuffer.push(fileIndex, cellIndex);
        this.setState({ headerClickBuffer });
        if (headerClickBuffer.length === 4 && headerClickBuffer[0] === headerClickBuffer[2]) {
            let buf = CSV[headerClickBuffer[0]][0][headerClickBuffer[1]];
            CSV[headerClickBuffer[0]][0][headerClickBuffer[1]] = CSV[headerClickBuffer[2]][0][headerClickBuffer[3]];
            CSV[headerClickBuffer[2]][0][headerClickBuffer[3]] = buf;
            headerClickBuffer = [];
            this.setState(()=>({ CSV, headerClickBuffer,message:'' }));
        }

    }
    handleDoubleClick = (fileIndex, rowIndex, cellIndex, e) => {
        let x, buf, CSV = this.state.CSV;
        console.log(fileIndex, rowIndex, cellIndex);
        buf = this.state.CSV[fileIndex][rowIndex][cellIndex];
        x = prompt('Update', CSV[fileIndex][rowIndex][cellIndex]);
        CSV[fileIndex][rowIndex][cellIndex] = (x == "" || x == null ? buf : x);
        this.setState({ CSV });
    }
    saveChanges = () => {
        let CSV = JSON.parse(localStorage.getItem('csvModifierStore'));
        CSV[this.state.setName]["filesArray"] = this.state.CSV;
        localStorage.setItem('csvModifierStore', JSON.stringify(CSV));
        this.setState(()=>({message:'Changes saved'}));
        setTimeout(() => {
            this.setState(()=>({message:''})); 
        }, 1000);
    }
    dashboardPage = () => {
        this.props.history.push('/');
    }
    componentDidMount() {
        if (this.props.location.state && this.props.location.state.referrer) {
            let setName = this.props.location.state.referrer;
            this.setState(() => ({
                setName
            }));
        }
        setTimeout(() => {
            if (this.state.setName != '') {
                let CSV = JSON.parse(localStorage.getItem('csvModifierStore'))[this.state.setName]["filesArray"];
                this.setState(() => ({ CSV }));
            }
        }, 100);


    };

    render() {
        return (
            <div style={{ margin: 20 }}>
                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <button onClick={this.dashboardPage} className="btn btn-outline-secondary">Dashboard</button>
                <button onClick={this.saveChanges} className="btn btn-outline-secondary" >Save changes</button>
                <button onClick={this.eraseBuffers} className="btn btn-outline-secondary">Erase Selections</button>
                </div>
                <p>Message : {this.state.message}</p>
                <div className={"row"}>
                    {
                        this.state.CSV.map((file, fileIndex) => (
                            <table style={{ margin: 10 }} className={"table-bordered col-md-5"}>
                                <tbody>
                                    {
                                        file.map((row, rowIndex) => (
                                            <tr onClick={(e) => this.handleClick(fileIndex, rowIndex, e)}>
                                                {
                                                    row.map((cell, cellIndex) => {
                                                        return rowIndex === 0 ? <th onClick={(e) => this.headerClick(fileIndex, rowIndex, cellIndex, e)} className={"info"}>{cell}</th> :
                                                        <td onDoubleClick={(e) => this.handleDoubleClick(fileIndex, rowIndex, cellIndex, e)}>{cell}</td>
                                                    })
                                                }
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ))
                    }
                    <br />
                </div>

            </div>
        )
    }
}
