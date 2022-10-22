import { useCommandsStore } from 'src/stores/commands-store';
import { TerminalCommand } from './TerminalCommandAbstract';

export class ClearCommand extends TerminalCommand {
  help(): string {
    return `
    clear [&lt;CommonParameters&gt;]<br>
    `;
  }
  execute(): string {
    if (this.checkHelp()) {
      return this.help();
    }

    useCommandsStore().restart();

    return '';
  }
}
