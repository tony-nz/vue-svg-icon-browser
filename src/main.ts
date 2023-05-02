import { createApp } from "vue";
import "./assets/tailwind.css";
import App from "./App.vue";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";

const app = createApp(App);

app.use(VueSvgInlinePlugin, {
  attributes: {
    data: ["src"],
    remove: ["alt"],
  },
});

app.mount("#app");
