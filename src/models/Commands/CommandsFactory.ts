import TerminalUIController from 'src/controllers/TerminalUIController';
import { ClearCommand } from './ClearCommand';
import { EchoCommand } from './EchoCommand';
import { SlowEchoCommand } from './SlowEchoCommand';
import { TerminalCommand } from './TerminalCommandAbstract';
import { UnkownCommand } from './UnknownCommand';

export default class CommandsFactory {
  static getCommand(
    terminal: TerminalUIController,
    args: string[],
    finishExecution: () => void
  ): TerminalCommand {
    if (args.length == 0) {
      return new UnkownCommand(terminal, args, finishExecution);
    }

    switch (args[0]) {
      case 'echo':
        return new EchoCommand(terminal, args, finishExecution);
      case 'clear':
        return new ClearCommand(terminal, args, finishExecution);
      case 'secho':
        return new SlowEchoCommand(terminal, args, finishExecution);
      default:
        return new UnkownCommand(terminal, args, finishExecution);
    }
  }
}
