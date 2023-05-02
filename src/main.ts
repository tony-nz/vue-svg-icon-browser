import { createApp } from "vue";
import "./assets/tailwind.css";
import App from "./App.vue";
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import "highlight.js/styles/stackoverflow-dark.css";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage("javascript", javascript);

const app = createApp(App);
app.use(hljsVuePlugin);

app.use(VueSvgInlinePlugin, {
  attributes: {
    data: ["src"],
    remove: ["alt"],
  },
});

app.mount("#app");
