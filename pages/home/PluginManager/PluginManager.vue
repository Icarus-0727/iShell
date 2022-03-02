<template>
  <div id="container">
    <NPageHeader subtitle="重启程序后修改的内容生效">
      <template #title>插件管理</template>
      <template #extra>
        <NUpload
          name="plugin_file"
          action="http://localhost:32123/_plugin/file"
          accept=".zip"
          :show-file-list="false"
        >
          <NButton type="success" @click="installPlugin" :loading="true">安装插件</NButton>
        </NUpload>
      </template>
      <template #footer>
        <a href>官方插件社区</a>
      </template>
      <NGrid cols="1 600:2 900:3 1200:4 1500:5" x-gap="12" y-gap="12">
        <!-- 遍历 plugins -->
        <NGi v-for="plugin in plugins">
          <!-- plugin 显示面板 -->
          <NCard hoverable size="small">
            <template #header>{{ plugin.name }}</template>
            <template #action>
              <NSwitch v-model:value="plugin.enable">
                <template #checked>启用</template>
                <template #unchecked>禁用</template>
              </NSwitch>
              <div style="float: right;">
                <NButton type="error" size="small">卸载</NButton>
              </div>
            </template>
            <p>{{ plugin.description }}</p>
          </NCard>
        </NGi>
      </NGrid>
    </NPageHeader>
  </div>
</template>
<script src="./PluginManager.js"></script>
<style scoped src="./PluginManager.css"></style>