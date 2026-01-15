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
      
      <div class="action-bar">
        <el-button type="text" icon="el-icon-circle-plus" @click="handleAddPerformance(performanceActiveTab)" class="add-btn">新增</el-button>
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
            <el-table-column 
              v-for="column in annualColumns" 
              :key="column.prop"
              :prop="column.prop" 
              :label="column.label" 
              :width="column.width" 
              :align="column.align || 'center'"
            ></el-table-column>
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
            <el-table-column 
              v-for="column in innovationColumns" 
              :key="column.prop"
              :prop="column.prop" 
              :label="column.label" 
              :width="column.width" 
              :align="column.align || 'center'"
            ></el-table-column>
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
          <el-table 
            :data="awardsList" 
            style="width: 100%" 
            border 
            size="small"
            :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
          >
            <el-table-column 
              v-for="column in awardsColumns" 
              :key="column.prop"
              :prop="column.prop" 
              :label="column.label" 
              :width="column.width" 
              :align="column.align || 'center'"
            ></el-table-column>
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
        <el-form :model="performanceForm" ref="performanceForm" :rules="formRules" label-width="120px" size="small">
          <el-form-item 
            v-for="field in formFields" 
            :key="field.prop" 
            :label="field.label" 
            :prop="field.prop"
          >
            <el-date-picker 
              v-if="field.type === 'year'"
              v-model="performanceForm[field.prop]" 
              type="year" 
              value-format="yyyy" 
              placeholder="选择年份" 
              style="width: 100%;"
            ></el-date-picker>
            
            <el-input 
              v-else-if="field.type === 'textarea'"
              type="textarea"
              v-model="performanceForm[field.prop]" 
              rows="4"
              :placeholder="field.placeholder || ''"
            ></el-input>
            
            <el-input 
              v-else
              v-model="performanceForm[field.prop]" 
              :placeholder="field.placeholder || ''"
            ></el-input>
          </el-form-item>
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
  props: {
    annualList: { type: Array, default: () => [] },
    innovationList: { type: Array, default: () => [] },
    awardsList: { type: Array, default: () => [] }
  },
  data() {
    return {
      performanceActiveTab: 'annual',
      performanceDrawerVisible: false,
      performanceDrawerTitle: '',
      currentPerformanceType: 'annual', // 'annual', 'innovation', 'awards'
      performanceForm: {},
      isEditPerformance: false,
      // 表格列配置
      annualColumns: [
        { prop: 'id', label: '序号', width: '50' },
        { prop: 'year', label: '考核日期' },
        { prop: 'grade', label: '绩效等级' },
        { prop: 'score', label: '绩效积分' },
        { prop: 'last3YearsScore', label: '近三年绩效积分' }
      ],
      innovationColumns: [
        { prop: 'id', label: '序号', width: '50' },
        { prop: 'year', label: '成果时间', width: '100' },
        { prop: 'description', label: '创新成果描述' }
      ],
      awardsColumns: [
        { prop: 'id', label: '序号', width: '50' },
        { prop: 'year', label: '获奖时间', width: '100' },
        { prop: 'description', label: '获奖表彰描述' }
      ]
    }
  },
  computed: {
    formFields() {
      if (this.currentPerformanceType === 'annual') {
        return [
          { prop: 'year', label: '考核日期', type: 'year', required: true, message: '请选择年份' },
          { prop: 'grade', label: '绩效等级', type: 'input', required: true, message: '请输入绩效等级' },
          { prop: 'score', label: '绩效积分', type: 'input', required: true, message: '请输入绩效积分' },
          { prop: 'last3YearsScore', label: '近三年绩效积分', type: 'input' }
        ];
      } else {
        const isInnovation = this.currentPerformanceType === 'innovation';
        return [
          { prop: 'year', label: isInnovation ? '成果时间' : '获奖时间', type: 'year', required: true, message: '请选择年份' },
          { prop: 'description', label: isInnovation ? '创新成果描述' : '获奖表彰描述', type: 'textarea', required: true, message: '请输入描述' }
        ];
      }
    },
    formRules() {
      const rules = {};
      this.formFields.forEach(field => {
        if (field.required) {
          rules[field.prop] = [
            { required: true, message: field.message, trigger: field.type === 'year' ? 'change' : 'blur' }
          ];
        }
      });
      return rules;
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
        this.$emit('delete', { type, index });
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    savePerformance() {
      this.$refs.performanceForm.validate((valid) => {
        if (valid) {
          this.$emit('save', {
            item: { ...this.performanceForm },
            type: this.currentPerformanceType,
            isEdit: this.isEditPerformance
          });
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
