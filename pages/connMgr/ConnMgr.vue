<template>
  <NLayout position="absolute">
    <NLayoutHeader bordered class="header" position="absolute">
      <NButton quaternary class="btn-header" @click="openConnEditor(0)">
        <NIcon>
          <NewConnIcon />
        </NIcon>
      </NButton>
      <NInputGroup class="search-header">
        <NSelect v-model:value="searchOptSelect" :options="searchOpts" size="small" />
        <NInput clearable placeholder="搜索" size="small" style="width: 800px"></NInput>
        <NButton size="small" type="primary">搜索</NButton>
      </NInputGroup>
    </NLayoutHeader>
    <NLayoutContent class="content" position="absolute">
      <NDialogProvider>
        <NDataTable
          :bordered="false"
          :bottom-bordered="false"
          :columns="cols"
          :data="machines"
          :loading="loading"
          :max-height="tableMaxHeigth - 70"
          size="small"
          single-column
          row-class-name="table-row"
        />
      </NDialogProvider>
    </NLayoutContent>
  </NLayout>
</template>

<script src="./ConnMgr"></script>
<style scoped src="./index.css"></style>