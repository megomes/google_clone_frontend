import { useCommandsStore } from 'src/stores/commands-store';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class ClearCommand extends TerminalCommand {
  config = {
    title: 'CLEAR',
    description: 'Clear page',
    usage: ['clear'],
    options: [],
  };

  execute() {
    if (this.checkHelp()) {
      return this.help();
    }

    useCommandsStore().restart();
    this.finishExecution();
  }
}
