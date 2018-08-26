import React from 'react';
import $ from 'jquery';

let CSV, rows;



export default class DisplayCSV extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CSV: [[[['loading']]], [[['loading']]]],
            clickBuffer: ''
        }
    }
    handleClick = (fileIndex, rowIndex, e) => {
        var clickBuffer = this.state.clickBuffer;
        clickBuffer += '' + fileIndex + rowIndex;
        this.setState({ clickBuffer });
        console.log(clickBuffer);
        if (clickBuffer.length === 4 && (clickBuffer[1] != 0 || clickBuffer[3] != 0)) {
            let len = this.state.clickBuffer.length;
            let CSV = this.state.CSV;
            let buf = CSV[clickBuffer[0]][clickBuffer[1]];
            CSV[clickBuffer[0]][clickBuffer[1]] = CSV[clickBuffer[2]][clickBuffer[3]];
            CSV[clickBuffer[2]][clickBuffer[3]] = buf;
            clickBuffer = '';
            console.log('swapped');

            this.setState({ CSV, clickBuffer });
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
        this.setState({ CSV: this.props.contents });
    };

    render() {
        return (
            <div className={"row"}>
                {
                    this.state.CSV.map((file, fileIndex) => (
                        <table style={{ margin: 10 }} className={"table-bordered col-md-5"}>
                            {
                                file.map((row, rowIndex) => (
                                    <tr onClick={(e) => this.handleClick(fileIndex, rowIndex, e)}>
                                        {
                                            row.map((cell, cellIndex) => {
                                                return rowIndex === 0 ? <th className={"info"}>{cell}</th> :
                                                    <td onDoubleClick={(e) => this.handleDoubleClick(fileIndex, rowIndex, cellIndex, e)}>{cell}</td>
                                            })
                                        }
                                    </tr>
                                ))
                            }
                        </table>
                    ))
                }
            </div>
        )
    }
}


/* const promise = new Promise((resolve, reject) => {

    $.get('C2ImportFamRelSample.csv', (data) => {
        console.log('data',data);
        CSV = data.split('\r\n');
        CSV.pop();
        rows = CSV.length;
        resolve(CSV);
    });
    setTimeout(() => {
        reject('failure')
    }, 2000);
}); */