import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Main extends React.Component {
  constructor(){
    super();
    this.state = {
      generation: 0;
    }
  }
  render(){
    return(
      <div>
      <h1> The Game of LIfe</h1>
      <Grid
      />
      <h2> Generation: {this.state.generation}</h2>
      </div>
    );
  }
}


ReactDOM.render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

