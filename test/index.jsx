var React = require('react');
var ReactDOM = require('react-dom');
var InteractionLock = require('../src/interaction-lock.js');
var addListener = require('spur-events').addListener;
require('./styles.less');

var Test = React.createClass({
  componentDidMount: function () {
    addListener(this.refs.lastLevel, 'pointerdown', function (e) {
      console.log(InteractionLock.requestLockOn(e.currentTarget), e.currentTarget);
    });

    addListener(this.refs.firstLevel, 'pointerdown', function (e) {
      console.log(InteractionLock.requestLockOn(e.currentTarget), e.currentTarget);
    });

    addListener(this.refs.firstLevel, 'pointerup', function (e) {
      InteractionLock.releaseLockOn(e.currentTarget);
    });

  	addListener(this.refs.lastLevel, 'pointerup', function (e) {
  		InteractionLock.releaseLockOn(e.currentTarget);
  	});
  },

  createDeepChild: function (count, content) {
    if (count === 0) {
      return content;
    }
    return (<div>{this.createDeepChild(count - 1, content)}</div>)
  },

  render: function () {
    return (
      <div className='test'>
        <div className='first-level' ref='firstLevel'>
          <div className='second-level a' ref='secondLevelA'>
          {
            this.createDeepChild(10, (<div ref='lastLevel'>test</div>))
          }
          </div>
          <div className='second-level b' ref='secondLevelB'>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ReactDOM.render(<Test />, document.getElementById('test'));
