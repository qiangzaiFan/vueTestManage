<template>
  <div class="business-category-demo">
    <div class="container">
      <BusinessCategory />
    </div>
  </div>
</template>

<script>
import BusinessCategory from '@/components/BusinessCategory.vue'

export default {
  name: 'BusinessCategoryDemo',
  components: {
    BusinessCategory
  }
}
</script>

<style scoped>
.business-category-demo {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
