<template>
  <div class="score-form-container">
    <el-card>
      <div slot="header">评分标准表单</div>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="建设任务" prop="task">
          <el-select v-model="form.task" placeholder="请选择建设任务">
            <el-option label="I" value="I"></el-option>
            <el-option label="II" value="II"></el-option>
            <el-option label="III" value="III"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="评价内容" prop="content">
          <el-select v-model="form.content" placeholder="请选择评价内容">
            <el-option label="巡视作业" value="巡视作业"></el-option>
            <el-option label="检修作业" value="检修作业"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="评分标准" prop="standard">
          <el-input
            type="textarea"
            v-model="form.standard"
            placeholder="请输入内容"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="基础分" prop="baseScore">
          <el-input-number v-model="form.baseScore" :precision="2" :step="0.1" :min="0" :max="50"></el-input-number>
          <div class="form-item-note">注：评分标准所有基础分之和应≤50</div>
        </el-form-item>

        <el-form-item label="附加分" prop="extraScore">
          <el-input-number v-model="form.extraScore" :precision="2" :step="0.1" :min="0" :max="10"></el-input-number>
          <div class="form-item-note">注：评分标准所有附加分之和应≤10</div>
        </el-form-item>

        <el-form-item label="开始生效月份" prop="effectiveDate">
          <el-date-picker
            v-model="form.effectiveDate"
            type="month"
            placeholder="选择月份"
            value-format="yyyy-MM"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ScoreForm',
  data() {
    const validateScore = (rule, value, callback) => {
      if (value === undefined || value === null) {
        return callback(new Error('分数不能为空'));
      }
      if (typeof value !== 'number') {
        return callback(new Error('请输入数字值'));
      }
      if (rule.field === 'baseScore' && value > 50) {
        return callback(new Error('基础分不能超过50'));
      }
      if (rule.field === 'extraScore' && value > 10) {
        return callback(new Error('附加分不能超过10'));
      }
      if (value < 0) {
        return callback(new Error('分数不能为负数'));
      }
      callback();
    };

    return {
      form: {
        task: 'I',
        content: '巡视作业',
        standard: '',
        baseScore: 0,
        extraScore: 0,
        effectiveDate: '2025-12'
      },
      rules: {
        task: [{ required: true, message: '请选择建设任务', trigger: 'change' }],
        content: [{ required: true, message: '请选择评价内容', trigger: 'change' }],
        standard: [{ required: true, message: '请输入评分标准', trigger: 'blur' }],
        baseScore: [{ required: true, validator: validateScore, trigger: 'blur' }],
        extraScore: [{ required: true, validator: validateScore, trigger: 'blur' }],
        effectiveDate: [{ required: true, message: '请选择开始生效月份', trigger: 'change' }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message.success('表单提交成功!');
          console.log('Form data:', this.form);
        } else {
          this.$message.error('表单校验失败，请检查输入项');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
      // 重置为初始值
      this.form = {
        task: 'I',
        content: '巡视作业',
        standard: '',
        baseScore: 0,
        extraScore: 0,
        effectiveDate: '2025-12'
      }
    }
  }
};
</script>

<style scoped>
.score-form-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}
.form-item-note {
  color: #e6a23c;
  font-size: 12px;
  line-height: 1.5;
}
</style>
