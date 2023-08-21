<template>
  <component :is="components[currentComp]" :id="nodeData.id" :properties="nodeData.properties" v-bind="$attrs">
  </component>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from "vue";

const props = defineProps({
  nodeData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

//TODO type
const currentComp = computed(() => {
  console.log('tye', props.nodeData)
  const type = props.nodeData.properties.type
  return type ? type.charAt(0).toUpperCase() + type.slice(1) : ''
})

const widgets = import.meta.glob("./components/*.vue", { import: "default" });
const components = {};
Object.keys(widgets).forEach((k) => {
  // convert the file name to a friendlier format
  const [fileName] = k.split("/").reverse();
  const [componentName] = fileName.split(".");
  // assign the async component to the friendlier name
  components[componentName] = defineAsyncComponent(widgets[k]);
});


</script>