import React from 'react';


export default class DisplayCSV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CSV: [[[['loading']]], [[['loading']]]],
            clickBuffer: [],
            headerClickBuffer:[],
            setName: ''
        }
    }
    eraseBuffers = () => {
        let clickBuffer = [];
        let headerClickBuffer = [];
        this.setState({clickBuffer,headerClickBuffer});
    }
    handleClick = (fileIndex, rowIndex, e) => {
        var clickBuffer = this.state.clickBuffer;
        clickBuffer.push(fileIndex,rowIndex);
        this.setState({ clickBuffer });
        console.log(clickBuffer);
        if (clickBuffer.length === 4 && (clickBuffer[1] != 0 && clickBuffer[3] != 0)) {
            let CSV = this.state.CSV;
            let buf = CSV[clickBuffer[0]][clickBuffer[1]];
            CSV[clickBuffer[0]][clickBuffer[1]] = CSV[clickBuffer[2]][clickBuffer[3]];
            CSV[clickBuffer[2]][clickBuffer[3]] = buf;
            clickBuffer = [];
            console.log('swapped');

            this.setState({ CSV, clickBuffer });
        }
        else if (clickBuffer.length === 4) {
            clickBuffer = [];
            this.setState({ clickBuffer });
        }
    }
    headerClick = (fileIndex, rowIndex, cellIndex, e) =>{
        let CSV = this.state.CSV;
        var headerClickBuffer = this.state.headerClickBuffer;
        headerClickBuffer.push(fileIndex,cellIndex);
        this.setState({ headerClickBuffer });
        if(headerClickBuffer.length === 4 && headerClickBuffer[0] === headerClickBuffer[2]){
            let buf = CSV[headerClickBuffer[0]][0][headerClickBuffer[1]];
            CSV[headerClickBuffer[0]][0][headerClickBuffer[1]] = CSV[headerClickBuffer[2]][0][headerClickBuffer[3]];
            CSV[headerClickBuffer[2]][0][headerClickBuffer[3]] = buf;
            headerClickBuffer = [];
            this.setState({CSV,headerClickBuffer});
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
    componentDidMount() {
        const { set } = this.props.match.params;
        this.setState({ CSV: this.props.contents, setName:set });
    };

    render() {
        return (
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
                                                    return rowIndex === 0 ? <th onClick={(e) => this.headerClick(fileIndex, rowIndex, cellIndex, e)}className={"info"}>{cell}</th> :
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
                <button onClick={this.eraseBuffers} className={"btn btn-dark btn-block"}>Erase Selections</button>
            </div>
        )
    }
}