import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga, {
    dropdown: { mobileModal: true },
  });
});
