import { TerminalCommand } from '../TerminalCommandAbstract';

export class SlowEchoCommand extends TerminalCommand {
  config = {
    title: 'SLOW ECHO',
    description: 'Echo a message multiple times async',
    usage: ['secho [OPTIONS] <output>'],
    options: [
      {
        minified: '-t',
        normal: '--time',
        description: 'time[ms]',
        default: '1000ms',
      },
      {
        minified: '-c',
        normal: '--count',
        description: 'count',
        default: '5',
      },
      {
        minified: '-nl',
        normal: '--noloading',
        description: 'no loading',
        default: 'true',
      },
    ],
  };

  shouldBreak = false;

  execute() {
    if (this.checkHelp()) {
      this.help();
    }
    if (this.args.length == 1) {
      this.showMissingArguments();
      return;
    }

    let time = 1000;
    let count = 5;
    let output = '';
    let loading = true;

    try {
      for (let i = 1; i < this.args.length; i++) {
        if (this.args[i] == '-t' || this.args[i] == '--time') {
          time = Number(this.args[i + 1]);
          i++;
          continue;
        }
        if (this.args[i] == '-c' || this.args[i] == '--count') {
          count = Number(this.args[i + 1]);
          i++;
          continue;
        }
        if (this.args[i] == '-nl' || this.args[i] == '--noloading') {
          loading = false;
          continue;
        }
        output = this.args[i];
      }
    } catch {
      this.showMissingArguments();
      return;
    }

    if (output == '') {
      this.showMissingArguments();
      return;
    }

    this.a(output, count, time);
    if (loading == true) {
      this.terminal.startLoading(count);
      this.terminal.setLoading(count, true);
    }
  }

  break() {
    this.shouldBreak = true;
    this.finishExecution();
  }

  a(text: string, count: number, time: number) {
    if (this.shouldBreak) {
      return;
    }
    if (count <= 0) {
      this.finishExecution();
      return;
    }
    this.terminal.setLoading(count - 1, true);
    this.terminal.println(count + ': ' + text);
    if (count > 1) {
      setTimeout(() => {
        this.a(text, count - 1, time);
      }, time);
    } else {
      this.finishExecution();
    }
  }
}
