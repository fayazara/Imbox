<template>
  <div class="mt-2">
    <div v-if="!imbox.messagesLoading">
      <ul v-if="messages.length" class="divide-y divide-gray-100 mt-2">
        <MessageCard v-for="message in messages" :key="message.id" :message="message" />
      </ul>
      <EmptyInbox v-else :email="imbox.email" />
    </div>
    <div class="p-8 bg-slate-100 flex items-center space-x-2 justify-center" v-else>
      <SvgSpinners180RingWithBg class="h-6 w-6 text-sky-600" />
      <p class="text-sm">Fetching Messages...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useImbox from "~/popup/store/useImbox";
const imbox = useImbox();
const messages = computed(() => imbox.messages);
</script>
