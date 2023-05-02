<template>
  <main class="w-[300px] p-4">
    <div class="">
      email:
      {{ email }}
    </div>

    <ul v-if="messages.length" class="mt-4 space-y-2">
      <li v-for="message in messages" :key="message.id">
        <p>
          From: <strong> {{ message.from.address }}</strong>
        </p>
        <p>
          Subject: <strong>{{ message.subject }}</strong>
        </p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Mailjs from "~/services/mail";
import { transformIncomingMessage } from "~/utils/messages";
const email = ref("");
const password = ref("");
const token = ref("");
const messages = ref([]);

onMounted(async () => {
  try {
    const mailjs = new Mailjs();
    const { imboxAccount } = await chrome.storage.sync.get("imboxAccount");
    if (imboxAccount) {
      await mailjs.loginWithToken(imboxAccount.token);
      email.value = imboxAccount.email;
      password.value = imboxAccount.password;
      token.value = imboxAccount.token;
      const allMessages = await mailjs.getMessages();
      if (allMessages.status) {
        messages.value = allMessages.data;
      }
      mailjs.on("arrive", (msg) => messages.value.unshift(transformIncomingMessage(msg)));
    }
  } catch (error) {
    console.error(error);
  }
});
</script>
