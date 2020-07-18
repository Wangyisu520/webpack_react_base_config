import React, { Component } from 'react';

import jpg from './images/visitor.jpg'

class App extends Component {

  render () {
    return (
      <div className="box">
        <img src={jpg} alt=""/>
        <h1>基于webpack搭建的react</h1>
      </div>
    )
  }

}

export default App;