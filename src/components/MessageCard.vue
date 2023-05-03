<template>
  <li>
    <RouterLink
      :to="message.id"
      class="relative flex justify-between gap-x-6 p-2 hover:bg-slate-100 w-full text-left"
    >
      <div class="flex items-center gap-x-2">
        <img
          class="h-8 w-8 flex-none"
          :src="`https://api.dicebear.com/6.x/initials/svg?seed=${message.from.address}&radius=15&backgroundColor=b6e3f4,c0aede,d1d4f9&textColor=334155&fontSize=40`"
          :alt="message.from.address"
        />
        <div class="min-w-0 flex-auto">
          <p class="font-semibold text-gray-900 truncate">
            {{ message.subject }}
          </p>
          <p class="flex text-xs text-gray-500">
            <span class="relative truncate">{{ message.from.address }}</span>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-x-2">
        <div class="flex sm:flex-col sm:items-end">
          <p class="text-xs leading-5 text-gray-500 flex-shrink-0">
            <UseTimeAgo v-slot="{ timeAgo }" :time="message.createdAt">
              {{ timeAgo }}
            </UseTimeAgo>
          </p>
        </div>
        <svg
          class="h-5 w-5 flex-none text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
    </RouterLink>
  </li>
</template>
<script setup>
import { RouterLink } from "vue-router";
import { UseTimeAgo } from "@vueuse/components";
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped></style>
