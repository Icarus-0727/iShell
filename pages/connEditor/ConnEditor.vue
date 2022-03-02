<template>
  <n-layout position="absolute" :native-scrollbar="false">
    <n-layout-content
      position="absolute"
      :native-scrollbar="false"
      style="bottom: 30px"
      content-style="padding: 0 10px"
    >
      <n-form label-align="right" label-placement="left" :label-width="70" size="small">
        <n-divider title-placement="left" style="margin-top: 0; font-size: 20px;">常规</n-divider>
        <div style="padding: 0 50px 0 20px;">
          <n-form-item label="名称" style="max-width: 400px;">
            <n-input v-model:value="machine.name" placeholder="默认：主机@用户名" />
          </n-form-item>
          <n-form-item label="主机" style="max-width: 400px;">
            <n-input v-model:value="machine.host" placeholder="例如：1.1.1.1" />
          </n-form-item>
          <n-form-item label="端口" style="max-width: 200px;">
            <n-input-number
              v-model:value="machine.port"
              :min="0"
              :max="65535"
              :show-button="false"
              placeholder="整数：0-65535"
            />
          </n-form-item>
          <n-form-item label="备注" style="max-width: 400px;">
            <n-input
              v-model:value="machine.description"
              rows="2"
              :autosize="{ minRows: 2, minRows: 3 }"
              maxlength="100"
              placeholder
              show-count
              type="textarea"
            />
          </n-form-item>
        </div>
        <n-divider title-placement="left" style="margin-top: 0px; font-size: 20px;">认证</n-divider>
        <div style="padding: 0 50px 0 20px;">
          <n-form-item label="认证方式" style="max-width: 200px;">
            <n-select v-model:value="machine.auth_type" :options="authTypes" />
          </n-form-item>
          <n-form-item label="用户名" style="max-width: 400px;">
            <n-input v-model:value="machine.user" placeholder="例如：1.1.1.1" />
          </n-form-item>
          <n-form-item label="密码" style="max-width: 400px;">
            <n-input
              type="password"
              show-password-on="mousedown"
              :disabled="machine.auth_type != 'password'"
              v-model:value="machine.password"
              placeholder
            />
          </n-form-item>
          <n-form-item label="私钥" style="max-width: 400px;">
            <n-input
              :disabled="machine.auth_type != 'key'"
              v-model:value="machine.key"
              placeholder="请输入私钥文件路径"
            ></n-input>
          </n-form-item>
        </div>
      </n-form>
    </n-layout-content>
    <n-layout-footer bordered position="absolute" style="height: 38px; padding: 5px 0;">
      <div style="position: absolute; right: 5px; background: #f0f0f0;">
        <n-button type="primary" size="small" @click="confirmBtn">确定</n-button>
        <n-button type="error" size="small" @click="cancelBtn" style="margin-left: 5px">取消</n-button>
      </div>
    </n-layout-footer>
  </n-layout>
</template>
<script src="./ConnEditor.js"></script>
<style scoped>
* {
  font-size: 14px;
}
</style>