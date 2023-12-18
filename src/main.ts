import { createApp } from 'vue'
import App from './App.vue'
import Antd from "ant-design-vue";
import router from "./router";
import "./design/main.css";
import "./design/app.less";
import SvgIcon from "./components/Icon/SvgIcon.vue";

createApp(App).mount('#app')

const app = createApp(App);

app.use(router);
app.use(Antd);

app.component("svg-icon", SvgIcon);
app.mount("#app");
