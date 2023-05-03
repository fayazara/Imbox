<template>
  <main class="w-[400px]">
    <Navbar />
    <div class="h-80 overflow-y-scroll">
      <RouterView />
    </div>
    <Footer />
  </main>
</template>
<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted } from "vue";
import useImbox from "~/popup/store/useImbox";

const imbox = useImbox();
async function login() {
  try {
    const { imboxAccount } = await chrome.storage.sync.get("imboxAccount");
    if (!imboxAccount) {
      return;
    }
    await imbox.login(imboxAccount.token);
    imbox.setUserData(imboxAccount.email, imboxAccount.password, imboxAccount.token);
    await imbox.fetchMessages();
  } catch (error) {
    console.error(error);
  }
}

onMounted(login);
</script>
