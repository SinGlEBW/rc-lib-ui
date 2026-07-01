export class ControlTimerFormat {
  private timeCount = 0;
  private timerInterval: null | NodeJS.Timeout = null;
  private formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  getHasTimer() {
    return !!this.timerInterval
  }
  startTimer(cb: (time: string) => void) {
    const _this = this;
    if (!_this.timerInterval) {
      this.timerInterval = setInterval(() => {
          const count = _this.timeCount++;
          cb(_this.formatTime(count))
      }, 1000);
    }
  }

  // Остановка таймера
  stopTimer() {
    const { timerInterval } = this;
    if (timerInterval) {
      clearInterval(timerInterval);
      this.timerInterval = null;
    }
  }
}
