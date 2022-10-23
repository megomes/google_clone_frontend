import { ArgsOption, CommandTypes } from '../CommandConfig';
import { TerminalCommand } from '../TerminalCommandAbstract';

export class SlowEchoCommand extends TerminalCommand {
  config = {
    title: 'SLOW ECHO',
    description: 'Echo a message multiple times async',
    usage: ['secho [OPTIONS] <output>'],
    options: [
      {
        minified: '<output>',
        normal: '',
        description: 'output to print',
        default: '',
        type: CommandTypes.string,
        required: true,
      },
      {
        minified: '-t',
        normal: '--time',
        description: 'time[ms]',
        default: '1000ms',
        type: CommandTypes.number,
        required: false,
      },
      {
        minified: '-c',
        normal: '--count',
        description: 'count',
        default: '5',
        type: CommandTypes.number,
        required: false,
      },
      {
        minified: '-nl',
        normal: '',
        description: 'no loading',
        default: 'true',
        type: CommandTypes.boolean,
        required: false,
      },
    ],
  };

  shouldBreak = false;

  execute() {
    let time = 1000;
    let count = 5;
    let output = '';
    let loading = true;

    let args: ArgsOption[] = [];
    try {
      args = this.processOptions();
    } catch (error) {
      return;
    }

    for (const arg of args) {
      if (arg.minified == '-t') {
        time = arg.value as number;
      } else if (arg.minified == '-c') {
        count = arg.value as number;
      } else if (arg.minified == '-nl') {
        loading = false;
      } else if (arg.minified == '') {
        output = arg.value as string;
      }
    }

    this.a(output, count, time);
    if (loading == true) {
      this.terminal.startLoading(count);
      this.terminal.setLoading(count, true);
    }
  }

  break() {
    this.shouldBreak = true;
    this.finishExecution();
  }

  a(text: string, count: number, time: number) {
    if (this.shouldBreak) {
      return;
    }
    if (count <= 0) {
      this.finishExecution();
      return;
    }
    this.terminal.setLoading(count - 1, true);
    this.terminal.println(count + ': ' + text);
    if (count > 1) {
      setTimeout(() => {
        this.a(text, count - 1, time);
      }, time);
    } else {
      this.finishExecution();
    }
  }
}
