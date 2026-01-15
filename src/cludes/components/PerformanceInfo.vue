<template>
  <div class="performance-info">
    <section-title title="绩效信息"></section-title>
    
    <div class="custom-tabs">
      <div class="tab-headers">
        <div 
          class="tab-item" 
          :class="{ active: performanceActiveTab === 'annual' }"
          @click="performanceActiveTab = 'annual'"
        >年度绩效</div>
        <div 
          class="tab-item" 
          :class="{ active: performanceActiveTab === 'innovation' }"
          @click="performanceActiveTab = 'innovation'"
        >创新成果</div>
        <div 
          class="tab-item" 
          :class="{ active: performanceActiveTab === 'awards' }"
          @click="performanceActiveTab = 'awards'"
        >获奖表彰</div>
      </div>
      
      <div class="tab-content">
        <!-- Annual Performance -->
        <div v-show="performanceActiveTab === 'annual'">
          <div class="action-bar">
            <el-button type="text" icon="el-icon-circle-plus" @click="handleAddPerformance('annual')" class="add-btn">新增</el-button>
          </div>
          <el-table 
            :data="annualList" 
            style="width: 100%" 
            border 
            size="small"
            :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
          >
            <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="year" label="考核日期" align="center"></el-table-column>
            <el-table-column prop="grade" label="绩效等级" align="center"></el-table-column>
            <el-table-column prop="score" label="绩效积分" align="center"></el-table-column>
            <el-table-column prop="last3YearsScore" label="近三年绩效积分" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEditPerformance('annual', scope.row)">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small" icon="el-icon-delete" @click="handleDeletePerformance('annual', scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- Innovation -->
        <div v-show="performanceActiveTab === 'innovation'">
          <div class="action-bar">
            <el-button type="text" icon="el-icon-circle-plus" @click="handleAddPerformance('innovation')" class="add-btn">新增</el-button>
          </div>
          <el-table 
            :data="innovationList" 
            style="width: 100%" 
            border 
            size="small"
            :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
          >
            <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="year" label="成果时间" width="100" align="center"></el-table-column>
            <el-table-column prop="description" label="创新成果描述" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEditPerformance('innovation', scope.row)">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small" icon="el-icon-delete" @click="handleDeletePerformance('innovation', scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- Awards -->
        <div v-show="performanceActiveTab === 'awards'">
          <div class="action-bar">
            <el-button type="text" icon="el-icon-circle-plus" @click="handleAddPerformance('awards')" class="add-btn">新增</el-button>
          </div>
          <el-table 
            :data="awardsList" 
            style="width: 100%" 
            border 
            size="small"
            :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
          >
            <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="year" label="获奖时间" width="100" align="center"></el-table-column>
            <el-table-column prop="description" label="获奖表彰描述" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEditPerformance('awards', scope.row)">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small" icon="el-icon-delete" @click="handleDeletePerformance('awards', scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- Performance Drawer -->
    <el-drawer
      :title="performanceDrawerTitle"
      :visible.sync="performanceDrawerVisible"
      direction="rtl"
      size="30%">
      <div class="drawer-content">
        <el-form :model="performanceForm" ref="performanceForm" label-width="120px" size="small">
          <!-- Annual Performance Fields -->
          <template v-if="currentPerformanceType === 'annual'">
            <el-form-item label="考核日期" prop="year" :rules="{ required: true, message: '请选择年份', trigger: 'change' }">
              <el-date-picker v-model="performanceForm.year" type="year" value-format="yyyy" placeholder="选择年份" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="绩效等级" prop="grade" :rules="{ required: true, message: '请输入绩效等级', trigger: 'blur' }">
              <el-input v-model="performanceForm.grade" placeholder="B"></el-input>
            </el-form-item>
            <el-form-item label="绩效积分" prop="score" :rules="{ required: true, message: '请输入绩效积分', trigger: 'blur' }">
              <el-input v-model="performanceForm.score" placeholder="1.5"></el-input>
            </el-form-item>
            <el-form-item label="近三年绩效积分" prop="last3YearsScore">
              <el-input v-model="performanceForm.last3YearsScore" placeholder="4.5"></el-input>
            </el-form-item>
          </template>

          <!-- Innovation & Awards Fields -->
          <template v-else>
            <el-form-item :label="currentPerformanceType === 'innovation' ? '成果时间' : '获奖时间'" prop="year" :rules="{ required: true, message: '请选择年份', trigger: 'change' }">
              <el-date-picker v-model="performanceForm.year" type="year" value-format="yyyy" placeholder="选择年份" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item :label="currentPerformanceType === 'innovation' ? '创新成果描述' : '获奖表彰描述'" prop="description" :rules="{ required: true, message: '请输入描述', trigger: 'blur' }">
              <el-input type="textarea" v-model="performanceForm.description" rows="4"></el-input>
            </el-form-item>
          </template>
        </el-form>
        <div class="drawer-footer">
          <el-button @click="performanceDrawerVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePerformance">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'PerformanceInfo',
  components: {
    SectionTitle
  },
  data() {
    return {
      performanceActiveTab: 'annual',
      annualPerformanceList: [
        { id: 1, year: '2024', grade: 'B', score: '1.5', last3YearsScore: '4.5' },
        { id: 2, year: '2023', grade: 'B', score: '1.5', last3YearsScore: '4.5' },
        { id: 3, year: '2022', grade: 'B', score: '1.5', last3YearsScore: '4.5' },
        { id: 4, year: '2021', grade: 'B', score: '1.5', last3YearsScore: '4.5' }
      ],
      innovationList: [
        { id: 1, year: '2025', description: '在2025年“班组岗位创新创效·工人先锋号在行动”活动中，输电检修班张保国创新实践项目《基于“一基三化”的基层班组创新管理实践》荣获三等奖' },
        { id: 2, year: '2025', description: '在2025年“班组岗位创新创效·工人先锋号在行动”活动中，输电检修班张保国创新实践项目《基于“一基三化”的基层班组创新管理实践》荣获三等奖' }
      ],
      awardsList: [
        { id: 1, year: '2025', description: '在2025年国网公司设备运检全业务核心班组建设第四次常态化督察中拉萨供电公司输电检修班张保国以综合评分59.7分的优异成绩位列本轮督察全国第一名' },
        { id: 2, year: '2025', description: '在2025年国网公司设备运检全业务核心班组建设第四次常态化督察中拉萨供电公司输电检修班张保国以综合评分59.7分的优异成绩位列本轮督察全国第一名' }
      ],
      performanceDrawerVisible: false,
      performanceDrawerTitle: '',
      currentPerformanceType: 'annual', // 'annual', 'innovation', 'awards'
      performanceForm: {},
      isEditPerformance: false
    }
  },
  methods: {
    handleAddPerformance(type) {
      this.currentPerformanceType = type;
      this.isEditPerformance = false;
      this.performanceDrawerTitle = type === 'annual' ? '新增年度绩效' : (type === 'innovation' ? '新增创新成果' : '新增获奖表彰');
      
      if (type === 'annual') {
        this.performanceForm = { id: null, year: '', grade: '', score: '', last3YearsScore: '' };
      } else {
        this.performanceForm = { id: null, year: '', description: '' };
      }
      
      this.performanceDrawerVisible = true;
      this.$nextTick(() => {
        if(this.$refs.performanceForm) this.$refs.performanceForm.clearValidate();
      });
    },
    handleEditPerformance(type, row) {
      this.currentPerformanceType = type;
      this.isEditPerformance = true;
      this.performanceDrawerTitle = type === 'annual' ? '编辑年度绩效' : (type === 'innovation' ? '编辑创新成果' : '编辑获奖表彰');
      this.performanceForm = { ...row };
      this.performanceDrawerVisible = true;
      this.$nextTick(() => {
        if(this.$refs.performanceForm) this.$refs.performanceForm.clearValidate();
      });
    },
    handleDeletePerformance(type, index) {
      this.$confirm('确认删除该条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (type === 'annual') this.annualPerformanceList.splice(index, 1);
        else if (type === 'innovation') this.innovationList.splice(index, 1);
        else if (type === 'awards') this.awardsList.splice(index, 1);
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    savePerformance() {
      this.$refs.performanceForm.validate((valid) => {
        if (valid) {
          let targetList;
          if (this.currentPerformanceType === 'annual') targetList = this.annualPerformanceList;
          else if (this.currentPerformanceType === 'innovation') targetList = this.innovationList;
          else if (this.currentPerformanceType === 'awards') targetList = this.awardsList;

          if (this.isEditPerformance) {
            const index = targetList.findIndex(item => item.id === this.performanceForm.id);
            if (index !== -1) {
              this.$set(targetList, index, { ...this.performanceForm });
            }
          } else {
            const newId = targetList.length > 0 ? Math.max(...targetList.map(item => item.id)) + 1 : 1;
            targetList.unshift({ ...this.performanceForm, id: newId });
          }
          this.performanceDrawerVisible = false;
          this.$message.success(this.isEditPerformance ? '修改成功' : '新增成功');
        }
      });
    }
  }
}
</script>

<style scoped>
.performance-info {
  margin-bottom: 20px;
}

.custom-tabs {
  border: 1px solid #E4E7ED;
  border-radius: 4px;
}

.tab-headers {
  display: flex;
  background-color: #F5F7FA;
  border-bottom: 1px solid #E4E7ED;
}

.tab-item {
  padding: 10px 20px;
  cursor: pointer;
  border-right: 1px solid #E4E7ED;
  color: #909399;
  font-size: 14px;
}

.tab-item.active {
  background-color: #fff;
  color: #409EFF;
  font-weight: 500;
  border-bottom: 2px solid transparent; /* Just to handle box sizing */
  margin-bottom: -1px;
  border-bottom-color: #fff;
}

.tab-item:last-child {
  border-right: none;
}

.tab-content {
  padding: 0; /* No padding inside to let table expand */
}

.action-bar {
  background-color: #e6f1fc;
  padding: 8px 15px;
  border-bottom: 1px solid #EBEEF5;
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
