var React = require('react');
var data = require('../stores/questions');
var AnswerStore = require('../stores/AnswerStore');
var AppDispatcher = require('../AppDispatcher');
var RouteCreator = require('../actions/RouteCreator');
var ResultsChart = require('./ResultsChart');
var _ = require('lodash');

var ResultsPage = React.createClass({
  componentDidMount: function () {
    var rdata = this.getData();
    if (!rdata) {
      process.nextTick(function () {
        RouteCreator.navigate('', { 
          trigger: true,
          replace: true
        });
      });
      return;
    }
    rdata = JSON.stringify(rdata);
    rdata = new Buffer(rdata, 'utf8').toString('base64');
    RouteCreator.navigate('results/' + rdata, { 
      trigger: false,
      replace: true
    });
  },

  getData: function () {
    var propData = this.props.resultsData;
    if (!propData) {
      return AnswerStore.getResultsData();
    }
    try {
      var str = new Buffer(propData, 'base64').toString('utf8');
      return JSON.parse(str);
    } catch (ex) {
      return AnswerStore.getResultsData();
    }
  },

  handleClick: function () {
    AppDispatcher.dispatch({
      actionType: 'answer-clear'
    });
  },

  render: function () {
    var results = this.getData();
    var labels = _.map(data.results, function (o) { return o.name; });

    if (!results) {
      return <div className='layout-container'>
        <p><strong>Rezultate</strong></p>
        <p>Te rog rezolvă testul înainte.</p>
        <a href='#' onClick={this.handleClick}>
          <button className='btn btn-default'>Rezolvă testul</button>
        </a>
      </div>;
    }

    return <div className='layout-container'>
      <p><strong>Rezultate</strong></p>
      <ResultsChart results={results} labels={labels}/>
      <a href='#' onClick={this.handleClick}>
        <button className='btn btn-default'>Rezolvă din nou</button>
      </a>
    </div>;
  }
});

module.exports = ResultsPage;
