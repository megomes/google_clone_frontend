import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommandsStore = defineStore('commands', () => {
  const linesArray = ref(['']);
  const answerArray = ref(['']);
  const actualLine = ref(0);
  const lineReference = ref(-1);
  const actualPosition = ref(0);

  function restart() {
    linesArray.value = [];
    answerArray.value = [];
    actualLine.value = -1;
    lineReference.value = -1;
    actualPosition.value = 0;
  }

  return {
    linesArray,
    answerArray,
    actualLine,
    lineReference,
    actualPosition,

    restart,
  };
});
