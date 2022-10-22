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
    this.terminal.println(
      '<span class="error">Error: Missing Arguments</span><br>'
    );
    this.help();
  }
}

// export interface TerminalCommand {
//   constructor(): TerminalCommand {
//     //
//   }
//   execute(args: string[]): string;
//   help(): string;
// }
