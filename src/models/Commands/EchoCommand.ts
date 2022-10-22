import { TerminalCommand } from './TerminalCommandAbstract';

export class EchoCommand extends TerminalCommand {
  help() {
    this.terminal.println(`
    echo &lt;output&gt
    `);
    this.finishExecution();
  }
  execute() {
    if (this.args.length == 1) {
      return this.showMissingArguments();
    }
    if (this.checkHelp()) {
      return this.help();
    }

    for (let i = 1; i < this.args.length; i++) {
      this.terminal.println(this.args[i]);
    }

    this.finishExecution();
  }

  break() {
    this.finishExecution();
  }
}
