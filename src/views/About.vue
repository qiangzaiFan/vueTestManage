<template>
  <div class="about">
    <el-card>
      <div slot="header" class="clearfix">
        <span>关于项目</span>
      </div>
      <div class="about-content">
        <el-descriptions title="项目信息" :column="2" border>
          <el-descriptions-item label="项目名称">Vue2 + Element UI 项目</el-descriptions-item>
          <el-descriptions-item label="Vue版本">2.6.14</el-descriptions-item>
          <el-descriptions-item label="Element UI版本">2.15.13</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ currentDate }}</el-descriptions-item>
          <el-descriptions-item label="技术栈">
            <el-tag size="small">Vue2</el-tag>
            <el-tag size="small" type="success">Element UI</el-tag>
            <el-tag size="small" type="warning">Vue Router</el-tag>
            <el-tag size="small" type="danger">Vuex</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="特性">
            <ul style="margin: 0; padding-left: 20px;">
              <li>响应式布局</li>
              <li>组件化开发</li>
              <li>路由管理</li>
              <li>状态管理</li>
              <li>HTTP请求封装</li>
            </ul>
          </el-descriptions-item>
        </el-descriptions>

        <div style="margin-top: 30px;">
          <h3>项目结构</h3>
          <el-tree
            :data="projectStructure"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>
                <i :class="data.icon" style="margin-right: 8px;"></i>
                {{ data.label }}
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 20px;">
      <section-title title="装备配置情况">
        <div style="display: flex; align-items: center;">
          <span style="margin-right: 12px; font-size: 14px; color: #606266;">参照的班组类型</span>
          <el-select v-model="teamType" placeholder="请选择" size="small" style="width: 200px;">
            <el-option label="输电运检班" value="输电运检班"></el-option>
            <el-option label="变电检修班" value="变电检修班"></el-option>
          </el-select>
        </div>
      </section-title>
      <div style="padding: 20px; color: #909399; font-size: 14px;">
        (此处为下方内容区域占位)
      </div>
    </el-card>
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'About',
  components: {
    SectionTitle
  },
  data() {
    return {
      teamType: '输电运检班',
      currentDate: new Date().toLocaleDateString('zh-CN'),
      projectStructure: [
        {
          id: 1,
          label: 'src',
          icon: 'el-icon-folder',
          children: [
            {
              id: 2,
              label: 'components',
              icon: 'el-icon-folder',
              children: []
            },
            {
              id: 3,
              label: 'views',
              icon: 'el-icon-folder',
              children: [
                { id: 4, label: 'Home.vue', icon: 'el-icon-document' },
                { id: 5, label: 'About.vue', icon: 'el-icon-document' }
              ]
            },
            {
              id: 6,
              label: 'router',
              icon: 'el-icon-folder',
              children: [
                { id: 7, label: 'index.js', icon: 'el-icon-document' }
              ]
            },
            {
              id: 8,
              label: 'store',
              icon: 'el-icon-folder',
              children: [
                { id: 9, label: 'index.js', icon: 'el-icon-document' }
              ]
            },
            { id: 10, label: 'App.vue', icon: 'el-icon-document' },
            { id: 11, label: 'main.js', icon: 'el-icon-document' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.about-content {
  padding: 20px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>