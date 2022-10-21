import { ref } from 'vue';
import TerminalCommandController from './TerminalCommandController';

export default class TerminalUIController {
  private lineText =
    '<div class="line_start" contenteditable="false">~ $&nbsp;</div>';
  private cursorBefore = '<span class="bg-green-500 text-black font-semibold">';
  private cursorAfter = '</span>';

  linesArray = ref(['']);
  answerArray = ref(['']);
  actualLine = ref(0);
  lineReference = ref(-1);
  actualPosition = ref(0);

  terminalCommandController = new TerminalCommandController();

  constructor() {
    this.actualPosition.value =
      this.linesArray.value[this.actualLine.value].length;
  }

  processContent() {
    let returnText = '';
    for (let i = 0; i < this.linesArray.value.length; i++) {
      if (i != 0) {
        returnText = returnText + '<br>';
      }
      returnText = returnText + this.lineText;

      if (this.actualLine.value == i) {
        returnText =
          returnText +
          this.processString(
            this.linesArray.value[i].substring(0, this.actualPosition.value)
          );

        returnText =
          returnText +
          this.cursorBefore +
          this.processString(
            this.linesArray.value[i].substring(
              this.actualPosition.value,
              this.actualPosition.value + 1
            )
          ) +
          this.cursorAfter;

        returnText =
          returnText +
          this.processString(
            this.linesArray.value[i].substring(
              this.actualPosition.value + 1,
              this.linesArray.value[i].length
            )
          );

        if (this.actualPosition.value == this.linesArray.value[i].length) {
          returnText =
            returnText + this.cursorBefore + '&nbsp;' + this.cursorAfter;
        }
      } else {
        returnText = returnText + this.processString(this.linesArray.value[i]);
      }

      if (this.actualLine.value > i) {
        if (this.answerArray.value[i] == '') {
          returnText = returnText + this.answerArray.value[i];
        } else {
          returnText = returnText + '<br>' + this.answerArray.value[i];
        }
      }
    }

    return returnText;
  }

  keyDown(e: KeyboardEvent) {
    // console.log(this.actualLine.value);
    // console.log(e);
    // console.log(e.shiftKey);
    if (e.key == ' ' || e.key == 'ArrowUp' || e.key == 'ArrowDown') {
      e.preventDefault();
    }
    if (e.key == 'Backspace') {
      if (this.actualPosition.value > 0) {
        this.linesArray.value[this.actualLine.value] =
          this.linesArray.value[this.actualLine.value].slice(
            0,
            this.actualPosition.value - 1
          ) +
          this.linesArray.value[this.actualLine.value].slice(
            this.actualPosition.value
          );
        this.actualPosition.value -= 1;
      }
    } else if (e.key == 'ArrowLeft') {
      if (this.actualPosition.value > 0) {
        this.actualPosition.value -= 1;
      }
    } else if (e.key == 'ArrowRight') {
      if (
        this.actualPosition.value <
        this.linesArray.value[this.actualLine.value].length
      ) {
        this.actualPosition.value += 1;
      }
    } else if (e.key == 'Enter') {
      this.linesArray.value[this.actualLine.value] = this.linesArray.value[
        this.actualLine.value
      ]
        .replaceAll('¬', ' ')
        .trim()
        .replaceAll(' ', '¬');
      // Process

      this.answerArray.value[this.actualLine.value] =
        this.terminalCommandController.processCommand(
          this.linesArray.value[this.actualLine.value]
        );
      this.linesArray.value.push('');

      this.answerArray.value.push('');
      this.actualLine.value += 1;
      this.lineReference.value = -1;
      this.actualPosition.value =
        this.linesArray.value[this.actualLine.value].length;
      // scrollToBottom();
    } else if (e.key == 'ArrowUp') {
      // Arrow Up
      if (this.actualLine.value > 0 && this.lineReference.value == -1) {
        this.lineReference.value = this.actualLine.value - 1;
        this.linesArray.value[this.actualLine.value] =
          this.linesArray.value[this.lineReference.value];
        this.actualPosition.value =
          this.linesArray.value[this.actualLine.value].length;
      } else if (this.lineReference.value > 0) {
        this.lineReference.value -= 1;
        this.linesArray.value[this.actualLine.value] =
          this.linesArray.value[this.lineReference.value];
        this.actualPosition.value =
          this.linesArray.value[this.actualLine.value].length;
      }
    } else if (e.key == 'ArrowDown') {
      // Arrow Down
      if (this.lineReference.value != -1) {
        this.lineReference.value += 1;
        if (this.lineReference.value >= this.linesArray.value.length - 1) {
          this.lineReference.value = -1;
          this.linesArray.value[this.actualLine.value] = '';
          this.actualPosition.value =
            this.linesArray.value[this.actualLine.value].length;
        } else {
          this.linesArray.value[this.actualLine.value] =
            this.linesArray.value[this.lineReference.value];
          this.actualPosition.value =
            this.linesArray.value[this.actualLine.value].length;
        }
      }
    } else {
      if (e.key.length == 1 && /[\w$-/:-?{-~!"^`\[\]\s@#]/.test(e.key)) {
        let key = e.key;
        if (e.key == ' ') {
          key = '¬';
        }

        this.linesArray.value[this.actualLine.value] =
          this.linesArray.value[this.actualLine.value].slice(
            0,
            this.actualPosition.value
          ) +
          key +
          this.linesArray.value[this.actualLine.value].slice(
            this.actualPosition.value
          );
        // text.value += e.key;
        this.actualPosition.value += 1;
      }
    }
  }

  processString(str: string) {
    return str.replaceAll('¬', '&nbsp;');
  }
}
