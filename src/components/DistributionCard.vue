<template>
  <el-card class="distribution-card" shadow="hover">
    <div slot="header" class="card-header">
      <div class="header-left">
        <i :class="icon" class="header-icon" :style="{ color: iconColor }"></i>
        <span class="header-title">{{ title }}</span>
      </div>
      <div class="header-right">
        <span class="total-count">{{ total }}</span>
        <span class="total-unit">人</span>
      </div>
    </div>
    <div class="card-content">
      <div v-for="(item, index) in data" :key="index" class="data-row">
        <div class="row-label">{{ item.label }}</div>
        <div class="row-progress">
          <el-progress 
            :percentage="item.percentage" 
            :show-text="false" 
            :stroke-width="12"
            :color="item.color || defaultColor"
          ></el-progress>
        </div>
        <div class="row-value">{{ item.value }}人</div>
        <div class="row-percentage">
          <span class="percentage-label">占比</span>
          <span class="percent-text">{{ item.percentage }}%</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DistributionCard',
  props: {
    title: {
      type: String,
      required: true
    },
    total: {
      type: [Number, String],
      default: 0
    },
    icon: {
      type: String,
      default: 'el-icon-s-data'
    },
    iconColor: {
      type: String,
      default: '#409EFF'
    },
    data: {
      type: Array,
      default: () => []
    },
    defaultColor: {
      type: String,
      default: '#409EFF'
    }
  }
}
</script>

<style scoped>
.distribution-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-icon {
  font-size: 20px;
  margin-right: 8px;
  background-color: #f0f7ff;
  padding: 8px;
  border-radius: 4px;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.header-right {
  display: flex;
  align-items: baseline;
}

.total-count {
  font-size: 20px;
  font-weight: bold;
  color: #409EFF; /* Default color, maybe customizable */
  margin-right: 4px;
}
/* Override total count color based on card context if needed via css or props, but keeping simple for now */

.total-unit {
  font-size: 14px;
  color: #909399;
}

.card-content {
  padding-top: 10px;
}

.data-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #606266;
}

.data-row:last-child {
  margin-bottom: 0;
}

.row-label {
  width: 80px;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-progress {
  flex: 1;
  margin: 0 15px;
}

.row-value {
  width: 60px;
  text-align: right;
  flex-shrink: 0;
  font-weight: bold;
  color: #303133;
}

.row-percentage {
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  font-size: 12px;
  color: #909399;
  margin-left:20px;
}

.percentage-label {
  color: #909399;
}

.percent-text {
  color: #409EFF;
  font-weight: bold;
  text-align: right;
  min-width: 30px;
}
</style>
