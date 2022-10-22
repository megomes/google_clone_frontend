<template>
  <div>
    <div class="bg-[#191724] rounded-lg flex flex-col h-[400px]">
      <!-- Header -->
      <div class="w-full flex flex-row items-center justify-start gap-2 p-3">
        <!-- RED -->
        <div
          class="h-3 w-3 bg-[#FF5F56] rounded-full hover:opacity-50 hover:cursor-pointer"
          @click="redButtonClicked"
        ></div>
        <!-- YEL -->
        <div
          class="h-3 w-3 bg-[#FFBD2E] rounded-full hover:opacity-50 hover:cursor-pointer"
          @click="yellowButtonClicked"
        ></div>
        <!-- GRE -->
        <div
          class="h-3 w-3 bg-[#27C93F] rounded-full hover:opacity-50 hover:cursor-pointer"
          @click="greenButtonClicked"
        ></div>
      </div>
      <div class="" id="terminal_container" :innerHTML="getText"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, computed, onMounted, onUnmounted, watch } from 'vue';
import TerminalUIController from '../controllers/TerminalUIController';
import { useCommandsStore } from 'src/stores/commands-store';

const terminalUIController = new TerminalUIController();
const commandStore = useCommandsStore();

const linesArray = commandStore.linesArray; //terminalUIController.linesArray;
const actualLine = commandStore.actualLine;

const getText = computed({
  get() {
    return terminalUIController.processContent();
  },
  set(val) {
    linesArray[actualLine] = val;
  },
});

watch(getText, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

onMounted(() => {
  window.addEventListener('keydown', keyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', keyDown);
});

function keyDown(e: KeyboardEvent) {
  terminalUIController.keyDown(e);
}

function scrollToBottom() {
  var container = document.querySelector('#terminal_container');
  if (container != null) {
    var scrollHeight = container.scrollHeight;
    container.scrollTop = scrollHeight;
  }
}

function redButtonClicked() {
  // terminalUIController.log('text');
}
function yellowButtonClicked() {
  //
}
function greenButtonClicked() {
  //
}
</script>

<style lang="scss">
.error {
  @apply text-red-500 font-thin;
}
.line_start {
  @apply text-[#27C93F] inline-block select-none;
}

#terminal_container {
  @apply font-code font-thin p-3 px-5 gap-1 flex-1 outline-none select-none overflow-auto;
}

#terminal_container::-webkit-scrollbar {
  width: 5px;
}

#terminal_container::-webkit-scrollbar-thumb {
  background-color: #35314d;
  // outline: 1px solid slategrey;
  border-radius: 5px;
}
</style>
