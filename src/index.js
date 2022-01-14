import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Box extends React.Component {
  selecetBox = () => {
    this.props.selecetBox(this.props.row, this.props.col);
  }

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selecetBox}
      />
    );
  }
}

class Grid extends React.Component {
  render() {
    const width = (this.props.cols * 16) + 1;
    var rowsArr = []

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selecetBox={this.props.selecetBox}
          />
        )
      }
    }



    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selecetBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    })

  }

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }

      }

    }
    this.setState({
      gridFull: gridCopy
    })
  }

playButton = () => {
  clearInterval(this.intervalId)
  this.intervalId = setInterval(this.play, this.speed);
}


componentDidMount(){
  this.seed();
}

  render() {
    return (
      <div>
        <h1> The Game of LIfe</h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selecetBox={this.selecetBox}
        />
        <h2> Generation: {this.state.generation}</h2>
      </div>
    );
  }
}


function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

