<template>
    <div ref="terminal"></div>
</template>

<script>
import "xterm/dist/xterm.css";
import "xterm/dist/addons/fullscreen/fullscreen.css";
import { useRoute } from 'vue-router'

import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";
import * as fullscreen from "xterm/lib/addons/fullscreen/fullscreen";
import * as webLinks from "xterm/lib/addons/webLinks/webLinks";
import * as attach from "xterm/lib/addons/attach/attach";

  export default {
    name: "system",
    created() {
      const routes = useRoute()
      const instanceId = routes.query.instanceId
      console.log('instanceId::', instanceId)
      Terminal.applyAddon(attach);
      Terminal.applyAddon(fit);
      Terminal.applyAddon(fullscreen);
      Terminal.applyAddon(webLinks);

      const terminal = new Terminal();
      // instanceId 实例id，路由中取
      // 获取当前浏览器地址
      const currentLocation = window.location;

      // 将当前协议（http/https）替换为WebSocket协议（ws/wss）
      const wsProtocol = currentLocation.protocol === 'https:' ? 'wss:' : 'ws:';

      const ws = new WebSocket( `${wsProtocol}//${currentLocation.host}/api/v1/vm/terminal?instanceId=${instanceId}`);
      ws.onclose = function() {
        console.log("服务器关闭了连接");
      };
      terminal.open(this.$refs.terminal);
      terminal.fit();
      terminal.toggleFullScreen();
      terminal.webLinksInit();
      terminal.attach(ws);
    }
  };
  </script>
