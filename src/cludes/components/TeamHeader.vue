<template>
  <div class="team-header">
    <div class="icon-wrapper">
      <i class="el-icon-s-custom team-icon"></i>
    </div>
    <div class="content-wrapper">
      <div class="top-row">
        <h1 class="team-name">{{ teamName }}</h1>
        <div class="tags">
          <el-tag size="small" v-for="tag in tags" :key="tag" class="custom-tag">{{ tag }}</el-tag>
        </div>
      </div>
      <div class="bottom-row">
        <span class="info-item" v-for="(item, index) in infoItems" :key="index">
          <span class="label">{{ item.label }}: </span>
          <span class="value">{{ item.value }}</span>
          <el-divider direction="vertical" v-if="index < infoItems.length - 1"></el-divider>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamHeader',
  props: {
    teamName: {
      type: String,
      default: '国网拉萨供电公输电运检一班'
    },
    tags: {
      type: Array,
      default: () => ['输电专业', '输电运检班']
    },
    infoItems: {
      type: Array,
      default: () => [
        { label: '所属地市', value: '国网拉萨供电公司' },
        { label: '所属工区', value: '输电运检工区' },
        { label: '班组归属', value: '市公司' }
      ]
    }
  }
}
</script>

<style scoped>
.team-header {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 20px;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  background-color: #409EFF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.team-icon {
  font-size: 32px;
  color: #fff;
}

.content-wrapper {
  flex: 1;
}

.top-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.team-name {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  margin-right: 15px;
}

.tags .custom-tag {
  margin-right: 8px;
  background-color: #ecf5ff;
  border-color: #d9ecff;
  color: #409EFF;
}

.bottom-row {
  font-size: 14px;
  color: #606266;
}

.info-item .label {
  color: #909399;
}

.info-item .value {
  color: #303133;
  margin-left: 4px;
}
</style>
