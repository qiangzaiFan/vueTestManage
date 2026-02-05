<template>
  <el-card class="business-category-card" :body-style="{ padding: '0' }">
    <div slot="header" class="clearfix">
      <SectionTitle title="业务类别" />
    </div>

    <div class="category-tree">
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :highlight-current="true"
        class="custom-tree"
      >
        <div class="custom-tree-node" slot-scope="{ node, data }" :class="'level-' + node.level">
          <div class="node-content-wrapper">
            <span class="node-label">{{ node.label }}</span>
          </div>
          <div class="node-actions" @click.stop>
            <el-popover
              placement="bottom"
              width="100"
              trigger="click"
              popper-class="action-popover"
              v-model="data.popoverVisible">
              <div class="action-menu">
                <div class="menu-item" @click="handleAddItem(data)" v-if="node.level < 3">添加子项</div>
                <div class="menu-item" @click="handleEditItem(data)">编辑</div>
                <div class="menu-item" @click="handleDeleteItem(node, data)">删除</div>
                <div class="menu-item" @click="handleMoveUp(node, data)">上移</div>
                <div class="menu-item" @click="handleMoveDown(node, data)">下移</div>
              </div>
              <el-button 
                slot="reference" 
                type="text" 
                :icon="node.level === 1 ? 'el-icon-circle-plus-outline' : 'el-icon-s-operation'" 
                class="action-btn"
              ></el-button>
            </el-popover>
          </div>
        </div>
      </el-tree>
      
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

export default {
  name: 'BusinessCategory',
  components: {
    SectionTitle
  },
  data() {
    return {
      treeData: defaultTreeData,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      activeId: null,
      dialogVisible: false,
      dialogTitle: '',
      currentForm: {
        name: ''
      },
      editingNodeData: null,
      isEditMode: false,
      parentCategoryData: null
    }
  },
  methods: {
    handleNodeClick(data) {
      this.activeId = data.id
      this.$emit('node-click', data)
    },
    addRootCategory() {
      this.isEditMode = false
      this.parentCategoryData = null
      this.currentForm.name = ''
      this.dialogTitle = '添加一级类别'
      this.dialogVisible = true
    },
    handleAddItem(data) {
      data.popoverVisible = false
      this.isEditMode = false
      this.parentCategoryData = data
      this.currentForm.name = ''
      this.dialogTitle = '添加子项'
      this.dialogVisible = true
    },
    handleEditItem(data) {
      data.popoverVisible = false
      this.isEditMode = true
      this.editingNodeData = data
      this.currentForm.name = data.name
      this.dialogTitle = '编辑'
      this.dialogVisible = true
    },
    handleDeleteItem(node, data) {
      data.popoverVisible = false
      this.$confirm('确认删除该项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent;
        const children = parent.level === 0 ? this.treeData : parent.data.children;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }).catch(() => {})
    },
    handleMoveUp(node, data) {
      data.popoverVisible = false
      const parent = node.parent;
      const children = parent.level === 0 ? this.treeData : parent.data.children;
      const index = children.findIndex(d => d.id === data.id);
      
      if (index > 0) {
        const item = children[index]
        const prevItem = children[index - 1]
        children.splice(index - 1, 2, item, prevItem)
      } else {
        this.$message.warning('已经是第一项了')
      }
    },
    handleMoveDown(node, data) {
      data.popoverVisible = false
      const parent = node.parent;
      const children = parent.level === 0 ? this.treeData : parent.data.children;
      const index = children.findIndex(d => d.id === data.id);

      if (index < children.length - 1) {
        const item = children[index]
        const nextItem = children[index + 1]
        children.splice(index, 2, nextItem, item)
      } else {
        this.$message.warning('已经是最后一项了')
      }
    },
    saveItem() {
      if (!this.currentForm.name.trim()) {
        this.$message.warning('请输入名称')
        return
      }

      if (this.isEditMode) {
        this.editingNodeData.name = this.currentForm.name
      } else {
        const newItem = {
          id: Date.now(),
          name: this.currentForm.name,
          popoverVisible: false,
          children: []
        }
        
        if (this.parentCategoryData) {
          if (!this.parentCategoryData.children) {
            this.$set(this.parentCategoryData, 'children', [])
          }
          this.parentCategoryData.children.push(newItem)
          // el-tree handles expansion, but we can ensure it's expanded if we had access to the node. 
          // Since we are modifying data, el-tree should update. 
          // If we want to expand the parent node programmatically:
          this.$nextTick(() => {
             // Find the node and expand it if needed, or rely on default behavior.
             // Usually adding a child doesn't auto-expand unless we use store.
             if (this.$refs.tree) {
                // If we want to ensure expansion:
                // this.$refs.tree.store.nodesMap[this.parentCategoryData.id].expanded = true;
             }
          })
        } else {
          this.treeData.push(newItem)
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

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
}

.node-content-wrapper {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Custom styles based on levels to mimic original look */
.level-1 .node-label {
  font-weight: 500;
  color: #303133;
  font-size: 14px;
}

.level-2 .node-label {
  color: #606266;
  font-size: 14px;
}

.level-3 .node-label,
.level-4 .node-label,
.level-5 .node-label {
  color: #606266;
  font-size: 13px;
}

/* Action Button Styles */
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

/* Customize el-tree styles */
::v-deep .el-tree-node__content {
  height: 40px; /* Increase height for better touch/click targets */
}

::v-deep .el-tree-node__content:hover {
  background-color: #F5F7FA;
}

::v-deep .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #E6F1FC;
}
</style>
