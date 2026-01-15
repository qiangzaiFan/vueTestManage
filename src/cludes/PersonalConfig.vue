<template>
  <div class="personal-config-container">
    <team-header></team-header>

    <!-- Personal Information Section -->
    <section-title title="个人信息"></section-title>
    <el-form :model="personalInfo" label-width="100px" size="small" class="info-form">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="所在单位">
            <el-input v-model="personalInfo.organization" placeholder="国网西藏电力有限公司拉萨供电公司..."></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="部门">
            <el-input v-model="personalInfo.department" placeholder="输电运维中心"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="personalInfo.name" placeholder="张保国"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="员工编号">
            <el-input v-model="personalInfo.employeeId" placeholder="460062397"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="出生日期" required>
            <el-date-picker v-model="personalInfo.birthDate" type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄">
            <el-input v-model="personalInfo.age" placeholder="36"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工作开始时间" required>
            <el-date-picker v-model="personalInfo.workStartDate" type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="工作年限">
            <el-input v-model="personalInfo.yearsOfService" placeholder="12"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="学历" required>
            <el-select v-model="personalInfo.education" placeholder="请选择" style="width: 100%;">
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="职称" required>
            <el-select v-model="personalInfo.title" placeholder="请选择" style="width: 100%;">
              <el-option label="高级工程师" value="senior"></el-option>
              <el-option label="工程师" value="mid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- Refactored Components -->
    <personal-history 
      :list="personalHistoryList"
      @save="handleHistorySave"
      @delete="handleHistoryDelete"
    ></personal-history>
    
    <performance-info
      :annual-list="annualPerformanceList"
      :innovation-list="innovationList"
      :awards-list="awardsList"
      @save="handlePerformanceSave"
      @delete="handlePerformanceDelete"
    ></performance-info>
    
    <personal-growth
      :skill-list="skillList"
      :career-list="careerPlanList"
      @save="handleGrowthSave"
      @delete="handleGrowthDelete"
    ></personal-growth>

    <!-- Global Save Button -->
    <div class="footer-actions">
      <el-button type="primary" @click="handleGlobalSave" size="medium">保存所有配置</el-button>
    </div>

  </div>
</template>

<script>
import TeamHeader from '@/components/TeamHeader.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import PersonalHistory from '@/components/PersonalHistory.vue'
import PerformanceInfo from '@/components/PerformanceInfo.vue'
import PersonalGrowth from '@/components/PersonalGrowth.vue'

export default {
  name: 'PersonalConfig',
  components: {
    TeamHeader,
    SectionTitle,
    PersonalHistory,
    PerformanceInfo,
    PersonalGrowth
  },
  data() {
    return {
      personalInfo: {
        organization: '国网西藏电力有限公司拉萨供电公司...',
        department: '输电运维中心',
        name: '张保国',
        employeeId: '460062397',
        birthDate: '',
        age: '36',
        workStartDate: '',
        yearsOfService: '12',
        education: '',
        title: ''
      },
      personalHistoryList: [],
      annualPerformanceList: [],
      innovationList: [],
      awardsList: [],
      skillList: [],
      careerPlanList: []
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // Simulate fetching data from backend
      this.personalHistoryList = [
        { id: 1, timeRange: '2025-1-1至2025-12-1', organization: '国网西藏电力有限公司拉萨供电公司', department: '输电运维中心', job: '输电运检初级工' },
        { id: 2, timeRange: '2024-1-1至2024-12-31', organization: '国网西藏电力有限公司拉萨供电公司', department: '输电运检中心', job: '输电运检初级工' },
        { id: 3, timeRange: '2023-1-1至2023-12-31', organization: '国网西藏电力有限公司山南供电公司', department: '设备运维中心', job: '输电运检初级工' },
        { id: 4, timeRange: '2022-1-1至2022-12-1', organization: '国网西藏电力有限公司山南供电公司', department: '设备运维中心', job: '输电运检初级工' }
      ];
      this.annualPerformanceList = [
        { id: 1, year: '2024', grade: 'B', score: '1.5', last3YearsScore: '4.5' },
        { id: 2, year: '2023', grade: 'B', score: '1.5', last3YearsScore: '4.5' },
        { id: 3, year: '2022', grade: 'B', score: '1.5', last3YearsScore: '4.5' },
        { id: 4, year: '2021', grade: 'B', score: '1.5', last3YearsScore: '4.5' }
      ];
      this.innovationList = [
        { id: 1, year: '2025', description: '在2025年“班组岗位创新创效·工人先锋号在行动”活动中，输电检修班张保国创新实践项目《基于“一基三化”的基层班组创新管理实践》荣获三等奖' },
        { id: 2, year: '2025', description: '在2025年“班组岗位创新创效·工人先锋号在行动”活动中，输电检修班张保国创新实践项目《基于“一基三化”的基层班组创新管理实践》荣获三等奖' }
      ];
      this.awardsList = [
        { id: 1, year: '2025', description: '在2025年国网公司设备运检全业务核心班组建设第四次常态化督察中拉萨供电公司输电检修班张保国以综合评分59.7分的优异成绩位列本轮督察全国第一名' },
        { id: 2, year: '2025', description: '在2025年国网公司设备运检全业务核心班组建设第四次常态化督察中拉萨供电公司输电检修班张保国以综合评分59.7分的优异成绩位列本轮督察全国第一名' }
      ];
      this.skillList = [
        { id: 1, timeRange: '2023-10-1至2025-12-17', skillType: '变电站值班员', level: '中级工', isHighest: '是' },
        { id: 2, timeRange: '2021-2-1至2023-10-22', skillType: '电器值班员', level: '中级工', isHighest: '否' }
      ];
      this.careerPlanList = [
        { id: 1, year: '2025年', content: '计划2026年取得XX高级职称' },
        { id: 2, year: '2024年', content: '计划2025年取得完成XX中级工技能鉴定' }
      ];
    },
    // History Handlers
    handleHistorySave({ item, isEdit }) {
      if (isEdit) {
        const index = this.personalHistoryList.findIndex(h => h.id === item.id);
        if (index !== -1) this.$set(this.personalHistoryList, index, item);
      } else {
        const newId = this.personalHistoryList.length > 0 ? Math.max(...this.personalHistoryList.map(h => h.id)) + 1 : 1;
        this.personalHistoryList.unshift({ ...item, id: newId });
      }
      this.$message.success(isEdit ? '修改成功' : '新增成功');
    },
    handleHistoryDelete(index) {
      this.personalHistoryList.splice(index, 1);
      this.$message.success('删除成功');
    },
    // Performance Handlers
    handlePerformanceSave({ type, item, isEdit }) {
      let targetList;
      if (type === 'annual') targetList = this.annualPerformanceList;
      else if (type === 'innovation') targetList = this.innovationList;
      else if (type === 'awards') targetList = this.awardsList;

      if (isEdit) {
        const index = targetList.findIndex(p => p.id === item.id);
        if (index !== -1) this.$set(targetList, index, item);
      } else {
        const newId = targetList.length > 0 ? Math.max(...targetList.map(p => p.id)) + 1 : 1;
        targetList.unshift({ ...item, id: newId });
      }
      this.$message.success(isEdit ? '修改成功' : '新增成功');
    },
    handlePerformanceDelete({ type, index }) {
      if (type === 'annual') this.annualPerformanceList.splice(index, 1);
      else if (type === 'innovation') this.innovationList.splice(index, 1);
      else if (type === 'awards') this.awardsList.splice(index, 1);
      this.$message.success('删除成功');
    },
    // Growth Handlers
    handleGrowthSave({ type, item, isEdit }) {
      let targetList;
      if (type === 'skill') targetList = this.skillList;
      else if (type === 'career') targetList = this.careerPlanList;

      if (isEdit) {
        const index = targetList.findIndex(g => g.id === item.id);
        if (index !== -1) this.$set(targetList, index, item);
      } else {
        const newId = targetList.length > 0 ? Math.max(...targetList.map(g => g.id)) + 1 : 1;
        targetList.unshift({ ...item, id: newId });
      }
      this.$message.success(isEdit ? '修改成功' : '新增成功');
    },
    handleGrowthDelete({ type, index }) {
      if (type === 'skill') this.skillList.splice(index, 1);
      else if (type === 'career') this.careerPlanList.splice(index, 1);
      this.$message.success('删除成功');
    },
    // Global Save
    handleGlobalSave() {
      const allData = {
        personalInfo: this.personalInfo,
        personalHistory: this.personalHistoryList,
        performance: {
          annual: this.annualPerformanceList,
          innovation: this.innovationList,
          awards: this.awardsList
        },
        growth: {
          skill: this.skillList,
          career: this.careerPlanList
        }
      };
      console.log('Saving all data to backend:', allData);
      // Here you would typically call an API
      // e.g., axios.post('/api/personal-config', allData)
      this.$message.success('所有配置保存成功！(模拟)');
    }
  }
}
</script>

<style scoped>
.personal-config-container {
  padding: 20px;
  background-color: #fff;
  padding-bottom: 60px; /* Space for footer */
}
.info-form {
  margin-bottom: 20px;
  border-bottom: 1px solid #EBEEF5;
  padding-bottom: 20px;
}
.footer-actions {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #EBEEF5;
}
</style>
