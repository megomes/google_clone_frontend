import { ArgsOption, CommandTypes } from '../CommandConfig';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class EchoCommand extends TerminalCommand {
  config = {
    title: 'ECHO',
    description: 'Echo a message',
    usage: ['echo <output>'],
    options: [
      {
        minified: '<output>',
        normal: '',
        description: 'output message',
        default: '',
        type: CommandTypes.string,
        required: true,
      },
    ],
  };

  execute() {
    let args: ArgsOption[] = [];
    try {
      args = this.processOptions();
    } catch (error) {
      return;
    }

    let output = '';
    for (const arg of args) {
      if (arg.minified == '') {
        output = arg.value as string;
      }
    }

    this.terminal.println(output);

    this.finishExecution();
  }

  break() {
    this.finishExecution();
  }
}
