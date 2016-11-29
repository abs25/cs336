//WindowComponent
var WindowComponent = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
});
//render ALL the things
ReactDOM.render(
  <WindowComponent />,
  document.getElementById('content')
);
