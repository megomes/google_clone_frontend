import CommandsFactory from '../CommandsFactory';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class HelpCommand extends TerminalCommand {
  help() {
    this.terminal.println('<span class="title">HELP</span>');
    this.terminal.println('    <em>Print all available commands</em>');
    this.terminal.println('    Usage: <span class="code">help</span>');
    this.terminal.println(
      '    Usage: <span class="code">&lt;command&gt -h</span>'
    );
    this.terminal.println(
      '    Usage: <span class="code">&lt;command&gt --help</span>'
    );
  }
  execute() {
    for (const key in CommandsFactory.commands) {
      new CommandsFactory.commands[key](this.terminal, [], () => {
        //
      }).help();
      this.terminal.println('');
      console.log(key);
    }

    this.finishExecution();
  }

  break() {
    this.finishExecution();
  }
}
