import { TerminalCommand } from '../TerminalCommandAbstract';

export class UnkownCommand extends TerminalCommand {
  config = {
    title: 'UNKNOWN',
    description: '-',
    usage: ['-'],
    options: [],
  };

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
      'Contribute developing this command on Github: (<a href="https://github.com/megomes/google_clone_frontend">Github Link</a>)'
    );
    this.terminal.print('</span>');
    this.finishExecution();
  }
}
