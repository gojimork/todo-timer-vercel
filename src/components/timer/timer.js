import { Component } from 'react';

export default class Timer extends Component {
  secondsFromProps = this.props.minutes * 60 + this.props.seconds;

  state = {
    secondsDeclaration: this.secondsFromProps,
    secondsLeft: this.secondsFromProps,
    dateStartTimer: null,
    timer: null,
    timerStarted: false,
  };

  changeTimerValue = () => {
    this.setState(({ dateStartTimer, secondsDeclaration }) => {
      const secondsSinceStart = Math.floor((Date.now() - dateStartTimer) / 1000);
      const newSecondsLeft = secondsDeclaration - secondsSinceStart;
      if (newSecondsLeft === 0) this.timerFinish();
      return { secondsLeft: newSecondsLeft };
    });
  };

  timerStart = () => {
    if (this.state.secondsLeft === 0) return;
    const startTime = Date.now();
    this.setState({ dateStartTimer: startTime, timerStarted: true });
    const timer = setInterval(() => this.changeTimerValue(), 1000);
    this.setState({ timer });
  };

  timerPause = () => {
    const { timer, secondsLeft } = this.state;
    this.setState({ timerStarted: false, secondsDeclaration: secondsLeft });
    clearInterval(timer);
  };

  timerFinish = () => {
    this.setState({ timerStarted: false, secondsDeclaration: 0 });
    clearInterval(this.state.timer);
  };

  render() {
    const { timerStarted, secondsLeft } = this.state;
    const play = <button type="button" className="icon-play" onClick={this.timerStart} />;
    const pause = <button type="button" className="icon-pause" onClick={this.timerPause} />;
    const button = timerStarted ? pause : play;
    const minutes = Math.floor(secondsLeft / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (secondsLeft % 60).toString().padStart(2, '0');
    return (
      <div>
        {button}
        <span>
          {minutes}:{seconds}
        </span>
      </div>
    );
  }
}
