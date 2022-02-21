<template>
  <NLayout id="container" has-sider>
    <NLayoutSider
      bordered
      collapsed
      collapse-mode="width"
      :collapsed-width="50"
    >
      <NLayout embedded position="absolute">
        <NLayoutContent>
          <NMenu
            collapsed
            :collapsed-width="50"
            :collapsed-icon-size="30"
            :options="menuOptions"
            default-value="terminal"
            style="background-color: #fafafc;"
          />
        </NLayoutContent>
        <NLayoutFooter position="absolute" style="bottom: 0px">
          <!-- 设置 -->
          <NTooltip trigger="hover" placement="right">
            <template #trigger>
              <NButton text style="font-size: 30px; padding: 5px 10px;" @click="openSettings">
                <NIcon>
                  <SettingIcon />
                </NIcon>
              </NButton>
            </template>
            设置
          </NTooltip>
        </NLayoutFooter>
      </NLayout>
    </NLayoutSider>
    <NLayoutContent content-style="overflow: hidden;">
      <router-view></router-view>
    </NLayoutContent>
  </NLayout>
</template>

<script src="./index.js"></script>
<style src="./index.css"></style>
