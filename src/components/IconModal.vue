<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded-lg shadow-lg mx-auto max-w-6xl">
      <pre
        class="bg-slate-800 p-4 text-white"
      ><code class="whitespace-pre-wrap">{{ svgCode }}</code></pre>
      <button
        class="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconModal",
  props: {
    svgCode: {
      type: String,
      required: true,
    },
  },
});
</script>
