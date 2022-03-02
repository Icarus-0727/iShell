<template>
  <NLayout id="container" has-sider>
    <NLayoutSider bordered collapsed collapse-mode="width" :collapsed-width="50">
      <NLayout embedded position="absolute">
        <NLayoutContent id="sider-menu">
          <NMenu
            collapsed
            :collapsed-width="50"
            :collapsed-icon-size="30"
            :options="menuOptions"
            default-value="terminal"
          />
        </NLayoutContent>
        <NLayoutFooter id="sider-footer" position="absolute">
          <!-- 设置 -->
          <NTooltip trigger="hover" placement="right">
            <template #trigger>
              <NButton id="btn-setting" text @click="openSettings">
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
    <NLayoutContent :content-style="`overflow: hidden; height: ${contentHeight}px;`">
      <RouterView v-slot="{ Component }">
        <transition>
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </transition>
      </RouterView>
    </NLayoutContent>
  </NLayout>
</template>

<script src="./Home.js"></script>
<style src="./Home.css"></style>
