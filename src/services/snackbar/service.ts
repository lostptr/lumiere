type Listener = (title: string) => void;

class SnackbarService {
  listener?: Listener;

  constructor() {
    this.show = this.show.bind(this);
    this.setListener = this.setListener.bind(this);
  }

  setListener(listener?: Listener): void {
    this.listener = listener;
  }

  show(title: string): void {
    this.listener?.(title);
  }
}

export default new SnackbarService();