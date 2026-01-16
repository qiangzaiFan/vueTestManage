<template>
  <div class="select-input-demo">
    <h2>El-Select 可输入可选择示例</h2>
    <el-card class="box-card">
      <div slot="header">
        <span>功能演示</span>
      </div>
      <div class="demo-block">
        <p class="description">
          使用 <code>filterable</code> 和 <code>allow-create</code> 属性即可实现既可下拉选择，又可自定义输入的功能。
        </p>
        <div class="control-wrapper">
          <span class="label">技能标签：</span>
          <el-select
            v-model="value"
            filterable
            allow-create
            default-first-option
            placeholder="请选择或输入新标签"
            @change="handleChange"
            style="width: 300px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="result-display">
          当前选中/输入的值: <span class="highlight">{{ value }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'SelectInputDemo',
  data() {
    return {
      options: [
        { value: 'Vue.js', label: 'Vue.js' },
        { value: 'Element UI', label: 'Element UI' },
        { value: 'React', label: 'React' },
        { value: 'Angular', label: 'Angular' }
      ],
      value: ''
    }
  },
  methods: {
    handleChange(val) {
      console.log('Current value:', val);
      // If you want to add the new value to the options list persistently (in frontend session):
      const exists = this.options.some(item => item.value === val);
      if (!exists && val) {
        this.options.push({
          value: val,
          label: val
        });
      }
    }
  }
}
</script>

<style scoped>
.select-input-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.demo-block {
  padding: 20px 0;
}
.description {
  color: #606266;
  margin-bottom: 20px;
  line-height: 1.5;
}
code {
  background-color: #f9fafc;
  padding: 2px 4px;
  border-radius: 4px;
  color: #409EFF;
}
.control-wrapper {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.label {
  margin-right: 15px;
  font-weight: bold;
  color: #303133;
}
.result-display {
  padding: 15px;
  background-color: #ecf5ff;
  border-radius: 4px;
  color: #606266;
}
.highlight {
  color: #409EFF;
  font-weight: bold;
  margin-left: 8px;
}
</style>
