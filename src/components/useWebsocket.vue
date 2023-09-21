<template>
    <div ref="terminal"></div>
</template>
  
<script>
import "xterm/dist/xterm.css";
import "xterm/dist/addons/fullscreen/fullscreen.css";

import { Terminal } from "xterm";
import * as fit from "xterm/lib/addons/fit/fit";
import * as fullscreen from "xterm/lib/addons/fullscreen/fullscreen";
import * as webLinks from "xterm/lib/addons/webLinks/webLinks";
import * as attach from "xterm/lib/addons/attach/attach";
  
  export default {
    name: "system",
    created() {
      Terminal.applyAddon(attach);
      Terminal.applyAddon(fit);
      Terminal.applyAddon(fullscreen);
      Terminal.applyAddon(webLinks);
  
      const terminal = new Terminal();
      // instanceId 实例id，路由中取
      // wss://computeshare.hamster.newtouch.com/v1/vm/terminal?instanceId=${instanceId}
      const ws = new WebSocket("ws://172.16.9.9:18000/v1/vm/1/terminal?container=3691a0f7e864&workdir=/root");
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