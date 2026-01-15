<template>
  <div class="section-title">
    <div class="left-wrapper">
      <div class="blue-bar"></div>
      <span class="title-text">{{ title }}</span>
    </div>
    <div class="right-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style scoped>
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #EBEEF5;
  margin-bottom: 16px;
}

.left-wrapper {
  display: flex;
  align-items: center;
}

.blue-bar {
  width: 4px;
  height: 18px;
  background-color: #409EFF; /* Element UI Primary Color */
  border-radius: 2px;
  margin-right: 8px;
}

.title-text {
  font-size: 16px;
  font-weight: 600;
  color: #303133; /* Element UI Primary Text Color */
  line-height: 1;
}

.right-wrapper {
  display: flex;
  align-items: center;
}
</style>