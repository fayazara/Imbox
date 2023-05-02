<template>
  <div class="p-2">
    <div v-if="message">
      <h1 class="text-base font-bold">{{ message.subject }}</h1>
      <div class="py-2 mt-1">
        <div><span class="text-slate-500"> from:</span> {{ message.from.address }}</div>
        <div><span class="text-slate-500"> to:</span> {{ message.to[0].address }}</div>
      </div>
      <div class="bg-slate-100 p-4 rounded-lg" v-html="message.html"></div>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import useImbox from "~/popup/store/useImbox";

const imbox = useImbox();
const messageId = ref(null);
const router = useRouter();
const route = useRoute();
const message = ref(null);
watch(
  () => route.params.messageId,
  (newMessageId) => {
    messageId.value = newMessageId;
    getMessage();
  },
  { immediate: true }
);

async function getMessage() {
  message.value = await imbox.fetchMessage(messageId.value);
}
</script>
