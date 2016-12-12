import React, { Component } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Page from './components/Page';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="App-main">
          <Menu />
          <Page {...this.props} />
        </div>
      </div>
    );
  }
}

export default App;
