var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var RouteStore = require('../stores/RouteStore');

var RootPage = require('./RootPage');
var NotFoundPage = require('./NotFoundPage');
var QuestionPage = require('./QuestionPage');
var ResultsPage = require('./ResultsPage');


var MainView = React.createClass({
  componentDidMount: function () {
    var self = this;
    RouteStore.on('change', function () {
      self.forceUpdate();
    });
  },

  componentWillUnmount: function () {
    RouteStore.off(null, null, this);
  },
    
  render: function () {
    var route = RouteStore.getRoute();

    var page = (function () {
      var key = route.path;
      switch (route.name) {
        case 'root':
          return <RootPage key={key}/>;
        case 'question':
          return <QuestionPage key={key} questionNo={route.questionNo}/>;
        case 'results':
          return <ResultsPage key={key} resultsData={route.resultsData}/>;
        default:
          return <NotFoundPage key={key}/>;
      }
    })();

    return <div>
      <ReactCSSTransitionGroup transitionName='pageswitch'>
        {page}
      </ReactCSSTransitionGroup>
    </div>;
  }
});

module.exports = MainView;
