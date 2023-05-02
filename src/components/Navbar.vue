<template>
  <nav class="px-4 pt-2 flex items-center justify-between border-b">
    <RouterLink to="/" class="flex items-center gap-x-2">
      <img src="/assets/icon.svg" class="h-8 w-auto" />
      <p class="text-sm font-semibold">Imbox</p>
    </RouterLink>
    <div class="flex gap-x-2">
      <div class="flex items-center gap-x-2">
        <p class="font-medium text-blue-950">{{ imbox.email }}</p>
        <button @click="copyEmail">
          <IonCopyOutline class="h-4 w-4 text-slate-500 hover:text-sky-600" />
        </button>
      </div>
      <RouterLink to="/settings">
        <IonSettingsOutline class="h-4 w-4 text-slate-500 hover:text-sky-600" />
      </RouterLink>
    </div>
  </nav>
</template>
<script setup>
import { computed } from "vue";
import useImbox from "~/popup/store/useImbox";

const imbox = useImbox();
import { RouterLink } from "vue-router";

async function copyEmail() {
  await navigator.clipboard.writeText(imbox.email);
  alert("Email copied to clipboard");
}
</script>
