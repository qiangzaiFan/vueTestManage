<template>
  <el-card class="business-category-card" :body-style="{ padding: '0' }">
    <div slot="header" class="clearfix">
      <SectionTitle title="业务类别" />
    </div>

    <div class="category-tree">
      <!-- 递归树节点 -->
      <tree-node
        v-for="(node, index) in list"
        :key="node.id"
        :node="node"
        :siblings="list"
        :index="index"
        :level="1"
        @node-click="handleNodeClick"
        @add-item="handleAddItem"
        @edit-item="handleEditItem"
        @delete-item="handleDeleteItem"
        @move-up="handleMoveUp"
        @move-down="handleMoveDown"
      />
      
      <!-- 添加一级类别按钮 -->
      <div class="add-root-btn-container">
        <el-button type="text" icon="el-icon-plus" @click="addRootCategory">添加一级类别</el-button>
      </div>
    </div>

    <!-- 编辑/添加对话框 -->
    <el-dialog 
      :title="dialogTitle" 
      :visible.sync="dialogVisible" 
      width="400px"
      :close-on-click-modal="false"
    >
      <el-form :model="currentForm" ref="form" @submit.native.prevent>
        <el-form-item label="名称">
          <el-input v-model="currentForm.name" @keyup.enter.native="saveItem"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import SectionTitle from './SectionTitle.vue'
import { defaultTreeData } from '@/utils/treeData.js'

// 递归树节点组件
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
    },
    handleMoveUp() {
      this.$emit('move-up', this.index, this.siblings)
    },
    handleMoveDown() {
      this.$emit('move-down', this.index, this.siblings)
    }
  },
  template: `
    <div class="tree-node">
      <!-- 当前节点 -->
      <div 
        class="node-content"
        :class="['level-' + level, { 'is-active': $parent.activeId === node.id }]"
        @click="handleNodeClick"
        @mouseenter="$parent.hoverId = node.id"
        @mouseleave="$parent.hoverId = null"
      >
        <div class="node-left" @click.stop="toggleExpand" v-if="node.children && node.children.length > 0">
          <i 
            :class="node.expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'" 
            class="expand-icon"
          ></i>
          <span class="node-label">{{ node.name }}</span>
        </div>
        <div class="node-left" v-else>
          <span class="node-label">{{ node.name }}</span>
        </div>
        <div class="node-right">
          <el-popover
            placement="bottom"
            width="100"
            trigger="click"
            popper-class="action-popover"
            v-model="node.popoverVisible">
            <div class="action-menu">
              <div class="menu-item" @click="handleAddItem" v-if="level < 3">添加子项</div>
              <div class="menu-item" @click="handleEditItem">编辑</div>
              <div class="menu-item" @click="handleDeleteItem">删除</div>
              <div class="menu-item" @click="handleMoveUp">上移</div>
              <div class="menu-item" @click="handleMoveDown">下移</div>
            </div>
            <el-button 
              slot="reference" 
              type="text" 
              :icon="level === 1 ? 'el-icon-circle-plus-outline' : 'el-icon-s-operation'" 
              class="action-btn"
              @click.stop
            ></el-button>
          </el-popover>
        </div>
      </div>

      <!-- 子节点 -->
      <div v-show="node.expanded" class="children-container" v-if="node.children && node.children.length > 0">
        <tree-node
          v-for="(child, childIndex) in node.children"
          :key="child.id"
          :node="child"
          :siblings="node.children"
          :index="childIndex"
          :level="level + 1"
          @node-click="$emit('node-click', $event)"
          @add-item="$emit('add-item', $event)"
          @edit-item="$emit('edit-item', $event)"
          @delete-item="$emit('delete-item', $event)"
          @move-up="$emit('move-up', $event)"
          @move-down="$emit('move-down', $event)"
        />
      </div>
    </div>
  `
}

export default {
  name: 'BusinessCategory',
  components: {
    SectionTitle,
    TreeNode
  },
  data() {
    return {
      list: defaultTreeData,
      hoverId: null,
      activeId: null,
      dialogVisible: false,
      dialogTitle: '',
      currentForm: {
        name: ''
      },
      editingNode: null,
      parentList: null,
      editingIndex: -1,
      isEditMode: false,
      parentCategory: null
    }
  },
  methods: {
    toggleExpand(category) {
      category.expanded = !category.expanded
    },
    handleNodeClick(node) {
      this.activeId = node.id
    },
    addRootCategory() {
      this.isEditMode = false
      this.parentCategory = null
      this.currentForm.name = ''
      this.dialogTitle = '添加一级类别'
      this.dialogVisible = true
    },
    handleAddItem(node) {
      node.popoverVisible = false
      this.isEditMode = false
      this.parentCategory = node
      this.currentForm.name = ''
      this.dialogTitle = '添加子项'
      this.dialogVisible = true
    },
    handleEditItem(node, index, list) {
      node.popoverVisible = false
      this.isEditMode = true
      this.editingNode = node
      this.currentForm.name = node.name
      this.dialogTitle = '编辑'
      this.dialogVisible = true
    },
    handleDeleteItem(node, index, list) {
      node.popoverVisible = false
      this.$confirm('确认删除该项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        list.splice(index, 1)
      }).catch(() => {})
    },
    handleMoveUp(index, list) {
      if (list[index]) list[index].popoverVisible = false
      
      if (index > 0) {
        const item = list[index]
        list.splice(index, 1)
        list.splice(index - 1, 0, item)
      } else {
        this.$message.warning('已经是第一项了')
      }
    },
    handleMoveDown(index, list) {
      if (list[index]) list[index].popoverVisible = false

      if (index < list.length - 1) {
        const item = list[index]
        list.splice(index, 1)
        list.splice(index + 1, 0, item)
      } else {
        this.$message.warning('已经是最后一项了')
      }
    },
    saveItem() {
      if (!this.currentForm.name.trim()) {
        this.$message.warning('`请输入名称')
        return
      }

      if (this.isEditMode) {
        this.editingNode.name = this.currentForm.name
      } else {
        const newItem = {
          id: Date.now(),
          name: this.currentForm.name,
          popoverVisible: false,
          expanded: true,
          children: []
        }
        
        if (this.parentCategory) {
          if (!this.parentCategory.children) {
            this.$set(this.parentCategory, 'children', [])
          }
          this.parentCategory.children.push(newItem)
          this.parentCategory.expanded = true
        } else {
          this.list.push(newItem)
        }
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
.business-category-card {
  width: 100%;
  min-height: 400px;
}

.category-tree {
  padding-bottom: 20px;
}

.tree-node {
  /* border-bottom: 1px solid #EBEEF5; */
}

.node-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.node-content:hover {
  background-color: #F5F7FA;
}

.node-content.is-active {
  background-color: #E6F1FC;
}

.level-1 {
  font-weight: 500;
  color: #303133;
}

.level-2 {
  padding-left: 45px;
  color: #606266;
}

.level-3 {
  padding-left: 70px;
  color: #606266;
  font-size: 13px;
}

.level-4 {
  padding-left: 95px;
  color: #909399;
  font-size: 13px;
}

.level-5 {
  padding-left: 120px;
  color: #909399;
  font-size: 13px;
}

.level-6 {
  padding-left: 145px;
  color: #909399;
  font-size: 12px;
}

.level-7 {
  padding-left: 170px;
  color: #909399;
  font-size: 12px;
}

.level-8 {
  padding-left: 195px;
  color: #909399;
  font-size: 12px;
}

.level-9 {
  padding-left: 220px;
  color: #909399;
  font-size: 12px;
}

.level-10 {
  padding-left: 245px;
  color: #909399;
  font-size: 12px;
}

.node-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.expand-icon {
  margin-right: 8px;
  font-size: 12px;
  color: #C0C4CC;
  width: 12px;
}

.node-right {
  display: flex;
  align-items: center;
}

.action-btn {
  font-size: 16px;
  color: #409EFF;
  margin-left: 10px;
  padding: 0;
}

.action-menu {
  text-align: center;
}

.menu-item {
  padding: 8px 0;
  cursor: pointer;
  color: #606266;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #F5F7FA;
  color: #409EFF;
}

.menu-item + .menu-item {
  border-top: 1px solid #EBEEF5;
}

.add-root-btn-container {
  padding: 10px 20px;
  border-top: 1px solid #EBEEF5;
}
</style>
