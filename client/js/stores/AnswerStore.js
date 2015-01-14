var Backbone = require('backbone');
var AppDispatcher = require('../AppDispatcher');
var data = require('./questions');
var _ = require('lodash');

var RouteStore = Backbone.Model.extend({
  initialize: function () {
    this.answers = [];
    for (var i = 0, n = data.questions.length; i < n; i++) {
      this.answers.push(null);
    }
    this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
  },

  dispatchCallback: function (payload) {
    switch (payload.actionType) {
      case 'answer-submit':
        if (payload.questionNo < this.answers.length) {
          this.answers[payload.questionNo] = payload.answer;
          this.trigger('change');
        }
        break;
      case 'answer-clear':
        for (var i = 0, n = data.questions.length; i < n; i++) {
          this.answers[i] = null;
        }
        this.trigger('change');
        break;
    }
  },

  getNextQuestion: function (start) {
    var n = this.answers.length;
    if (start === undefined) {
      start = n-1;
    }

    var idx = start;
    do {
      idx++;
      if (idx >= n) {
        idx = 0;
      }
    } while (idx !== start && this.answers[idx] !== null);

    if (idx === start) {
      return null;
    }
    return idx;
  },

  getResultsData: function () {
    var self = this;
    var v = [];
    try {
      _.each(data.results, function (res, i) {
        v[i] = 0;
        _.each(res.questions, function (q) {
          var ans = self.answers[q];
          if (ans === null) {
            throw new Error('Not a complete answer set');
          }
          v[i] += ans;
        });
      });
    } catch (e) {
      return null;
    }
    return v;
  },

  getNextLink: function (start) {
    var r = this.getNextQuestion(start);
    if (r !== null) {
      return '#question/' + r;
    }
    r = new Buffer(JSON.stringify(this.getResultsData()), 'utf8')
      .toString('base64');
    return '#results';
  },
});

module.exports = new RouteStore();
