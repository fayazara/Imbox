<template>
  <nav class="px-4 pt-2 flex items-center justify-between border-b">
    <div class="flex items-center gap-x-2">
      <img src="/assets/icon.svg" class="h-8 w-auto" />
      <p class="text-sm font-semibold">Imbox</p>
    </div>
    <div class="flex gap-x-2">
      <div class="flex items-center gap-x-2">
        <p class="font-medium text-blue-950">{{ emailAddress }}</p>
        <button @click="copyEmail">
          <IonCopyOutline class="h-4 w-4 text-slate-500 hover:text-sky-600" />
        </button>
      </div>
      <button>
        <IonSettingsOutline class="h-4 w-4 text-slate-500 hover:text-sky-600" />
      </button>
    </div>
  </nav>
</template>
<script setup>
const props = defineProps({
  emailAddress: {
    type: String,
  },
});

async function copyEmail() {
  if (!navigator.clipboard || !props.emailAddress) {
    return;
  }
  await navigator.clipboard.writeText(props.emailAddress);
  alert("Email copied to clipboard");
}
</script>
