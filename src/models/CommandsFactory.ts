import { ClearCommand } from './Commands/ClearCommand';
import { EchoCommand } from './Commands/EchoCommand';
import { HelpCommand } from './Commands/HelpCommand';
import { SlowEchoCommand } from './Commands/SlowEchoCommand';
import { TerminalCommand } from './TerminalCommandAbstract';
import { UnkownCommand } from './Commands/UnknownCommand';
import TerminalUIController from '../controllers/TerminalUIController';
import { GoogleCommand } from './Commands/GoogleCommand';

export default class CommandsFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static commands: { [k: string]: any } = {
    gwk: GoogleCommand,
    secho: SlowEchoCommand,
    help: HelpCommand,
    echo: EchoCommand,
    clear: ClearCommand,
  };

  static getCommand(
    terminal: TerminalUIController,
    args: string[],
    finishExecution: () => void
  ): TerminalCommand {
    if (args.length == 0) {
      return new UnkownCommand(terminal, args, finishExecution);
    }

    try {
      return new CommandsFactory.commands[args[0]](
        terminal,
        args,
        finishExecution
      );
    } catch {
      return new UnkownCommand(terminal, args, finishExecution);
    }
  }
}
