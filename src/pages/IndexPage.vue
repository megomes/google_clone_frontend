<template>
  <q-page class="bg-black text-white flex flex-col">
    <HeaderComponent></HeaderComponent>
    <div class="flex-1 flex flex-col justify-center items-center p-5">
      <img src="../assets/logo.svg" class="w-[130px] mb-10" />
      <TerminalComponent
        class="w-full max-w-[600px] overflow-hidden"
      ></TerminalComponent>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import TerminalComponent from '../components/TerminalComponent.vue';
</script>

<style lang="scss" scoped></style>
