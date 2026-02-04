<template>
  <div class="table-example">
    <el-card>
      <div slot="header" class="clearfix">
        <span>表格示例</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addUser">添加用户</el-button>
      </div>
      
      <div class="table-controls">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input
              v-model="searchText"
              placeholder="搜索用户名"
              prefix-icon="el-icon-search"
              clearable>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchUsers">搜索</el-button>
          </el-col>
        </el-row>
      </div>

      <el-table
        :data="filteredTableData"
        style="width: 100%"
        stripe
        border
        v-loading="loading">
        <el-table-column
          prop="id"
          label="ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          width="120">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.role === '管理员' ? 'danger' : 'primary'"
              size="small">
              {{ scope.row.role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="启用"
              inactive-text="禁用">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editUser(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalUsers">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TableExample',
  data() {
    return {
      loading: false,
      searchText: '',
      currentPage: 1,
      pageSize: 10,
      totalUsers: 0,
      tableData: [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          role: '管理员',
          status: true,
          createTime: '2023-01-01 10:00:00'
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
          role: '用户',
          status: true,
        },
        {
          id: 3,
          name: '王五',
          email: 'wangwu@example.com',
          role: '用户',
          status: false,
          createTime: '2023-01-03 12:00:00'
        },
        {
          id: 4,
          name: '赵六',
          email: 'zhaoliu@example.com',
          role: '管理员',
          status: true,
          createTime: '2023-01-04 13:00:00'
        }
      ]
    }
  },
  computed: {
    filteredTableData() {
      if (!this.searchText) {
        return this.tableData
      }
      return this.tableData.filter(user => 
        user.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  },
  mounted() {
    this.totalUsers = this.tableData.length
  },
  methods: {
    searchUsers() {
      this.$message.success('搜索完成')
    },
    addUser() {
      this.$message.info('添加用户功能待实现')
    },
    editUser(index, row) {
      this.$message.info(`编辑用户: ${row.name}`)
    },
    deleteUser(index, row) {
      this.$confirm(`确定要删除用户 ${row.name} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.totalUsers = this.tableData.length
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.$message.info(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.$message.info(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
.table-controls {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>