var React = require('react');

var NotFoundPage = React.createClass({
  render: function () {
    return <div className='layout-container'>
      <strong>Not found</strong>
      <p>The page you are looking for doesn't exist. Try <a href='#'>here</a></p>
    </div>;
  }
});

module.exports = NotFoundPage;
