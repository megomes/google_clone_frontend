import { CommandTypes } from '../CommandConfig';
import CommandsFactory from '../CommandsFactory';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class HelpCommand extends TerminalCommand {
  config = {
    title: 'HELP',
    description: 'Print all available commands',
    usage: ['help', '<command> -h', '<command> --help'],
    options: [
      {
        minified: '<command>',
        normal: '',
        description: 'command to help',
        default: '',
        type: CommandTypes.string,
        required: true,
      },
    ],
  };

  execute() {
    for (const key in CommandsFactory.commands) {
      new CommandsFactory.commands[key](this.terminal, [], () => {
        //
      }).help();
      this.terminal.println('');
    }

    this.finishExecution();
  }

  break() {
    this.finishExecution();
  }
}
