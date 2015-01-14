var React = require('react');
var AnswerStore = require('../stores/AnswerStore');

var ProgressBar = React.createClass({
  componentDidMount: function () {
    AnswerStore.on('change', function () {
      this.forceUpdate();
    }, this);
  },

  componentWillUnmount: function () {
    AnswerStore.off(null, null, this);
  },

  render: function () {
    var progress = AnswerStore.getProgress();
    return <div className='answer-progress-bar' style={{width: progress * 100 + '%'}}/>;
  }
});

module.exports = ProgressBar;
