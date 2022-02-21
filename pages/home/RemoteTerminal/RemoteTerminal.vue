<template>
  <n-tabs
    addable
    closable
    pane-style="padding: 0; width: 100%; height: calc(100% - 35px);"
    size="small"
    style="height: 100%;"
    type="card"
    v-model:value="currentTab"
    @add="addTab"
    @close="closeTab"
  >
    <template #prefix>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button @click="openConnMgr" quaternary style="font-size: 16px;">
            <n-icon>
              <connIcon />
            </n-icon>
          </n-button>
        </template>
        连接管理器
      </n-tooltip>
    </template>
    <n-tab-pane v-for="(conn, index) in conns" :name="conn.id" :tab="(index + 1) + ' ' + conn.name">
      <template v-if="conn.isNew">
        <div style="padding: 20px;">
          <n-card title="最近使用连接">
            <n-data-table
              :bordered="false"
              :bottom-bordered="false"
              :columns="cols"
              :data="recentlyUsed"
              size="small"
              single-column
            />
          </n-card>
        </div>
        <div style="padding: 20px;">
          <n-card title="常用连接">
            <n-data-table
              :bordered="false"
              :bottom-bordered="false"
              :columns="cols"
              :data="recentlyUsed"
              size="small"
              single-column
            />
          </n-card>
        </div>
      </template>
      <template v-else>
        <n-layout style="height: 100%">
          <Terminal :id="conn.id" />
          <n-layout-footer :style="`height: ${pluginBar.bottom.height}px;`">
            <n-tabs
              type="line"
              size="small"
              style="height: 100%;"
              pane-style="height: calc(100% - 44px); padding-top: 5px;"
            >
              <n-tab-pane name="sysinfo" tab="资源信息" display-directive="show:lazy">
                <iframe
                  :src="`/pages/system-info/index.html?machine_id=${conn.id}`"
                  frameborder="1"
                  style="width: calc(100% - 7px); height: 100%;"
                ></iframe>
              </n-tab-pane>
              <n-tab-pane name="files" tab="文件浏览器" display-directive="show:lazy">
                <iframe
                  :src="`/pages/file-explorer/index.html?machine_id=${conn.id}`"
                  frameborder="1"
                  style="width: calc(100% - 7px); height: 100%;"
                ></iframe>
              </n-tab-pane>
            </n-tabs>
          </n-layout-footer>
        </n-layout>
      </template>
    </n-tab-pane>
  </n-tabs>
</template>

<script src="./RemoteTerminal.js"></script>