export abstract class TerminalCommand {
  args: string[] = [];
  constructor(args: string[]) {
    this.args = args;
  }

  abstract execute(): string;
  abstract help(): string;
  checkHelp(): boolean {
    if (this.args[1] == '--help' || this.args[1] == '-h') {
      return true;
    }
    return false;
  }
  showMissingArguments(): string {
    return (
      '<span class="error">Error: Missing Arguments</span><br>' + this.help()
    );
  }
}

// export interface TerminalCommand {
//   constructor(): TerminalCommand {
//     //
//   }
//   execute(args: string[]): string;
//   help(): string;
// }
