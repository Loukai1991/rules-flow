<template>
  <component
    :is="components[currentComp]"
    :id="nodeData.id"
    :properties="nodeData.properties"
    v-bind="$attrs"
  ></component>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";

const props = defineProps({
  nodeData: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const currentComp = ref("");
if (props.nodeData.type) {
  currentComp.value =
    props.nodeData.type.charAt(0).toUpperCase() + props.nodeData.type.slice(1);
}

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