<template>
  <img class="mx-auto h-12 mt-8 mb-2" src="./assets/logo.png" alt="Vue logo" />
  <h1 class="text-center text-xl mb-2">Vue SVG Icon Browser</h1>
  <div class="text-center font-medium text-sm">
    Vue SVG Icon Browser is a simple and user-friendly web application that<br />
    allows you to browse and search through a collection of SVG icons by tony-nz
    <span class="text-xs text-gray-400">
      <a href="https://github.com/tony-nz/vue-svg-icon-browser" target="_blank"
        >Github</a
      >
    </span>
  </div>
  <div class="mx-auto mt-8 max-w-6xl p-4">
    <div
      class="flex items-center justify-between mb-4 border-gray-200 border-2 p-1"
    >
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <rect id="bound" x="0" y="0" width="24" height="24"></rect>
              <path
                d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                fill="#000000"
                fill-rule="nonzero"
                opacity="0.3"
              ></path>
              <path
                d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                fill="#000000"
                fill-rule="nonzero"
              ></path>
            </g>
          </svg>
        </div>
        <input
          v-model="search"
          type="text"
          class="block w-full pl-10 pr-12 py-2 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue sm:text-sm sm:leading-5"
          placeholder="Search icons..."
          v-on:keyup.enter="searchTerm = search"
        />
        <button
          class="absolute inset-y-0 right-0 bg-emerald-500 px-4 rounded-md text-white text-sm"
          @click="searchTerm = search"
        >
          Search
        </button>
      </div>
    </div>
    <div class="mb-4 border-gray-200 border-2 p-2 whitespace-normal">
      <button
        class="bg-gray-200 text-gray-400 px-4 py-1 rounded-md text-sm mr-2 mb-2"
        @click="searchTerm = ''"
        :class="{ 'bg-slate-800 text-white font-bold': searchTerm === '' }"
      >
        all
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        class="bg-gray-200 text-gray-400 px-4 py-1 rounded-md text-sm mr-2 mb-2"
        @click="searchTerm = tag"
        :class="{
          'bg-slate-800 text-white font-bold': searchTerm === tag,
        }"
      >
        {{ tag }}
      </button>
    </div>
    <icon-grid :key="viewKey" :icons="filteredIcons" @select="selectIcon" />
    <icon-modal
      v-if="showModal"
      :svg-code="selectedSvgCode"
      :icon="'icons/' + selectedIcon"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { icons } from "../icons.config";
import IconGrid from "./components/IconGrid.vue";
import IconModal from "./components/IconModal.vue";

export default defineComponent({
  name: "App",
  components: {
    IconGrid,
    IconModal,
  },
  setup() {
    const viewKey = ref(0);
    const searchTerm = ref("");
    const search = ref("");
    const selectedIcon = ref("");
    const selectedSvgCode = ref("");
    const showModal = ref(false);
    const filteredIcons = computed(() => {
      if (searchTerm.value === "") {
        return icons;
      }
      const term = searchTerm.value.toLowerCase();
      return icons.filter((icon: any) => icon.toLowerCase().includes(term));
    });
    const selectIcon = (svgCode: string, icon: string) => {
      showModal.value = true;
      selectedIcon.value = icon;
      selectedSvgCode.value = svgCode;
    };
    const tags = [
      "abstract",
      "arrows",
      "art",
      "clothes",
      "code",
      "coding",
      "communication",
      "cooking",
      "design",
      "devices",
      "ecommerce",
      "electric",
      "electronics",
      "fa",
      "finance",
      "food",
      "general",
      "graphs",
      "home",
      "interface",
      "layout",
      "map",
      "medicine",
      "music",
      "navigation",
      "shopping",
      "social",
      "technology",
      "text",
      "tools",
      "weather",
    ];

    watch(searchTerm, () => {
      viewKey.value += 1;
    });

    return {
      icons,
      filteredIcons,
      searchTerm,
      search,
      selectIcon,
      selectedIcon,
      selectedSvgCode,
      showModal,
      tags,
      viewKey,
    };
  },
});
</script>
