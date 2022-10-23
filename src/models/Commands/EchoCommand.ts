import { TerminalCommand } from '../TerminalCommandAbstract';

export class EchoCommand extends TerminalCommand {
  config = {
    title: 'ECHO',
    description: 'Echo a message',
    usage: ['echo <output>'],
    options: [],
  };

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
