<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="(icon, index) in icons"
      :key="index"
      class="group flex flex-col items-center border-dashed border-2 border-gray-300 p-4 hover:bg-emerald-400 cursor-pointer"
      @click="selectIcon(icon)"
    >
      <img
        v-svg-inline
        class="h-8 w-8 vue-logo-img"
        :data-src="path + '/' + icon"
      />
      <span
        class="mt-2 text-sm font-medium text-gray-500 group-hover:text-white"
        >{{ icon }}</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IconGrid",
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
  setup(props, { emit }) {
    const selectedIcon = ref("");

    function showIcon(icon: any) {
      fetch(`${props.path}/${icon}`)
        .then((response) => response.text())
        .then((text) => {
          selectedIcon.value = text;
          emit("select", selectedIcon.value);
        });
    }

    function selectIcon(icon: any) {
      showIcon(icon);
    }

    return {
      selectedIcon,
      selectIcon,
    };
  },
});
</script>
