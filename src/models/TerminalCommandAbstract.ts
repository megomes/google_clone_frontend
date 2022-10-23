import TerminalUIController from 'src/controllers/TerminalUIController';
import { CommandConfig, CommandOptions } from './CommandConfig';

export abstract class TerminalCommand {
  args: string[] = [];
  terminal: TerminalUIController;
  finishExecution: () => void;

  abstract config: CommandConfig;

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

  help(): void {
    this.terminal.println(
      '<span class="title">' + this.config.title + '</span>'
    );
    this.terminal.println('    <em>' + this.config.description + '</em>');
    this.terminal.print('    Usage: ');
    for (let i = 0; i < this.config.usage.length; i++) {
      if (i != 0) {
        this.terminal.print('           ');
      }
      this.terminal.println(
        '<span class="code">' +
          this.formatUsageString(this.config.usage[i]) +
          '</span>'
      );
    }
    if (this.config.options.length != 0) {
      this.terminal.println('');
      this.terminal.println('    Options:');
      for (const option of this.config.options) {
        let sizeCount = 0;
        let optionText = '';
        optionText +=
          '       <span class="code">' + option.minified + '</span>';
        sizeCount += option.minified.length;
        if (option.normal != '') {
          optionText += ', <span class="code">' + option.normal + '</span>';
          sizeCount += option.normal.length + 3;
        }
        optionText += '&nbsp;'.repeat(20 - sizeCount);
        optionText += option.description;
        optionText += '&nbsp;'.repeat(13 - option.description.length);
        optionText += '(default: ' + option.default + ')';
        this.terminal.println(optionText);
      }
    }

    this.finishExecution();
  }

  formatUsageString(usage: string): string {
    return usage.replaceAll('<', '&lt;').replaceAll('<', '&gt;');
  }

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
