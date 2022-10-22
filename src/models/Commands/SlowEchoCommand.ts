import { TerminalCommand } from './TerminalCommandAbstract';

export class SlowEchoCommand extends TerminalCommand {
  shouldBreak = false;

  help() {
    this.terminal.println('Usage: secho [OPTIONS] &lt;output&gt;');
    this.terminal.println('');
    this.terminal.println('Options:');
    this.terminal.println(
      '   -t, --time           time[ms]      (default: 1000ms)'
    );
    this.terminal.println('   -c, --count          count         (default: 5)');
    this.terminal.println(
      '   -nl, --noloading     no loading    (default: true)'
    );
    this.finishExecution();
  }

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

  // loading(v: number) {
  //   const statusBars = ['-', '\\', '|', '/'];
  //   this.terminal.println('[' + statusBars[v % 4] + ']');
  //   setTimeout(() => {
  //     loading(v + 1)
  //   }, 300);
  // }
}
