<template>
  <div class="login__view flex flex-col items-center">
    <div class="login__header"></div>
    <div class="login__container flex-1">
      <div class="login__top">
        <div class="login__top_logo">
          <img src="../../assets/images/logo/account-logo.png" alt="" />
        </div>
        <div class="login__top_desc text-center text-sm text-gray-400">
          Element Ui Admin 中台前端/设计解决方案
        </div>
      </div>
      <div class="login__form">
        <NForm
          ref="formRef"
          :model="form"
          :rules="rules"
          label-placement="left"
          label-width="auto"
          size="large"
        >
          <NFormItem path="username">
            <NInput v-model:value="form.username" placeholder="请输入用户名">
              <template #prefix>
                <NIcon size="18px">
                  <Icon icon="ep:user" />
                </NIcon>
              </template>
            </NInput>
          </NFormItem>
          <NFormItem path="password">
            <NInput v-model:value="form.password" placeholder="请输入密码">
              <template #prefix>
                <NIcon size="18px">
                  <Icon icon="ep:lock" />
                </NIcon>
              </template>
            </NInput>
          </NFormItem>
          <NFormItem>
            <div class="flex-1"></div>
            <NButton text tag="a" href="/" type="primary">忘记密码</NButton>
          </NFormItem>
          <NFormItem>
            <NButton
              class="w-full"
              type="primary"
              :loading="loading"
              :disabled="loading"
              @click="handleSubmit"
            >
              登 录
            </NButton>
          </NFormItem>
        </NForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'LoginPage',
});
</script>

<script lang="ts" setup>
import type { IconProps } from '@iconify/vue';
import { Icon } from '@iconify/vue';
import type { FormInst } from 'naive-ui';
// import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

import { useUserStore } from '/@/store/modules/user';

const loading = ref(false);
const message = useMessage();
const formRef = ref<FormInst | null>(null);

const form = reactive({
  username: '',
  password: '',
});
const rules = reactive({
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入用户名',
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码',
  },
});

const userStore = useUserStore();
const router = useRouter();

function handleSubmit(e: MouseEvent) {
  e.preventDefault();

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      message.loading('登陆中...');
      loading.value = true;

      try {
        const loginRes = await userStore.login(form);
        message.success('登陆成功，正在进入系统');
        router.replace('/');
      } finally {
        loading.value = false;
      }
    } else {
      message.error('请填写完整信息，并且进行验证码校验');
    }
  });
}
</script>

<style lang="scss" scoped>
.login__view {
  width: 100%;
  height: 100vh;
  background-image: url('/@/assets/images/logo/login.svg');
  background-position: 50%;
  background-size: 100%;
  .login__header {
  }

  .login__container {
    width: 384px;
    padding: 32px 12px;
    .login__top {
      padding: 32px 0;
    }
    .login__top_desc {
      font-size: 14px;
      color: #808695;
    }
  }
}
</style>
