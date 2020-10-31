<template>
<div :style="{'width': `${width}px`, 'height': `${height}px`}">
</div>
</template>

<script>
export default {
  name: 'Space',
  props: {
    height: {
      type: String,
      default: '10'
    },
    width: {
      type: String,
      default: '10'
    }
  },
};
</script>