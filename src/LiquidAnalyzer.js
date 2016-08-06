import React, { Component } from 'react';

let LiquidAnalyzer = React.createClass({
  getInitialState() {
    return ({
      input: "",
      output: [],
      searchTerm: ""
    });
  },

  processInput(event) {
    let output = [];

    var liquid = event.target.value.split('\n');
    var variableStart = /\{\{/g;
    var variableEnd = /\}\}/g;

    for (var l in liquid) {
      let matches;

      while((matches = variableStart.exec(liquid[l])) !== null) {
        let endingIndex;
        let variable = {};

        variableEnd.lastIndex = variableStart.lastIndex;

        endingIndex = variableEnd.exec(liquid[l]).index;

        variable.text = liquid[l].substring(variableStart.lastIndex, endingIndex).trim();
        variable.lineNumber = parseInt(l,10);
        variable.columnNumber = variableStart.lastIndex + 1;

        let filterIndex = variable.text.indexOf("|");

        if (filterIndex > -1) {
          variable.filter = variable.text.substring(filterIndex + 1).trim();
        }

        output.push(variable);
      }
    }

    console.log(output);

    this.setState({output: output});
  },

  updateSearchTerm(event) {
    var searchTerm = event.target.value;

    this.setState({searchTerm: searchTerm});
    processInput();
  },

  _createOutput() {
    return this.state.output.map((item, index) => {
      if (this.state.searchTerm && this.state.searchTerm !== "") {
        if (item.filter === this.state.searchTerm) {
          return (
            <p key={ index }>
              { item.lineNumber }, { item.columnNumber}: { item.text }, filter: { item.filter }
            </p>
          );
        }
      } else {
        return (
          <p key={ index }>
            { item.lineNumber }, { item.columnNumber}: { item.text }, filter: { item.filter }
          </p>
        );
      }
    });
  },

  render() {
    return (
      <div className="LiquidAnalyzer">
        <div>
          <textarea onChange={this.processInput}></textarea>
        </div>
        <input onChange={this.updateSearchTerm} />
        <div>
          { this._createOutput() }
        </div>
      </div>
    );
  }
});

export default LiquidAnalyzer;
