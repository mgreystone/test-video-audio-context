import memoize from 'lodash/memoize'
const AudioContext = window.AudioContext || window.webkitAudioContext
export const getAudioContext = memoize(() => new AudioContext())
