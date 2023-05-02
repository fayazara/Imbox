<template>
  <div class="p-2">
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
        <p>{{ account.quota }}</p>
      </li>
      <li class="flex items-center justify-between py-2">
        <p>Usage</p>
        <p>{{ account.used }}</p>
      </li>
      <li class="flex items-center justify-between py-2">
        <p>Account created on</p>
        <p>{{ formattedDate(account.createdAt) }}</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { useDateFormat } from "@vueuse/core";
import { onMounted, ref } from "vue";
import useImbox from "~/popup/store/useImbox";
const imbox = useImbox();
const account = ref(null);
async function getMe() {
  const me = await imbox.getMe();
  account.value = me;
}
// strip double quotes from date string
const formattedDate = (date) => useDateFormat(date, "DD MMM, YYYY")

onMounted(getMe);
</script>
<style scoped></style>
