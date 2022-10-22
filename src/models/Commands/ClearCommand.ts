import { useCommandsStore } from 'src/stores/commands-store';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class ClearCommand extends TerminalCommand {
  help() {
    this.terminal.println('<span class="title">CLEAR</span>');
    this.terminal.println('    <em>Clear page</em>');
    this.terminal.println('    Usage: <span class="code">$ clear</span>');
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
