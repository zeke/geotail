const movement = require('geolocation-stream')()
const objectify = require('geoposition-to-object')
const $ = require('jquery')
const Config = require('electron-config')
const config = window.config = new Config()
const history = window.history = config.get('history') || []
const yo = window.yo = require('yo-yo')

document.addEventListener('DOMContentLoaded', init)

function init () {
  movement.on('data', function(position) {

    // turn native geoposition object into a serializable object
    position = objectify(position)

    // avoid saving duplicates
    if (history.length === 0 || position.timestamp !== history[history.length-1].timestamp) {
      history.push(position)
    }

    // persist to disk
    config.set('history', history)

    render()
  })

  movement.on('error', function(err) {
    console.error(err)
  })

}


function render () {
  document.getElementById('positions').appendChild(el)

  var el = yo`<li>$foo</li>`

}
