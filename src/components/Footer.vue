<template>
  <nav class="text-xl mt-6">
    <button
      class="icon-btn mx-2 !outline-none"
      title="Toggle dark mode"
      @click="(e) => toggleDark()"
    >
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>

    <a
      class="icon-btn mx-2"
      rel="noreferrer"
      href="https://github.com/xiaoluoboding/chrome-ext-mv3-starter"
      target="_blank"
      title="GitHub"
    >
      <carbon-logo-github />
    </a>
  </nav>
</template>

<script setup lang="ts">
import { isDark, toggleDark } from "~/utils";
</script>
