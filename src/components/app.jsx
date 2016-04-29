import React from 'react'
import Video from './video'
import VolumeControls from './volumeControls'

const loaded = new Promise(resolve => window.addEventListener('load', resolve))

const App = React.createClass({

  displayName: 'App',

  getInitialState () {
    return {
      isLoaded: false,
      isStarted: false,
      volume: 0.8
    }
  },

  componentWillMount () {
    loaded.then(this.setState.bind(this, { isLoaded: true }))
  },

  onStart () {
    this.setState({ isStarted: true })
  },

  onVolumeChange (volume) {
    this.setState({ volume })
  },

  render () {
    const { isLoaded, isStarted, volume } = this.state

    if (isStarted) {
      return (
        <div>
          <div>
            <VolumeControls onChange={this.onVolumeChange} volume={volume} />
          </div>
          <div>
            <Video src='assets/video.mp4' volume={volume} />
          </div>
        </div>
      )
    }

    if (isLoaded) {
      return (
        <button onClick={this.onStart}>Start</button>
      )
    }

    return null
  }

})

export default App
