# 树级结构使用说明

## 概述

我们为您提供了完整的树级结构组件和数据管理工具，支持多级嵌套、动态操作和灵活配置。

## 文件结构

```
src/
├── components/
│   └── BusinessCategory.vue      # 主要树形组件
├── utils/
│   └── treeData.js               # 树形数据管理工具
└── views/
    ├── BusinessCategoryDemo.vue  # 基础演示
    └── TreeUsageDemo.vue         # 使用示例
```

## 使用方法

### 1. 基础使用

直接使用 `BusinessCategory` 组件：

```vue
<template>
  <BusinessCategory />
</template>

<script>
import BusinessCategory from '@/components/BusinessCategory.vue'

export default {
  components: {
    BusinessCategory
  }
}
</script>
```

### 2. 自定义数据

从 `treeData.js` 导入默认数据或创建自定义数据：

```javascript
import { defaultTreeData, getTreeData, addNode, deleteNode, findNode } from '@/utils/treeData.js'

export default {
  data() {
    return {
      treeData: defaultTreeData,  // 使用默认数据
      // 或
      customData: [
        {
          id: 1,
          name: '根节点',
          expanded: true,
          popoverVisible: false,
          children: [
            { id: 11, name: '子节点1', popoverVisible: false },
            { id: 12, name: '子节点2', popoverVisible: false }
          ]
        }
      ]
    }
  }
}
```

### 3. 数据结构说明

每个节点必须包含以下属性：

```javascript
{
  id: 1,                    // 唯一标识符
  name: '节点名称',          // 显示名称
  expanded: true,           // 是否展开
  popoverVisible: false,    // 弹出菜单是否显示
  children: [...]           // 子节点数组（可选）
}
```

### 4. 数据操作方法

```javascript
// 添加节点
const newNode = { id: Date.now(), name: '新节点', popoverVisible: false }
this.treeData = addNode(this.treeData, parentNode, newNode)

// 删除节点
this.treeData = deleteNode(this.treeData, nodeToDelete)

// 查找节点
const foundNode = findNode(this.treeData, node => node.id === targetId)
```

### 5. 事件处理

组件支持以下事件：

- `@node-click` - 节点点击
- `@add-item` - 添加节点
- `@edit-item` - 编辑节点
- `@delete-item` - 删除节点
- `@move-up` - 节点上移
- `@move-down` - 节点下移

```vue
<BusinessCategory
  @node-click="handleNodeClick"
  @add-item="handleAddItem"
  @edit-item="handleEditItem"
  @delete-item="handleDeleteItem"
/>
```

## 访问演示页面

- 基础演示：`http://localhost:8080/business-category`
- 使用示例：`http://localhost:8080/tree-usage`

## 特性说明

1. **递归组件**：支持无限层级嵌套
2. **级别样式**：根据层级自动应用不同样式
3. **动态操作**：支持添加、编辑、删除、移动节点
4. **响应式数据**：使用 Vue.set 确保数据响应性
5. **弹出菜单**：右键或点击操作按钮显示操作菜单

## 自定义样式

组件支持级别样式自定义：

```css
.level-1 { font-weight: 500; color: #303133; }
.level-2 { padding-left: 45px; color: #606266; }
.level-3 { padding-left: 70px; color: #606266; font-size: 13px; }
/* ... 支持到 level-10 */
```

## 注意事项

1. 确保每个节点都有唯一的 `id`
2. 使用 `$set` 方法确保嵌套属性的响应性
3. 操作完成后关闭弹出菜单以提升用户体验
4. 根据实际需求调整样式和交互逻辑