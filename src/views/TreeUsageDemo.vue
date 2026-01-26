<template>
  <div class="tree-usage-demo">
    <h2>树级结构使用示例</h2>
    
    <!-- 基础使用 -->
    <el-card class="demo-card">
      <div slot="header">基础树形组件</div>
      <BusinessCategory />
    </el-card>

    <!-- 自定义数据使用 -->
    <el-card class="demo-card">
      <div slot="header">自定义数据结构</div>
      <div class="custom-tree-container">
        <tree-node
          v-for="(node, index) in customData"
          :key="node.id"
          :node="node"
          :siblings="customData"
          :index="index"
          :level="1"
          @node-click="handleNodeClick"
          @add-item="handleAddItem"
          @edit-item="handleEditItem"
          @delete-item="handleDeleteItem"
        />
      </div>
    </el-card>

    <!-- 数据结构展示 -->
    <el-card class="demo-card">
      <div slot="header">数据结构预览</div>
      <pre class="data-preview">{{ JSON.stringify(customData, null, 2) }}</pre>
    </el-card>
  </div>
</template>

<script>
import BusinessCategory from '@/components/BusinessCategory.vue'
import { defaultTreeData, addNode, deleteNode, findNode } from '@/utils/treeData.js'

// 导入TreeNode组件
const TreeNode = {
  name: 'TreeNode',
  props: {
    node: { type: Object, required: true },
    siblings: { type: Array, required: true },
    index: { type: Number, required: true },
    level: { type: Number, required: true }
  },
  methods: {
    toggleExpand() {
      this.$set(this.node, 'expanded', !this.node.expanded)
    },
    handleNodeClick() {
      this.$emit('node-click', this.node)
    },
    handleAddItem() {
      this.$emit('add-item', this.node)
    },
    handleEditItem() {
      this.$emit('edit-item', this.node, this.index, this.siblings)
    },
    handleDeleteItem() {
      this.$emit('delete-item', this.node, this.index, this.siblings)
    }
  },
  template: `
    <div class="tree-node">
      <div class="node-content" :class="'level-' + level" @click="handleNodeClick">
        <span class="expand-icon" @click.stop="toggleExpand">
          <i :class="node.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        </span>
        <span class="node-name">{{ node.name }}</span>
        <span class="node-actions">
          <el-button type="text" size="mini" @click.stop="handleAddItem">添加</el-button>
          <el-button type="text" size="mini" @click.stop="handleEditItem">编辑</el-button>
          <el-button type="text" size="mini" @click.stop="handleDeleteItem">删除</el-button>
        </span>
      </div>
      <div v-if="node.expanded && node.children" class="node-children">
        <tree-node
          v-for="(child, idx) in node.children"
          :key="child.id"
          :node="child"
          :siblings="node.children"
          :index="idx"
          :level="level + 1"
          @node-click="$emit('node-click', $event)"
          @add-item="$emit('add-item', $event)"
          @edit-item="$emit('edit-item', $event)"
          @delete-item="$emit('delete-item', $event)"
        />
      </div>
    </div>
  `
}

export default {
  name: 'TreeUsageDemo',
  components: {
    BusinessCategory,
    TreeNode
  },
  data() {
    return {
      // 使用默认树形数据
      customData: JSON.parse(JSON.stringify(defaultTreeData))
    }
  },
  methods: {
    handleNodeClick(node) {
      console.log('点击节点:', node)
      this.$message.success(`点击了节点: ${node.name}`)
    },
    
    handleAddItem(node) {
      const newNode = {
        id: Date.now(),
        name: `新节点${Date.now()}`,
        popoverVisible: false,
        children: []
      }
      
      if (!node.children) {
        this.$set(node, 'children', [])
      }
      node.children.push(newNode)
      node.expanded = true
      
      this.$message.success(`在 "${node.name}" 下添加了新节点`)
    },
    
    handleEditItem(node, index, siblings) {
      const newName = prompt('请输入新的名称:', node.name)
      if (newName && newName.trim()) {
        node.name = newName.trim()
        this.$message.success('节点名称已更新')
      }
    },
    
    handleDeleteItem(node, index, siblings) {
      this.$confirm(`确定要删除 "${node.name}" 吗？`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        siblings.splice(index, 1)
        this.$message.success('节点已删除')
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.tree-usage-demo {
  padding: 20px;
}

.demo-card {
  margin-bottom: 20px;
}

.custom-tree-container {
  padding: 10px;
}

.tree-node {
  user-select: none;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.node-content:hover {
  background-color: #f5f7fa;
}

.node-content.level-1 {
  font-weight: 500;
  color: #303133;
}

.node-content.level-2 {
  padding-left: 45px;
  color: #606266;
}

.node-content.level-3 {
  padding-left: 70px;
  color: #606266;
  font-size: 13px;
}

.expand-icon {
  margin-right: 8px;
  color: #909399;
}

.node-name {
  flex: 1;
}

.node-actions {
  opacity: 0;
  transition: opacity 0.2s;
}

.node-content:hover .node-actions {
  opacity: 1;
}

.node-children {
  margin-left: 20px;
}

.data-preview {
  background-color: #f5f7fa;
  padding: 15px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1.5;
  overflow-x: auto;
  max-height: 400px;
  overflow-y: auto;
}
</style>