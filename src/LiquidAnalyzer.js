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
        var searchTerm = this.refs.searchTerm.value;

        this.setState({searchTerm: searchTerm});
    },

    _createOutput() {
        return this.state.output.map((item, index) => {
            if (this.state.searchTerm && this.state.searchTerm !== "") {
                if (item.filter === this.state.searchTerm) {
                    return (
                        <p key={ index }>
                            { item.lineNumber }, { item.columnNumber}: { item.text } <span className="filter"> filter: { item.filter } </span>
                        </p>
                    );
                }
            } else {
                return (
                  <p key={ index }>
                    { item.lineNumber }, { item.columnNumber}: { item.text } <span className="filter"> filter: { item.filter } </span>
                  </p>
                );
            }
        });
    },

    render() {
        return (
            <section className="translate-tool">
                <div className="translate-tool__component">
                    <p>Copy and paste your code:</p><br/>
                    <textarea className="tool-input" rows="29" type="text" onChange={this.processInput}></textarea>
                </div>

                <div className="translate-tool__component">
                    <div className="tool-output">
                        <div className="output-header">
                            <input type="text" placeholder="🔍 Search for a filter term" ref="searchTerm"></input><button  onClick={this.updateSearchTerm}>Search</button>
                            <p class="output-description">
                                Your code&#39;s Liquid components:
                            </p>
                        </div>
                        <div className="output-box">
                            { this._createOutput() }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

export default LiquidAnalyzer;
