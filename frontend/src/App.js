import React, { Component } from 'react';
import FileUploads from './FileUpload';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2> File Upload </h2>
        <FileUploads />
      </div>
    );
  }
}

export default App;