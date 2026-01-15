<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="header-content">
        <span class="title">I 装备配置情况</span>
        <div class="filter-container">
          <span class="label">参照的班组类型</span>
          <el-select v-model="selectedTeam" placeholder="请选择班组类型" size="small" style="width: 240px;">
            <el-option
              v-for="team in teamList"
              :key="team.code"
              :label="team.name"
              :value="team.code">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    
    <div class="form-container">
      <el-form :model="formData" ref="form" label-width="140px" label-position="left" size="small">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item, index) in currentEquipmentList" :key="index">
            <el-form-item 
              :label="formatLabel(item)" 
              :prop="item"
              :rules="[
                { required: true, message: '请输入数量', trigger: 'blur' },
                { validator: validateQuantity, trigger: 'blur' }
              ]"
            >
              <el-input v-model.number="formData[item]" placeholder="请输入数量" type="number" min="0"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="currentEquipmentList.length === 0" class="empty-text">
          请选择班组类型以查看装备配置
        </div>
        <div class="form-footer" v-if="currentEquipmentList.length > 0">
          <el-button type="primary" @click="handleSave" size="small">保存</el-button>
        </div>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { teamEquipmentData, teamList } from './equipment-config.js';

export default {
  name: 'EquipmentConfiguration',
  data() {
    return {
      selectedTeam: '01001', // Default to first team code
      formData: {},
      teamEquipmentData,
      teamList
    };
  },
  computed: {
    currentEquipmentList() {
      const team = this.teamList.find(t => t.code === this.selectedTeam);
      const teamName = team ? team.name : '';
      return this.teamEquipmentData[teamName] || [];
    }
  },
  watch: {
    selectedTeam: {
      handler(newVal) {
        this.initForm(newVal);
      },
      immediate: true
    }
  },
  methods: {
    initForm(teamCode) {
      const team = this.teamList.find(t => t.code === teamCode);
      const teamName = team ? team.name : '';
      const equipmentList = this.teamEquipmentData[teamName] || [];
      
      const newFormData = {};
      equipmentList.forEach(item => {
        newFormData[item] = this.formData[item] !== undefined ? this.formData[item] : '';
      });
      this.formData = newFormData;
      
      // Clear validation after switching
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.clearValidate();
        }
      });
    },
    formatLabel(name) {
      if (name.includes('（') || name.includes('(')) {
        return name.replace(/([（(])/g, '数量$1');
      }
      return name + '数量';
    },
    validateQuantity(rule, value, callback) {
      if (value === '' || value === undefined || value === null) {
         // If required, handle here. Assuming optional or 0 is default.
         // But if user enters nothing, maybe we consider it valid (empty) or invalid?
         // Let's assume empty is allowed and treated as 0, OR enforce input.
         // "校验输入值都是正整数" -> Validate input values are positive integers.
         // If empty is not an integer... 
         // Let's enforce it's not empty for the sake of "validation".
         callback(new Error('请输入数量'));
         return;
      }
      
      const num = Number(value);
      if (!Number.isInteger(num)) {
        callback(new Error('请输入整数'));
      } else if (num < 0) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    },
    handleSave() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message.success('保存成功');
          // Proceed with save logic
          console.log('Saved Data:', this.formData);
        } else {
          this.$message.error('请检查输入项');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.box-card {
  margin: 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 16px;
  border-left: 4px solid #409EFF;
  padding-left: 10px;
}

.filter-container {
  display: flex;
  align-items: center;
}

.label {
  margin-right: 10px;
  font-size: 14px;
  color: #606266;
}

.form-container {
  padding: 20px 0;
}

.empty-text {
  text-align: center;
  color: #909399;
  padding: 20px;
}
.form-footer {
  text-align: center;
  margin-top: 20px;
}
</style>