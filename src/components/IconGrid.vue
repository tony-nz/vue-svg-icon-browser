<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="flex flex-col items-center border-dashed border-2 border-gray-300 p-4 hover:bg-gray-200 cursor-pointer"
      @click="selectIcon(icon)"
    >
      <img
        v-svg-inline
        class="h-8 w-8 vue-logo-img"
        :data-src="path + '/' + icon"
      />
      <span class="mt-2 text-sm font-medium text-gray-900">{{ icon }}</span>
    </div>
    <icon-modal
      v-if="showModal"
      :svg-code="selectedIcon"
      @close="showModal = false"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import IconModal from "./IconModal.vue";

export default defineComponent({
  name: "IconGrid",
  components: {
    IconModal,
  },
  props: {
    icons: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      default: "icons",
    },
  },
  setup(props) {
    const showModal = ref(false);
    const selectedIcon = ref("");

    function showIcon(icon: any) {
      fetch(`${props.path}/${icon}`)
        .then((response) => response.text())
        .then((text) => {
          selectedIcon.value = text;
        });
    }

    function selectIcon(icon: any) {
      showIcon(icon);
      showModal.value = true;
    }

    return {
      showModal,
      selectedIcon,
      selectIcon,
    };
  },
});
</script>
