<template>
  <div class="pms-card" :class="shadowClass">
    <div class="pms-card__header" v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="pms-card__body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PmsCard',
  props: {
    header: {},
    bodyStyle: {},
    shadow: {
      type: String
    }
  },
  computed: {
    shadowClass() {
      return this.shadow ? `is-${this.shadow}-shadow` : 'is-always-shadow'
    }
  }
}
</script>

<style scoped>
.pms-card {
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}

.pms-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pms-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pms-card__header {
  padding: 15px 20px;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
}

/* Use deep selector to target element-ui icons inside slot */
.pms-card__header >>> i {
  color: #4a7cea;
  margin-right: 8px;
  font-size: 18px;
}

.pms-card__body {
  padding: 20px;
}
</style>
