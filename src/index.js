import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import {ButtonToolbar, MenuItem, DropdownButton} from 'react-bootstrap';

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

class Buttons extends React.Component{
  handleSelect = (evt) =>{
    this.props.gridSize(evt);
  }
  render(){
    return(
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
          Play
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
         Pause
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
          Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
          Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
          Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
          Seed
          </button>
          <DropdownButton
          title="Grid Size"
          id="size-menu"
          onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1">20x10</MenuItem>
            <MenuItem eventKey="2">50x30</MenuItem>
            <MenuItem eventKey="3">70x50</MenuItem>
            </DropdownButton>
        </ButtonToolbar>
        </div>


    )
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
  clearInterval(this.intervalId);
  this.intervalId = setInterval(this.play, this.speed);
}

pauseButton = () =>{
  clearInterval(this.intervalId);
}

play = () =>{
  let g = this.state.gridFull;
  let g2 = arrayClone(this.state.gridFull);

  for (let i = 0; i < this.rows; i++) {
    for (let j = 0; j < this.cols; j++) {
      let count = 0;
      if (i > 0) if (g[i - 1][j]) count++;
      if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
      if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
      if (j < this.cols - 1) if (g[i][j + 1]) count++;
      if (j > 0) if (g[i][j - 1]) count++;
      if (i < this.rows - 1) if (g[i + 1][j]) count++;
      if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
      if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
      if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
      if (!g[i][j] && count === 3) g2[i][j] = true;
    }
  }
  this.setState({
    gridFull: g2,
    generation: this.state.generation + 1
  });
}

componentDidMount(){
  this.seed();
  this.playButton();
}

  render() {
    return (
      <div>
        <h1> The Game of LIfe</h1>
        <Buttons
        playButton = {this.playButton}
        pauseButton = {this.pauseButton}
        slow={this.slow}
        fast={this.fast}
        clear={this.clear}
        seed={this.seed}
        gridSize={this.gridSize}
        />
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

