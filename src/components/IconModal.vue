<template>
  <div>
    <div
      @click="$emit('close')"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div @click.stop="" class="bg-white p-4 rounded-lg shadow-lg mx-auto max-w-2xl max-h-full">
        <div class="group flex flex-col items-center p-4">
          <img v-svg-inline class="h-8 w-8 vue-logo-img" :data-src="icon" />
          <span class="mt-2 text-sm font-medium text-gray-500">{{ icon }}</span>
        </div>
        <pre
          class="bg-slate-800 text-white"
        ><code class="whitespace-pre-wrap"><highlightjs id="icon-code" autodetect :code="formattedCode" /></code></pre>
        <button
          class="mt-4 bg-gray-300 hover:bg-gray-400 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          @click="$emit('close')"
        >
          Close
        </button>
        <button
          @click="copyCode"
          class="mt-4 ml-2 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
          :class="{
            'bg-emerald-400 hover:bg-emerald-500': !copied,
            'bg-gray-300 hover:bg-gray-300 text-gray-200': copied,
          }"
          :disabled="copied"
        >
          <span v-if="!copied">Copy code</span>
          <span v-if="copied">Code copied..</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import prettier from "prettier";
import xmlParser from "@prettier/plugin-xml";

export default defineComponent({
  name: "IconModal",
  props: {
    svgCode: {
      type: String,
      required: true,
    },
    icon: {
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
  setup(props) {
    const copied = ref(false);
    const formattedCode = prettier.format(props.svgCode, {
      parser: "xml",
      plugins: [xmlParser],
    });

    return {
      copied,
      formattedCode,
    };
  },
});
</script>
