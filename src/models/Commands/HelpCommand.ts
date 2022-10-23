import CommandsFactory from '../CommandsFactory';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class HelpCommand extends TerminalCommand {
  config = {
    title: 'HELP',
    description: 'Print all available commands',
    usage: ['help', '<command> -h', '<command> --help'],
    options: [],
  };

  execute() {
    for (const key in CommandsFactory.commands) {
      new CommandsFactory.commands[key](this.terminal, [], () => {
        //
      }).help();
      this.terminal.println('');
      console.log(key);
    }

    this.finishExecution();
  }

  break() {
    this.finishExecution();
  }
}
