/**
 * 默认树级结构数据
 * 包含多级嵌套的业务类别
 */
export const defaultTreeData = [
  {
    id: 1,
    name: 'I类业务',
    expanded: true,
    popoverVisible: false,
    children: [
      { 
        id: 11, 
        name: '巡视作业', 
        popoverVisible: false,
        children: [
          { id: 111, name: '日常巡视', popoverVisible: false },
          { id: 112, name: '特殊巡视', popoverVisible: false },
          { id: 113, name: '夜间巡视', popoverVisible: false }
        ]
      },
      { 
        id: 12, 
        name: '检修作业', 
        popoverVisible: false,
        children: [
          { id: 121, name: '计划检修', popoverVisible: false },
          { id: 122, name: '临时检修', popoverVisible: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'II类业务',
    expanded: true,
    popoverVisible: false,
    children: [
      { 
        id: 21, 
        name: '生产准备和设备验收', 
        popoverVisible: false,
        children: [
          { id: 211, name: '设备验收', popoverVisible: false },
          { id: 212, name: '生产准备', popoverVisible: false },
          { id: 213, name: '设备调试', popoverVisible: false }
        ]
      },
      { id: 22, name: '巡视作业', popoverVisible: false },
      { id: 23, name: '检测维护', popoverVisible: false },
      { id: 24, name: '日常运维', popoverVisible: false },
      { id: 25, name: '隐患排查治理', popoverVisible: false },
      { id: 26, name: '安全管控', popoverVisible: false }
    ]
  },
  {
    id: 3,
    name: 'III类业务',
    expanded: true,
    popoverVisible: false,
    children: [
       { id: 31, name: '生产准备和设备验收', popoverVisible: false },
       { id: 32, name: '巡视作业', popoverVisible: false },
       { id: 33, name: '检测维护', popoverVisible: false },
       { id: 34, name: '日常运维', popoverVisible: false },
       { id: 35, name: '隐患排查治理', popoverVisible: false }
    ]
  },
  {
    id: 4,
    name: 'IV类业务',
    expanded: false,
    popoverVisible: false,
    children: [
      { id: 41, name: '应急处理', popoverVisible: false },
      { id: 42, name: '事故抢修', popoverVisible: false }
    ]
  }
]

/**
 * 获取树形数据
 * @param {Array} data - 可选的自定义数据
 * @returns {Array} 树形结构数据
 */
export function getTreeData(data) {
  return data || defaultTreeData
}

/**
 * 添加节点到树形结构
 * @param {Array} treeData - 树形数据
 * @param {Object} parentNode - 父节点
 * @param {Object} newNode - 新节点
 * @returns {Array} 更新后的树形数据
 */
export function addNode(treeData, parentNode, newNode) {
  if (!parentNode) {
    // 添加到根节点
    return [...treeData, newNode]
  }
  
  // 递归查找父节点并添加子节点
  function addToNode(nodes) {
    return nodes.map(node => {
      if (node.id === parentNode.id) {
        return {
          ...node,
          children: [...(node.children || []), newNode]
        }
      }
      if (node.children) {
        return {
          ...node,
          children: addToNode(node.children)
        }
      }
      return node
    })
  }
  
  return addToNode(treeData)
}

/**
 * 从树形结构中删除节点
 * @param {Array} treeData - 树形数据
 * @param {Object} nodeToDelete - 要删除的节点
 * @returns {Array} 更新后的树形数据
 */
export function deleteNode(treeData, nodeToDelete) {
  function removeFromNode(nodes) {
    return nodes.filter(node => {
      if (node.id === nodeToDelete.id) {
        return false
      }
      if (node.children) {
        node.children = removeFromNode(node.children)
      }
      return true
    })
  }
  
  return removeFromNode(treeData)
}

/**
 * 在树形结构中查找节点
 * @param {Array} treeData - 树形数据
 * @param {Function} predicate - 查找条件函数
 * @returns {Object|null} 找到的节点或null
 */
export function findNode(treeData, predicate) {
  for (const node of treeData) {
    if (predicate(node)) {
      return node
    }
    if (node.children) {
      const found = findNode(node.children, predicate)
      if (found) return found
    }
  }
  return null
}