import {Component} from 'react'

import './index.css'

class Stopwatch extends Component {
  state = {
    time: '00:00',
    isStarted: false,
    timerId: null,
  }

  onStart = () => {
    this.setState(
      prevState => ({
        isStarted: !prevState.isStarted,
      }),
      () => {
        const {isStarted} = this.state
        if (isStarted) {
          const timerId = setInterval(this.onUpdate, 1000)
          this.setState({timerId})
        } else {
          const {timerId} = this.state
          clearInterval(timerId)
        }
      },
    )
  }

  onUpdate = () => {
    const {time} = this.state
    const [min, sec] = time.split(':').map(Number)

    const newMin = sec >= 60 ? min + 1 : min
    const newSec = sec >= 60 ? 0 : sec + 1
    const newTimer = `${newMin
      .toString()
      .padStart(2, '0')}:${newSec.toString().padStart(2, '0')}`
    this.setState({time: newTimer})
  }

  onStop = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({isStarted: false})
  }

  onReset = () => {
    const {timerId} = this.state
    clearInterval(timerId)
    this.setState({time: '00:00', isStarted: false})
  }

  render() {
    const {time} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="card-cont">
          <div className="mini">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png "
              className="image"
              alt="stopwatch"
            />
            <p className="para">Timer</p>
          </div>
          <h1 className="time">{time}</h1>
          <div className="mini11">
            <button
              className="buttonGreen"
              type="button"
              onClick={this.onStart}
            >
              Start
            </button>
            <button className="buttonRed" type="button" onClick={this.onStop}>
              Stop
            </button>
            <button
              className="buttonYellow"
              type="button"
              onClick={this.onReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Stopwatch
