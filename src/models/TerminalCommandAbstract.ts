import TerminalUIController from 'src/controllers/TerminalUIController';
import { ArgsOption, CommandConfig, CommandTypes } from './CommandConfig';

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
          '       <span class="code">' +
          this.formatUsageString(option.minified) +
          '</span>';
        sizeCount += option.minified.length;
        if (option.normal != '') {
          optionText +=
            ', <span class="code">' +
            this.formatUsageString(option.normal) +
            '</span>';
          sizeCount += option.normal.length + 3;
        }
        optionText += '&nbsp;'.repeat(15 - sizeCount);
        optionText += option.description;
        optionText += '&nbsp;'.repeat(17 - option.description.length);
        if (option.default != '') {
          optionText += '(default: ' + option.default + ')';
        }
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
    for (let i = 1; i < this.args.length; i++) {
      if (this.args[i] == '--help' || this.args[i] == '-h') {
        return true;
      }
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

  showInvalidArguments(): void {
    this.terminal.printError('Error: Invalid Arguments');
    this.help();
  }

  processOptions(): ArgsOption[] {
    if (this.checkHelp()) {
      this.help();
      throw Error;
    }

    const argsOptions: ArgsOption[] = [];
    const argsRequired: string[] = [];
    try {
      for (let i = 1; i < this.args.length; i++) {
        let valid = false;
        for (let j = 0; j < this.config.options.length; j++) {
          const option = this.config.options[j];
          if (
            this.args[i] == option.minified ||
            this.args[i] == option.normal
          ) {
            if (option.type == CommandTypes.string) {
              if (this.args[i + 1][0] == '-') {
                this.showInvalidArguments();
                throw Error;
              }
              argsOptions.push({
                minified: option.minified,
                value: this.args[i + 1],
              });
              i++;
            } else if (option.type == CommandTypes.number) {
              if (isNaN(Number(this.args[i + 1]))) {
                this.showInvalidArguments();
                throw Error;
              }
              argsOptions.push({
                minified: option.minified,
                value: Number(this.args[i + 1]),
              });
              i++;
            } else if (option.type == CommandTypes.boolean) {
              argsOptions.push({
                minified: option.minified,
                value: true,
              });
            } else {
              console.error('Type not implemented: ' + option.type);
              throw Error;
            }
            valid = true;
            argsRequired.push(option.minified);

            break;
          }
        }

        if (valid) {
          continue;
        }

        if (this.args[i][0] == '-') {
          this.showInvalidArguments();
          throw Error;
        }

        if (argsRequired.indexOf('') != -1) {
          this.showTooManyArguments();
          throw Error;
        }

        argsOptions.push({
          minified: '',
          value: this.args[i],
        });
        argsRequired.push('');
      }
    } catch {
      throw Error;
    }

    // Check Required
    for (let i = 0; i < this.config.options.length; i++) {
      if (!this.config.options[i].required) continue;
      const minified =
        this.config.options[i].minified[0] == '-'
          ? this.config.options[i].minified
          : '';
      if (argsRequired.indexOf(minified) == -1) {
        this.showMissingArguments();
        throw Error;
      }
    }

    return argsOptions;
  }

  // for (let i = 1; i < this.args.length; i++) {
  //   output = this.args[i];
  // }
}
