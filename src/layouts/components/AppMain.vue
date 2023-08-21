<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useTagsViewStore } from "@/store/modules/tags-view"

const route = useRoute()
const tagsViewStore = useTagsViewStore()

const key = computed(() => {
  // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
  return route.fullPath
})
console.log('what router', key, route)
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="el-fade-in" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="key" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
