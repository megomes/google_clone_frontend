import TerminalUIController from 'src/controllers/TerminalUIController';

export abstract class TerminalCommand {
  args: string[] = [];
  terminal: TerminalUIController;
  finishExecution: () => void;

  constructor(
    terminal: TerminalUIController,
    args: string[],
    finishExecution: () => void
  ) {
    this.args = args;
    this.terminal = terminal;
    this.finishExecution = finishExecution;
  }

  abstract execute(): void;

  abstract help(): void;

  break() {
    this.finishExecution();
  }

  checkHelp(): boolean {
    if (this.args[1] == '--help' || this.args[1] == '-h') {
      return true;
    }
    return false;
  }

  showMissingArguments(): void {
    this.terminal.printError('Error: Missing Arguments');
    this.help();
  }

  showTooManyArguments(): void {
    this.terminal.printError('Error: Unkown Arguments');
    this.help();
  }
}
