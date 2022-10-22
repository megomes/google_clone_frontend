import CommandsFactory from 'src/models/Commands/CommandsFactory';
import { TerminalCommand } from 'src/models/Commands/TerminalCommandAbstract';
import TerminalUIController from './TerminalUIController';

export default class TerminalCommandController {
  actualCommand: TerminalCommand | null = null;

  processCommand(
    terminal: TerminalUIController,
    line: string,
    finishExecution: () => void
  ) {
    let args = line.split('¬');
    args = args.filter((val) => {
      if (val == '') {
        return false;
      }
      return true;
    });

    const command = CommandsFactory.getCommand(terminal, args, () => {
      this.actualCommand = null;
      finishExecution();
    });
    this.actualCommand = command;
    command.execute();
  }

  break() {
    this.actualCommand?.break();
  }
}
