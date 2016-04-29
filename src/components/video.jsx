import invokeMap from 'lodash/invokeMap'
import pick from 'lodash/pick'
import React from 'react'
import { getAudioContext } from '../audio/context'

const { PropTypes } = React

const Video = React.createClass({

  displayName: 'Video',

  propTypes: {
    src: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired
  },

  componentDidMount () {
    const audioCtx = getAudioContext()
    const { video } = this.refs
    const source = audioCtx.createMediaElementSource(video)
    const volume = audioCtx.createGain()
    Object.assign(this, { source, volume })
    source.connect(volume)
    volume.connect(audioCtx.destination)
    this.updateVolume()
    video.play()
  },

  componentDidUpdate (prevProps) {
    const { volume: prevVolume } = prevProps
    const { volume: currVolume } = this.props

    if (prevVolume !== currVolume) {
      this.updateVolume()
    }
  },

  componentWillUnmount () {
    invokeMap(pick(this, [ 'source', 'volume' ]), 'disconnect')
  },

  updateVolume () {
    this.volume.gain.value = this.props.volume
  },

  render () {
    const { src } = this.props

    return (
      <video controls ref='video' src={src} />
    )
  }

})

export default Video
