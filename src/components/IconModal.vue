<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 rounded-lg shadow-lg mx-auto max-w-6xl">
      <pre
        class="bg-slate-800 text-white"
      ><code class="whitespace-pre-wrap"><highlightjs id="icon-code" autodetect :code="svgCode" /></code></pre>
      <button
        class="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
        @click="$emit('close')"
      >
        Close
      </button>
      <button
        @click="copyCode"
        class="mt-4 ml-2 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
        :class="{
          'bg-emerald-500 hover:bg-emerald-600': !copied,
          'bg-gray-500 hover:bg-gray-500 text-gray-200': copied,
        }"
        :disabled="copied"
      >
        <span v-if="!copied">Copy code</span>
        <span v-if="copied">Code copied..</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IconModal",
  props: {
    svgCode: {
      type: String,
      required: true,
    },
  },
  methods: {
    copyCode() {
      const code = document.querySelector("#icon-code")?.textContent;
      if (code) {
        navigator.clipboard.writeText(code);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      }
    },
  },
  setup() {
    const copied = ref(false);

    return {
      copied,
    };
  },
});
</script>
