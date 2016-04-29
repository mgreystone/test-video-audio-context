import noop from 'lodash/noop'
import React from 'react'

const { PropTypes } = React

const VolumeControls = React.createClass({

  displayName: 'VolumeControls',

  propTypes: {
    onChange: PropTypes.func,
    volume: PropTypes.number.isRequired
  },

  getDefaultProps () {
    return {
      onChange: noop
    }
  },

  onChange (event) {
    this.props.onChange(parseFloat(event.target.value))
  },

  render () {
    const { volume } = this.props

    return (
      <input
        max='1'
        min='0'
        onChange={this.onChange}
        step='0.01'
        type='range'
        value={volume}
      />
    )
  }

})

export default VolumeControls
