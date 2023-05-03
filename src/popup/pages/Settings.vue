<template>
  <div class="p-2 space-y-4">
    <ul
      v-if="account"
      class="rounded-lg px-2 py-1 bg-indigo-50 divide-y divide-indigo-100 border border-indigo-100"
    >
      <li class="flex items-center justify-between py-2">
        <p>Address</p>
        <p>{{ account.address }}</p>
      </li>
      <li class="flex items-center justify-between py-2">
        <p>Quota</p>
        <p>{{ quota }} mb</p>
      </li>
      <li class="flex items-center justify-between py-2">
        <p>Usage</p>
        <p>{{ used }} mb</p>
      </li>
      <li class="flex items-center justify-between py-2">
        <p>Account created on</p>
        <p>{{ createdAt }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { onMounted, ref, computed } from "vue";
import useImbox from "~/popup/store/useImbox";

interface Account {
  address: string;
  createdAt: string;
  quota: number;
  used: number;
}

const imbox = useImbox();
const account = ref<Account | null>(null);

async function getMe(): Promise<void> {
  try {
    const me = await imbox.getMe();
    account.value = me;
  } catch (err) {
    console.log(err);
  }
}

const createdAt = computed(() => {
  if (account.value) {
    return useDateFormat(account.value.createdAt, "DD MMM, YYYY").value.replace(
      /['"]+/g,
      ""
    );
  }
  return "";
});

const quota = computed(() => {
  if (account.value) {
    return (account.value.quota / 1024 / 1024).toFixed(2);
  }
  return "";
});

const used = computed(() => {
  if (account.value) {
    return (account.value.used / 1024 / 1024).toFixed(2);
  }
  return "";
});

onMounted(getMe);
</script>
