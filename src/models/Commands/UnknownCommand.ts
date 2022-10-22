import { TerminalCommand } from '../TerminalCommandAbstract';

export class UnkownCommand extends TerminalCommand {
  help() {
    //
  }
  execute() {
    console.log(this.args.length);
    if (this.args.length == 0) {
      this.terminal.print('');
      this.finishExecution();
      return;
    }
    this.terminal.print('<span class="error">');
    this.terminal.println(
      `${this.args[0]}: The term '${this.args[0]}' is not recognized as a name of a cmdlet, function, script file, or executable program.`
    );
    this.terminal.println(
      'Check the spelling of the name, or if a path was included, verify that the path is correct and try again.'
    );
    this.terminal.print('</span>');
    this.finishExecution();
  }
}
