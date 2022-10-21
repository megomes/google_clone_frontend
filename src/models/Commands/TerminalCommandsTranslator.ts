import { EchoCommand } from './EchoCommand';
import { TerminalCommand } from './TerminalCommandAbstract';
import { UnkownCommand } from './UnknownCommand';

export default class TerminalCommandsTranslator {
  static getCommand(args: string[]): TerminalCommand {
    if (args.length == 0) {
      return new UnkownCommand(args);
    }
    switch (args[0]) {
      case 'echo':
        return new EchoCommand(args);
      default:
        return new UnkownCommand(args);
    }
  }
}
