<template>
  <div class="personal-growth">
    <section-title title="个人成长"></section-title>
    
    <div class="custom-tabs">
      <div class="tab-headers">
        <div 
          class="tab-item" 
          :class="{ active: growthActiveTab === 'skill' }"
          @click="growthActiveTab = 'skill'"
        >技能等级</div>
        <div 
          class="tab-item" 
          :class="{ active: growthActiveTab === 'career' }"
          @click="growthActiveTab = 'career'"
        >职业规划</div>
      </div>
      
      <div class="action-bar">
        <el-button type="text" icon="el-icon-circle-plus" @click="handleAddGrowth(growthActiveTab)" class="add-btn">新增</el-button>
      </div>
      
      <div class="tab-content">
        <!-- Skill Level -->
        <div v-show="growthActiveTab === 'skill'">
          <el-table 
            :data="skillList" 
            style="width: 100%" 
            border 
            size="small"
            :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
          >
            <el-table-column 
              v-for="column in skillColumns" 
              :key="column.prop"
              :prop="column.prop" 
              :label="column.label" 
              :width="column.width" 
              :align="column.align || 'center'"
            ></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEditGrowth('skill', scope.row)">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small" icon="el-icon-delete" @click="handleDeleteGrowth('skill', scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- Career Plan -->
        <div v-show="growthActiveTab === 'career'">
          <el-table 
            :data="careerList" 
            style="width: 100%" 
            border 
            size="small"
            :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
          >
            <el-table-column 
              v-for="column in careerColumns" 
              :key="column.prop"
              :prop="column.prop" 
              :label="column.label" 
              :width="column.width" 
              :align="column.align || 'center'"
            ></el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-edit-outline" @click="handleEditGrowth('career', scope.row)">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" size="small" icon="el-icon-delete" @click="handleDeleteGrowth('career', scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- Growth Drawer -->
    <el-drawer
      :title="growthDrawerTitle"
      :visible.sync="growthDrawerVisible"
      direction="rtl"
      size="30%">
      <div class="drawer-content">
        <el-form :model="growthForm" ref="growthForm" label-width="120px" size="small">
          <!-- Skill Fields -->
          <template v-if="currentGrowthType === 'skill'">
            <el-form-item label="起始时间" prop="timeRange" :rules="{ required: true, message: '请输入起始时间', trigger: 'blur' }">
              <el-input v-model="growthForm.timeRange" placeholder="2023-10-1至2025-12-17"></el-input>
            </el-form-item>
            <el-form-item label="技能鉴定工种" prop="skillType" :rules="{ required: true, message: '请输入工种', trigger: 'blur' }">
              <el-input v-model="growthForm.skillType" placeholder="变电站值班员"></el-input>
            </el-form-item>
            <el-form-item label="技能等级" prop="level" :rules="{ required: true, message: '请输入等级', trigger: 'blur' }">
              <el-input v-model="growthForm.level" placeholder="中级工"></el-input>
            </el-form-item>
            <el-form-item label="是否最高级" prop="isHighest">
              <el-select v-model="growthForm.isHighest" placeholder="请选择" style="width: 100%;">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </template>

          <!-- Career Fields -->
          <template v-else>
            <el-form-item label="职业规划时间" prop="year" :rules="{ required: true, message: '请选择年份', trigger: 'change' }">
              <el-date-picker v-model="growthForm.year" type="year" value-format="yyyy" placeholder="选择年份" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="职业规划内容" prop="content" :rules="{ required: true, message: '请输入内容', trigger: 'blur' }">
              <el-input type="textarea" v-model="growthForm.content" rows="4"></el-input>
            </el-form-item>
          </template>
        </el-form>
        <div class="drawer-footer">
          <el-button @click="growthDrawerVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveGrowth">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'PersonalGrowth',
  components: {
    SectionTitle
  },
  props: {
    skillList: { type: Array, default: () => [] },
    careerList: { type: Array, default: () => [] }
  },
  data() {
    return {
      growthActiveTab: 'skill',
      growthDrawerVisible: false,
      growthDrawerTitle: '',
      currentGrowthType: 'skill', // 'skill', 'career'
      growthForm: {},
      isEditGrowth: false,
      // 表格列配置
      skillColumns: [
        { prop: 'id', label: '序号', width: '50' },
        { prop: 'timeRange', label: '起始时间', width: '200' },
        { prop: 'skillType', label: '技能鉴定工种' },
        { prop: 'level', label: '技能等级' },
        { prop: 'isHighest', label: '是否最高级' }
      ],
      careerColumns: [
        { prop: 'id', label: '序号', width: '50' },
        { prop: 'year', label: '职业规划时间', width: '150' },
        { prop: 'content', label: '职业规划内容' }
      ]
    }
  },
  methods: {
    handleAddGrowth(type) {
      this.currentGrowthType = type;
      this.isEditGrowth = false;
      this.growthDrawerTitle = type === 'skill' ? '新增技能等级' : '新增职业规划';
      
      if (type === 'skill') {
        this.growthForm = { id: null, timeRange: '', skillType: '', level: '', isHighest: '' };
      } else {
        this.growthForm = { id: null, year: '', content: '' };
      }
      
      this.growthDrawerVisible = true;
      this.$nextTick(() => {
        if(this.$refs.growthForm) this.$refs.growthForm.clearValidate();
      });
    },
    handleEditGrowth(type, row) {
      this.currentGrowthType = type;
      this.isEditGrowth = true;
      this.growthDrawerTitle = type === 'skill' ? '编辑技能等级' : '编辑职业规划';
      this.growthForm = { ...row };
      this.growthDrawerVisible = true;
      this.$nextTick(() => {
        if(this.$refs.growthForm) this.$refs.growthForm.clearValidate();
      });
    },
    handleDeleteGrowth(type, index) {
      this.$confirm('确认删除该条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('delete', { type, index });
        this.$message.success('删除成功');
      }).catch(() => {});
    },
    saveGrowth() {
      this.$refs.growthForm.validate((valid) => {
        if (valid) {
          this.$emit('save', {
            item: { ...this.growthForm },
            type: this.currentGrowthType,
            isEdit: this.isEditGrowth
          });
          this.growthDrawerVisible = false;
          this.$message.success(this.isEditGrowth ? '修改成功' : '新增成功');
        }
      });
    }
  }
}
</script>

<style scoped>
.personal-growth {
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
