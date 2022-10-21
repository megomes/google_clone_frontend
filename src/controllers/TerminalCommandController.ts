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

    // console.log(values);
    // if (values.length == 0) {
    //   return '';
    // }
    // return `
    // <span class="error">
    //   ${}: The term '${}' is not recognized as a name of a cmdlet, function, script file, or executable program.
    //   <br>
    //   Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
    // </span>
    // <br>
    // `;
  }
}
