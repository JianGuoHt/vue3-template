<script lang="ts">
export default {
  name: 'HomeView',
};
</script>

<script setup lang="ts">
import { getMenuList } from '/@/api/system/menu';
import { getError } from '/@/api/test';

getMenuList().then((res) => {
  // console.log(res);
});

getError()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log('==err==', err);
  });
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </div>
</template>
