<style scoped>
</style>

<template>
    <div id="terminal" style="height: calc(100% - 300px);"></div>
</template>

<script setup>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'
import { ref, defineProps, onMounted, onUnmounted } from 'vue'

// 接受传参
const props = defineProps({
    id: {
        type: Number,
        required: true,
    }
})

// 定义参数
const wsUri = "ws://127.0.0.1:32123/ssh/xterm/" + props.id
const xtermConfig = {
    rendererType: 'canvas',
    convertEol: true,
    fontSize: 14,
    disableStdin: false,
    cursorBlink: true,
    cursorStyle: 'underline',
    scrollback: 300,
    tabStopWidth: 4,
    theme: {
        foreground: "#FFFFFF",   //字体
        background: "#060101",  //背景色
        cursor: "help",         //设置光标
    },
}
var socket = new WebSocket(wsUri)
var xterm = new Terminal(xtermConfig)
const attachAddon = new AttachAddon(socket, false)
const fitAddon = new FitAddon()

// life
onMounted(() => {
    initXterm()
    initSocket()
})
onUnmounted(() => {
    socket.close()
})
// methods
// 初始化 xterm
function initXterm() {
    xterm.loadAddon(attachAddon)
    xterm.loadAddon(fitAddon)
    xterm.open(document.getElementById('terminal'))
    fitAddon.fit()
    xterm.focus()
    xterm.writeln('')
}
// 使 web 终端的大小适应所属容器大小
function resizeXterm() {
    fitAddon.fit()
    xterm.scrollToBottom()
}
// 初始化操作 ssh 的 socket
function initSocket() {
    socket.onmessage = msg => {
        // console.log(msg)
        // xterm.write(msg.data)
    }
    socket.onerror = err => {
        // console.log(err)
    }
    socket.onclose = err => {
        // console.log(err)
        xterm && xterm.dispose()
    }
}

window.onresize = () => {
    resizeXterm()
    console.log(xterm.cols)
}
</script>