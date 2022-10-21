import { TerminalCommand } from './TerminalCommandAbstract';

export class EchoCommand extends TerminalCommand {
  help(): string {
    return `
    echo <output>
    `;
  }
  execute(): string {
    if (this.args.length == 1) {
      return this.help();
    }
    let echoValues = '';
    for (let i = 1; i < this.args.length; i++) {
      echoValues += this.args[i] + '<br>';
    }
    return echoValues;
  }
}
