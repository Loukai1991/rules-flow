<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
console.log(route.params)
console.log('tigge')

router.replace({ path: "/" + route.params.path, query: route.query })
</script>

<template>
    <div />
</template>
