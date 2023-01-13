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
        <ElForm :model="form" :rules="rules" size="large">
          <ElFormItem label="">
            <ElInput v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <ElIcon size="18px">
                  <Icon icon="ep:user" />
                </ElIcon>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem label="">
            <ElInput v-model="form.password" placeholder="请输入密码">
              <template #prefix>
                <ElIcon size="18px">
                  <Icon icon="ep:lock" />
                </ElIcon>
              </template>
            </ElInput>
          </ElFormItem>
          <ElFormItem class="" style="line-height: 14px" size="small">
            <div class="flex-1"></div>
            <ElLink href="" type="primary" :underline="false">忘记密码</ElLink>
          </ElFormItem>
          <ElFormItem>
            <ElButton
              class="w-full"
              type="primary"
              :loading="loading"
              :disabled="loading"
              @click="handleSubmit"
              >登 录</ElButton
            >
          </ElFormItem>
        </ElForm>
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
// import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserStore } from '/@/store/modules/user';

const form = reactive({
  username: '',
  password: '',
});
const rules = reactive({});
const loading = ref(false);

const router = useRouter();
const userStore = useUserStore();

function handleSubmit() {
  loading.value = true;
  // const message = ElMessage({
  //   icon: h(Icon, { icon: 'line-md:loading-loop', color: 'green' } as IconProps),
  //   message: '登陆中',
  //   duration: 0,
  // });
  userStore.login(form).then((res) => {
    // message.close();
    // ElMessage({
    //   type: 'success',
    //   message: '登陆成功，即将进入系统',
    //   duration: 1500,
    // });
    setTimeout(() => {
      loading.value = false;
      router.push('/home');
    }, 1000);
  });
}
</script>

<style lang="scss" scoped>
.login__view {
  width: 100%;
  height: 100vh;
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
