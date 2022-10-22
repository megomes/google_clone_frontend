import TerminalCommandsTranslator from 'src/models/Commands/TerminalCommandsTranslator';

export default class TerminalCommandController {
  constructor() {
    //
  }

  processCommand(line: string): string {
    let args = line.split('¬');
    args = args.filter((val) => {
      if (val == '') {
        return false;
      }
      return true;
    });

    const command = TerminalCommandsTranslator.getCommand(args);
    return command.execute();
  }
}
