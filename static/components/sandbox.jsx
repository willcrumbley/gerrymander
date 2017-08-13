const React = require('react')


/**
 * @props [String] fn_string - Function string to initialize with
 */
function JavascriptSandbox(props) {
  window.addEventListener('message', function (e) {
      var mainWindow = e.source;
      var states = e.data.states
      for (let statex of states) {
          var options = {"state": statex}
          eval(e.data.algorithm);
          statex.metric = return_obj.metric.toFixed(2);
          statex.include = return_obj.include;
          statex.seats_flipped = return_obj.seats_flipped.toFixed(1);
      }
      mainWindow.postMessage(states, event.origin);
  });

  let sandboxStyle = {
    fontFamily: 'monospace',
    backgroundColor: '#292929',
    color: '#fff',
    marginLeft: '20px',
    fontSize: '.9em'
  }

  return (
    <html>
        <head>
            <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'none'; connect-src 'none'"></meta>
        </head>
        <body>
          <textarea rows={30} cols={120} style={sandboxStyle}>
            {props.fn_string}
          </textarea>
        </body>
    </html>
  )
}

module.exports = {JavascriptSandbox}
