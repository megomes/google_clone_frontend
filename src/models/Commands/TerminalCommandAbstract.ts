export abstract class TerminalCommand {
  args: string[] = [];
  constructor(args: string[]) {
    this.args = args;
  }

  abstract execute(): string;
  abstract help(): string;
}

// export interface TerminalCommand {
//   constructor(): TerminalCommand {
//     //
//   }
//   execute(args: string[]): string;
//   help(): string;
// }
