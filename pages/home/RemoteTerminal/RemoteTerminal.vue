<template>
  <NTabs
    addable
    closable
    pane-style="padding: 0;"
    size="small"
    style="height: 100%;"
    type="card"
    v-model:value="currentTab"
    @add="addTab"
    @close="closeTab"
    n
  >
    <NTabPane
      v-for="(conn, index) in conns"
      :name="conn.id"
      :tab="`${index + 1} ${conn.name}`"
      display-directive="show"
    >
      <div style="padding: 20px;" v-if="conn.isNew">
        <NCard>
          <template #header>
            最近使用连接
            <div style="float: right">
              <NButton type="success" @click="openConnMgr">连接管理器</NButton>
            </div>
          </template>
          <NDataTable
            :bordered="false"
            :bottom-bordered="false"
            :columns="cols"
            :data="recentlyUsed"
            size="small"
            single-column
          />
        </NCard>
      </div>
      <template v-else>
        <NLayout style="height: 100%">
          <Terminal :id="conn.id" />
          <NLayoutFooter :style="`height: ${pluginBar.bottom.height}px;`">
            <NTabs
              type="line"
              size="small"
              style="height: 100%;"
              pane-style="height: calc(100% - 200px); padding-top: 5px;"
            >
              <NTabPane name="sysinfo" tab="资源信息" display-directive="show">
                <iframe
                  :src="`http://localhost:32123/plugin/sysinfo/index.html?machine_id=${conn.id}`"
                  frameborder="1"
                  style="width: calc(100% - 5px); height: 100%;"
                ></iframe>
              </NTabPane>
            </NTabs>
          </NLayoutFooter>
        </NLayout>
      </template>
    </NTabPane>
  </NTabs>
</template>

<script src="./RemoteTerminal"></script>