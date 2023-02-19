import { Component } from 'react';

export default class Timer extends Component {
  state = { secondsLeft: this.props.seconds, minutesLeft: this.props.minutes, timer: null, timerStarted: false };

  timerStart = () => {
    this.setState({ timerStarted: true });
    const timer = setInterval(() => {
      this.setState(({ secondsLeft, minutesLeft }) => {
        const newSecondsLeft = secondsLeft - 1;
        if (newSecondsLeft === 0 && minutesLeft === 0) {
          clearInterval(timer);
        } else if (newSecondsLeft === -1 && minutesLeft > 0) {
          const newMinutesLeft = minutesLeft - 1;
          return {
            secondsLeft: 59,
            minutesLeft: newMinutesLeft,
          };
        }
        return { secondsLeft: newSecondsLeft };
      });
    }, 1000);
    this.setState({ timer });
  };

  timerPause = () => {
    this.setState({ timerStarted: false });
    clearInterval(this.state.timer);
  };

  render() {
    const { secondsLeft, minutesLeft, timerStarted } = this.state;
    const play = <button type="button" className="icon-play" onClick={this.timerStart} />;
    const pause = <button type="button" className="icon-pause" onClick={this.timerPause} />;
    const button = timerStarted ? pause : play;
    const buttonVeiw = minutesLeft > 0 || secondsLeft ? button : null;
    const seconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
    const minutes = minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft;
    return (
      <div>
        {buttonVeiw}
        <span>
          {minutes}:{seconds}
        </span>
      </div>
    );
  }
}
