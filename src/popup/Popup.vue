<template>
  <main class="w-[400px]">
    <Navbar :emailAddress="email" />
    <div class="" v-if="!loading">
      <ul v-if="messages.length" class="divide-y divide-gray-100 mt-2">
        <MessageCard v-for="message in messages" :key="message.id" :message="message" />
      </ul>
      <EmptyInbox v-else :email="email" />
    </div>
    <div v-else class="p-8 bg-slate-100 flex items-center justify-center">
      <p>Loading...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Mailjs from "~/services/mail";
import { transformIncomingMessage } from "~/utils/messages";

interface ImboxAccount {
  email: string;
  password: string;
  token: string;
}

const email = ref("");
const password = ref("");
const token = ref("");
const messages = ref([]);
const loading = ref(false);

async function getMessages(): Promise<void> {
  try {
    loading.value = true;
    const mailjs = new Mailjs();
    const { imboxAccount } = await chrome.storage.sync.get("imboxAccount");
    if (!imboxAccount) {
      return;
    }
    await mailjs.loginWithToken(imboxAccount.token);
    email.value = imboxAccount.email;
    password.value = imboxAccount.password;
    token.value = imboxAccount.token;
    const allMessages = await mailjs.getMessages();
    if (allMessages.status) {
      messages.value = allMessages.data;
    }
    mailjs.on("arrive", (msg) => {
      const transformedMsg = transformIncomingMessage(msg);
      const existingMsg = messages.value.find((m) => m.id === transformedMsg.id);
      if (!existingMsg) {
        messages.value.unshift(transformedMsg);
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(getMessages);
</script>
