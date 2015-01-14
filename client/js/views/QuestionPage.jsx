var React = require('react');
var AnswerStore = require('../stores/AnswerStore');
var AppDispatcher = require('../AppDispatcher');
var data = require('../stores/questions');
var _ = require('lodash');
var assert = require('assert');

var QuestionPage = React.createClass({
  getQuestionNo: function () {
    var questionNo = parseInt(this.props.questionNo || 0);
    if (isNaN(questionNo) || (questionNo >= data.questions.length)) {
      questionNo = 0;
    }
    return questionNo;
  },

  clickHandler: function (evt) {
    var score = parseInt(evt.currentTarget.dataset.score);
    assert(!isNaN(score));
    AppDispatcher.dispatch({
      actionType: 'answer-submit',
      questionNo: this.getQuestionNo(),
      answer: score,
    });
  },

  render: function () {
    var questionNo = this.getQuestionNo();

    var self = this;
    var buttons = [];
    _.each(data.options, function(op, idx) {
      buttons.push(<a
        key={idx+1}
        href={AnswerStore.getNextLink(questionNo)}
        data-score={idx+1}
        className={'button-wrapper button-wrapper-' + (idx+1)}
        onClick={self.clickHandler}>
          <div className='button-nub'>
            <div className='button-nub-content'/>
          </div>
          <div className='button-label'>{op}</div>
      </a>);
    });

    return <div className='layout-container'>
      <p className='question-subtitle'>În cazul unui eveniment neplăcut...</p>
      <p>{data.questions[questionNo]}</p>
      <div className='buttons-container'>
        {buttons}
      </div>
    </div>;
  }
});

module.exports = QuestionPage;
