import { useCommandsStore } from 'src/stores/commands-store';
import { ref } from 'vue';
import TerminalCommandController from './TerminalCommandController';

export default class TerminalUIController {
  private lineText =
    '<div class="line_start" contenteditable="false">~ $&nbsp;</div>';
  private cursorBefore = '<span class="bg-green-500 text-black font-semibold">';
  private cursorAfter = '</span>';

  commandStore = useCommandsStore();

  terminalCommandController = new TerminalCommandController();

  loadingTotal = ref(0);
  loadingActual = ref(0);
  private loadingState = ref(0);
  private loadingBars = ['-', '\\', '|', '/'];

  constructor() {
    this.commandStore.actualPosition =
      this.commandStore.linesArray[this.commandStore.actualLine].length;
    this.updateLoading();
  }

  processContent() {
    let returnText = '';
    for (let i = 0; i < this.commandStore.linesArray.length; i++) {
      if (i != 0) {
        returnText = returnText + '<br>';
      }
      returnText = returnText + this.lineText;

      if (
        this.commandStore.actualLine == i ||
        this.commandStore.actualPosition == -1
      ) {
        returnText =
          returnText +
          this.processString(
            this.commandStore.linesArray[i].substring(
              0,
              this.commandStore.actualPosition
            )
          );

        returnText =
          returnText +
          this.cursorBefore +
          this.processString(
            this.commandStore.linesArray[i].substring(
              this.commandStore.actualPosition,
              this.commandStore.actualPosition + 1
            )
          ) +
          this.cursorAfter;

        returnText =
          returnText +
          this.processString(
            this.commandStore.linesArray[i].substring(
              this.commandStore.actualPosition + 1,
              this.commandStore.linesArray[i].length
            )
          );

        if (
          this.commandStore.actualPosition ==
          this.commandStore.linesArray[i].length
        ) {
          returnText =
            returnText + this.cursorBefore + '&nbsp;' + this.cursorAfter;
        }
      } else {
        returnText =
          returnText + this.processString(this.commandStore.linesArray[i]);
      }

      // if (this.commandStore.actualLine > i) {
      //   if (this.commandStore.answerArray[i] == '') {
      //     returnText = returnText + this.commandStore.answerArray[i];
      //   } else {
      //     returnText = returnText + '<br>' + this.commandStore.answerArray[i];
      //   }
      // }
      if (this.commandStore.answerArray[i] == '') {
        returnText = returnText + this.commandStore.answerArray[i];
      } else {
        returnText = returnText + '<br>' + this.commandStore.answerArray[i];
      }

      if (
        this.commandStore.actualPosition == -1 &&
        this.loadingTotal.value > 0 &&
        i == this.commandStore.actualLine
      ) {
        returnText = returnText + '[';
        for (let i = 0; i < 10; i++) {
          if (
            i <
            (10 * this.loadingActual.value + 1) / this.loadingTotal.value
          ) {
            returnText =
              returnText + this.cursorBefore + '&nbsp' + this.cursorAfter;
          } else {
            returnText = returnText + '&nbsp';
          }
        }
        returnText = returnText + ']';
        // divide por 10
      }

      if (
        this.commandStore.actualPosition == -1 &&
        this.loadingTotal.value != 0 &&
        i == this.commandStore.actualLine
      ) {
        returnText =
          returnText + ' ' + this.loadingBars[this.loadingState.value % 4] + '';
      }

      // if (
      //   this.commandStore.actualPosition == -1 &&
      //   i == this.commandStore.actualLine
      // ) {
      //   returnText =
      //     returnText + this.cursorBefore + '&nbsp;' + this.cursorAfter;
      // }
    }

    return returnText;
  }

  private updateLoading() {
    this.loadingState.value = this.loadingState.value + 1;
    if (this.loadingState.value > 1000) {
      this.loadingState.value = 0;
    }
    setTimeout(() => {
      this.updateLoading();
    }, 300);
  }

  // Loading

  startLoading(total = -1) {
    this.loadingTotal.value = total;
    this.loadingActual.value = 0;
  }

  setLoading(actual: number, inverse = false) {
    this.loadingActual.value = inverse
      ? this.loadingTotal.value - actual
      : actual;
  }

  stopLoading() {
    this.loadingTotal.value = 0;
    this.loadingActual.value = 0;
  }

  print(text: string) {
    this.commandStore.answerArray[this.commandStore.actualLine] +=
      text.replaceAll('  ', '&nbsp;&nbsp;');
  }

  println(text: string) {
    this.print(text + '<br>');
  }

  eraseln() {
    const actualAnswer =
      this.commandStore.answerArray[this.commandStore.actualLine];
    const lines = actualAnswer.split('<br>').filter((val) => {
      if (val == '') {
        return false;
      }
      return true;
    });
    lines.pop();

    let linesReturn = '';
    for (let i = 0; i < lines.length; i++) {
      linesReturn = linesReturn + lines[i] + '<br>';
    }
    this.commandStore.answerArray[this.commandStore.actualLine] = linesReturn;
  }

  keyDown(e: KeyboardEvent) {
    // console.log(this.commandStore.actualLine);
    // console.log(e);
    // console.log(e.shiftKey);
    if (e.key == ' ' || e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      e.preventDefault();
    }
    if (this.commandStore.actualPosition == -1) {
      if (e.ctrlKey == true && e.key == 'c') {
        // Break process
        this.println('&#94;C');
        this.terminalCommandController.break();
      }
      return;
    }
    if (e.key == 'Backspace') {
      if (this.commandStore.actualPosition > 0) {
        this.commandStore.linesArray[this.commandStore.actualLine] =
          this.commandStore.linesArray[this.commandStore.actualLine].slice(
            0,
            this.commandStore.actualPosition - 1
          ) +
          this.commandStore.linesArray[this.commandStore.actualLine].slice(
            this.commandStore.actualPosition
          );
        this.commandStore.actualPosition -= 1;
      }
    } else if (e.key == 'ArrowLeft') {
      if (this.commandStore.actualPosition > 0) {
        this.commandStore.actualPosition -= 1;
      }
    } else if (e.key == 'ArrowRight') {
      if (
        this.commandStore.actualPosition <
        this.commandStore.linesArray[this.commandStore.actualLine].length
      ) {
        this.commandStore.actualPosition += 1;
      }
    } else if (e.key == 'Enter') {
      this.commandStore.linesArray[this.commandStore.actualLine] =
        this.commandStore.linesArray[this.commandStore.actualLine]
          .replaceAll('¬', ' ')
          .trim()
          .replaceAll(' ', '¬');
      // Process
      this.commandStore.actualPosition = -1;
      this.terminalCommandController.processCommand(
        this,
        this.commandStore.linesArray[this.commandStore.actualLine],
        () => {
          this.commandStore.linesArray.push('');
          this.commandStore.answerArray.push('');
          this.commandStore.actualLine += 1;
          this.commandStore.lineReference = -1;
          this.commandStore.actualPosition =
            this.commandStore.linesArray[this.commandStore.actualLine].length;
          this.stopLoading();
        }
      );
      // this.commandStore.answerArray[this.commandStore.actualLine] =
      //   this.terminalCommandController.processCommand(
      //     this,
      //     this.commandStore.linesArray[this.commandStore.actualLine]
      //   );

      // scrollToBottom();
    } else if (e.key == 'ArrowUp') {
      // Arrow Up
      if (
        this.commandStore.actualLine > 0 &&
        this.commandStore.lineReference == -1
      ) {
        this.commandStore.lineReference = this.commandStore.actualLine - 1;
        this.commandStore.linesArray[this.commandStore.actualLine] =
          this.commandStore.linesArray[this.commandStore.lineReference];
        this.commandStore.actualPosition =
          this.commandStore.linesArray[this.commandStore.actualLine].length;
      } else if (this.commandStore.lineReference > 0) {
        this.commandStore.lineReference -= 1;
        this.commandStore.linesArray[this.commandStore.actualLine] =
          this.commandStore.linesArray[this.commandStore.lineReference];
        this.commandStore.actualPosition =
          this.commandStore.linesArray[this.commandStore.actualLine].length;
      }
    } else if (e.key == 'ArrowDown') {
      // Arrow Down
      if (this.commandStore.lineReference != -1) {
        this.commandStore.lineReference += 1;
        if (
          this.commandStore.lineReference >=
          this.commandStore.linesArray.length - 1
        ) {
          this.commandStore.lineReference = -1;
          this.commandStore.linesArray[this.commandStore.actualLine] = '';
          this.commandStore.actualPosition =
            this.commandStore.linesArray[this.commandStore.actualLine].length;
        } else {
          this.commandStore.linesArray[this.commandStore.actualLine] =
            this.commandStore.linesArray[this.commandStore.lineReference];
          this.commandStore.actualPosition =
            this.commandStore.linesArray[this.commandStore.actualLine].length;
        }
      }
    } else {
      if (e.key.length == 1 && /[\w$-/:-?{-~!"^`\[\]\s@#]/.test(e.key)) {
        let key = e.key;
        if (e.key == ' ') {
          key = '¬';
        }

        this.commandStore.linesArray[this.commandStore.actualLine] =
          this.commandStore.linesArray[this.commandStore.actualLine].slice(
            0,
            this.commandStore.actualPosition
          ) +
          key +
          this.commandStore.linesArray[this.commandStore.actualLine].slice(
            this.commandStore.actualPosition
          );
        // text += e.key;
        this.commandStore.actualPosition += 1;
      }
    }
  }

  processString(str: string) {
    return str.replaceAll('¬', '&nbsp;');
  }
}
