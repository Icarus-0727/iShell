<template>
  <n-layout position="absolute">
    <n-layout-header bordered class="header" position="absolute">
      <n-button quaternary class="btn-header" @click="openConnEditor(0)">
        <n-icon>
          <NewConnIcon />
        </n-icon>
      </n-button>
      <n-input-group class="search-header">
        <n-select v-model:value="searchOptSelect" :options="searchOpts" size="small" />
        <n-input clearable placeholder="搜索" size="small" style="width: 800px"></n-input>
        <n-button size="small" type="primary">搜索</n-button>
      </n-input-group>
    </n-layout-header>
    <n-layout-content class="content" position="absolute">
      <n-data-table
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
    </n-layout-content>
  </n-layout>
</template>

<script src="./ConnMgr"></script>
<style scoped src="./index.css"></style>