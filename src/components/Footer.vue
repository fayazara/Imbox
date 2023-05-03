<template>
  <footer class="border-t p-2 flex items-center justify-between text-slate-500">
    <RouterLink to="/info">Help</RouterLink>
    <div>
      Powered by <a class="underline" target="_blank" href="https://mail.tm">mail.tm</a>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
