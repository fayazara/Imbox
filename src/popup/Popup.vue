<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700 dark:text-gray-200">
    <img src="/assets/icon.svg" class="h-12 w-12 text-2xl mx-auto" />
    <div>Popup</div>
    <p class="mt-2 opacity-50">This is the popup page</p>
    <button class="btn mt-2" @click="openOptionsPage">Open Options</button>

    <Footer />

    <div class="mt-2"><span class="opacity-50">Storage:</span> {{ storageDemo }}</div>
  </main>
</template>

<script setup lang="ts">
import { storageDemo } from "~/logic/storage";

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}
</script>
