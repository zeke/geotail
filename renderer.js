const movement = require('geolocation-stream')()
const objectify = require('geoposition-to-object')
const $ = require('jquery')
const Config = require('electron-config')
const config = window.config = new Config()
const history = window.history = config.get('history') || []

movement.on('data', function(position) {
  position = objectify(position)
  if (history.length === 0 || position.timestamp !== history[history.length-1].timestamp) {
    history.push(position)
  }
  config.set('history', history)
  console.log(JSON.stringify(history, null, 2))
})

movement.on('error', function(err) {
  console.error(err)
})
