import { useCommandsStore } from 'src/stores/commands-store';
import { TerminalCommand } from './TerminalCommandAbstract';

export class ClearCommand extends TerminalCommand {
  help() {
    this.terminal.println(`
    clear [&lt;CommonParameters&gt;]
    `);
    this.finishExecution();
  }
  execute() {
    if (this.checkHelp()) {
      return this.help();
    }

    useCommandsStore().restart();
    this.finishExecution();
  }
}
