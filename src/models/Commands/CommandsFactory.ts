import TerminalUIController from 'src/controllers/TerminalUIController';
import { ClearCommand } from './ClearCommand';
import { EchoCommand } from './EchoCommand';
import { SlowEchoCommand } from './SlowEchoCommand';
import { TerminalCommand } from './TerminalCommandAbstract';
import { UnkownCommand } from './UnknownCommand';

export default class CommandsFactory {
  static obj: { [k: string]: any } = {
    echo: EchoCommand,
    clear: ClearCommand,
    secho: SlowEchoCommand,
  };

  static getCommand(
    terminal: TerminalUIController,
    args: string[],
    finishExecution: () => void
  ): TerminalCommand {
    if (args.length == 0) {
      return new UnkownCommand(terminal, args, finishExecution);
    }

    console.log(typeof CommandsFactory.obj[args[0]]);

    try {
      return new CommandsFactory.obj[args[0]](terminal, args, finishExecution);
    } catch {
      return new UnkownCommand(terminal, args, finishExecution);
    }
  }
}
