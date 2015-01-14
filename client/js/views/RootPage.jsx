var React = require('react');
var AnswerStore = require('../stores/AnswerStore');

var RootPage = React.createClass({
  render: function () {
    return <div className='layout-container'>
      <p><strong>Chestionarul de reglare cognitivă a emoției CERQ</strong></p>
      <p>Toată lumea se găsește într-o zi sau alta confruntată cu evenimente negative sau dezagreabile, iar fiecare reactioneaza in felul sau. Răspunzând afirmațiilor de mai jos, încercați să vă gândiți cum reacționați în general la evenimentele neplacute.</p>
      <a href={AnswerStore.getNextLink()}>
        <button className='btn btn-default'>Rezolvă chestionarul</button>
      </a>
    </div>;
  }
});

module.exports = RootPage;
