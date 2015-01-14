var React = require('react');
var _ = require('lodash');
var Chart = require('chartjs');

var ResultsPage = React.createClass({
  componentDidMount: function () {
    var canvas = this.refs.chart.getDOMNode();
    var ctx = canvas.getContext('2d');
    var data = {
      labels: this.props.labels,
      datasets: [{
        label: 'Scor',
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: this.props.results
      }],
    };
    new Chart(ctx).Radar(data);
  },

  render: function () {
    return <div className='chart-container'>
      <canvas className='results-chart' ref='chart' width='600' height='300'/>
    </div>
  }
});

module.exports = ResultsPage;
