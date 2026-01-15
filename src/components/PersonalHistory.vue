<template>
  <div class="personal-history">
    <section-title title="个人履历"></section-title>
    
    <div class="table-container">
      <div class="action-bar">
        <el-button type="text" icon="el-icon-circle-plus" @click="handleAddHistory" class="add-btn">新增</el-button>
      </div>
      
      <el-table 
        :data="personalHistoryList" 
        style="width: 100%" 
        border 
        size="small"
        :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
      >
        <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="timeRange" label="起止时间" width="200" align="center"></el-table-column>
        <el-table-column prop="organization" label="所在单位" align="center"></el-table-column>
        <el-table-column prop="department" label="工作部门" align="center"></el-table-column>
        <el-table-column prop="job" label="职位" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEditHistory(scope.row)">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" icon="el-icon-delete" @click="handleDeleteHistory(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- History Drawer -->
    <el-drawer
      :title="historyDrawerTitle"
      :visible.sync="historyDrawerVisible"
      direction="rtl"
      size="30%">
      <div class="drawer-content">
        <el-form :model="historyForm" ref="historyForm" label-width="100px" size="small">
          <el-form-item label="起止时间" prop="timeRange" :rules="{ required: true, message: '请输入起止时间', trigger: 'blur' }">
            <el-input v-model="historyForm.timeRange" placeholder="2025-1-1至2025-12-1"></el-input>
          </el-form-item>
          <el-form-item label="所在单位" prop="organization" :rules="{ required: true, message: '请输入所在单位', trigger: 'blur' }">
            <el-input v-model="historyForm.organization" placeholder="请输入所在单位"></el-input>
          </el-form-item>
          <el-form-item label="工作部门" prop="department" :rules="{ required: true, message: '请输入工作部门', trigger: 'blur' }">
            <el-input v-model="historyForm.department" placeholder="请输入工作部门"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="job" :rules="{ required: true, message: '请输入职位', trigger: 'blur' }">
            <el-input v-model="historyForm.job" placeholder="请输入职位"></el-input>
          </el-form-item>
        </el-form>
        <div class="drawer-footer">
          <el-button @click="historyDrawerVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveHistory">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'PersonalHistory',
  components: {
    SectionTitle
  },
  data() {
    return {
      personalHistoryList: [
        { id: 1, timeRange: '2025-1-1至2025-12-1', organization: '国网西藏电力有限公司拉萨供电公司', department: '输电运维中心', job: '输电运检初级工' },
        { id: 2, timeRange: '2024-1-1至2024-12-31', organization: '国网西藏电力有限公司拉萨供电公司', department: '输电运检中心', job: '输电运检初级工' },
        { id: 3, timeRange: '2023-1-1至2023-12-31', organization: '国网西藏电力有限公司山南供电公司', department: '设备运维中心', job: '输电运检初级工' },
        { id: 4, timeRange: '2022-1-1至2022-12-1', organization: '国网西藏电力有限公司山南供电公司', department: '设备运维中心', job: '输电运检初级工' }
      ],
      historyDrawerVisible: false,
      historyDrawerTitle: '新增个人履历',
      historyForm: {
        id: null,
        timeRange: '',
        organization: '',
        department: '',
        job: ''
      },
      isEditHistory: false
    }
  },
  methods: {
    handleAddHistory() {
      this.isEditHistory = false;
      this.historyDrawerTitle = '新增个人履历';
      this.historyForm = { id: null, timeRange: '', organization: '', department: '', job: '' };
      this.historyDrawerVisible = true;
      this.$nextTick(() => {
        if(this.$refs.historyForm) this.$refs.historyForm.clearValidate();
      });
    },
    handleEditHistory(row) {
      this.isEditHistory = true;
      this.historyDrawerTitle = '编辑个人履历';
      this.historyForm = { ...row };
      this.historyDrawerVisible = true;
      this.$nextTick(() => {
        if(this.$refs.historyForm) this.$refs.historyForm.clearValidate();
      });
    },
    handleDeleteHistory(index) {
      this.$confirm('确认删除该条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', index);
      }).catch(() => {});
    },
    saveHistory() {
      this.$refs.historyForm.validate((valid) => {
        if (valid) {
          this.$emit('save', {
            item: { ...this.historyForm },
            isEdit: this.isEditHistory
          });
          this.historyDrawerVisible = false;
        }
      });
    }
  }
}
</script>

<style scoped>
.personal-history {
  margin-bottom: 20px;
}

.action-bar {
  background-color: #e6f1fc;
  padding: 8px 15px;
  border: 1px solid #EBEEF5;
  border-bottom: none;
  display: flex;
  align-items: center;
}

.add-btn {
  color: #409EFF;
  font-weight: bold;
  font-size: 14px;
}

.add-btn i {
  margin-right: 4px;
}

.drawer-content {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-footer {
  margin-top: auto;
  text-align: right;
  padding-top: 20px;
}
</style>
