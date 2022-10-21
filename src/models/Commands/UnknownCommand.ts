import { TerminalCommand } from './TerminalCommandAbstract';

export class UnkownCommand extends TerminalCommand {
  help(): string {
    return '';
  }
  execute(): string {
    if (this.args.length == 0) {
      return '';
    }
    return `
    <span class="error">
      ${this.args[0]}: The term '${this.args[0]}' is not recognized as a name of a cmdlet, function, script file, or executable program.
      <br>
      Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
    </span>
    <br>
    `;
  }
}
