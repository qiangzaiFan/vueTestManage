<template>
  <div class="form-example">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>用户信息表单</span>
          </div>
          <el-form
            :model="userForm"
            :rules="rules"
            ref="userForm"
            label-width="100px"
            class="demo-form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="userForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="userForm.password"
                placeholder="请输入密码"
                show-password>
              </el-input>
            </el-form-item>
            
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input
                type="password"
                v-model="userForm.confirmPassword"
                placeholder="请确认密码"
                show-password>
              </el-input>
            </el-form-item>
            
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="userForm.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="年龄" prop="age">
              <el-input-number
                v-model="userForm.age"
                :min="1"
                :max="150">
              </el-input-number>
            </el-form-item>
            
            <el-form-item label="城市" prop="city">
              <el-select v-model="userForm.city" placeholder="请选择城市">
                <el-option label="北京" value="beijing"></el-option>
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="广州" value="guangzhou"></el-option>
                <el-option label="深圳" value="shenzhen"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="爱好" prop="hobbies">
              <el-checkbox-group v-model="userForm.hobbies">
                <el-checkbox label="reading">阅读</el-checkbox>
                <el-checkbox label="music">音乐</el-checkbox>
                <el-checkbox label="sports">运动</el-checkbox>
                <el-checkbox label="travel">旅行</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                v-model="userForm.birthday"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            
            <el-form-item label="个人简介" prop="description">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入个人简介"
                v-model="userForm.description">
              </el-input>
            </el-form-item>
            
            <el-form-item label="同意协议" prop="agree">
              <el-checkbox v-model="userForm.agree">我已阅读并同意用户协议</el-checkbox>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="submitForm('userForm')" :loading="submitting">提交</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card>
          <div slot="header" class="clearfix">
            <span>表单数据预览</span>
          </div>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户名">{{ userForm.username || '未填写' }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userForm.email || '未填写' }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ genderText }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ userForm.age || '未填写' }}</el-descriptions-item>
            <el-descriptions-item label="城市">{{ cityText }}</el-descriptions-item>
            <el-descriptions-item label="爱好">{{ hobbiesText }}</el-descriptions-item>
            <el-descriptions-item label="生日">{{ userForm.birthday || '未选择' }}</el-descriptions-item>
            <el-descriptions-item label="个人简介">{{ userForm.description || '未填写' }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
        
        <el-card style="margin-top: 20px;">
          <div slot="header" class="clearfix">
            <span>表单验证状态</span>
          </div>
          <div class="validation-status">
            <el-alert
              v-if="formValid"
              title="表单验证通过"
              type="success"
              show-icon>
            </el-alert>
            <el-alert
              v-else
              title="表单存在验证错误，请检查后提交"
              type="warning"
              show-icon>
            </el-alert>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FormExample',
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    
    return {
      submitting: false,
      formValid: false,
      userForm: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: '',
        city: '',
        hobbies: [],
        birthday: '',
        description: '',
        agree: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: validateConfirmPassword, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        agree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请同意用户协议'))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    genderText() {
      const genderMap = {
        'male': '男',
        'female': '女'
      }
      return genderMap[this.userForm.gender] || '未选择'
    },
    cityText() {
      const cityMap = {
        'beijing': '北京',
        'shanghai': '上海',
        'guangzhou': '广州',
        'shenzhen': '深圳'
      }
      return cityMap[this.userForm.city] || '未选择'
    },
    hobbiesText() {
      const hobbiesMap = {
        'reading': '阅读',
        'music': '音乐',
        'sports': '运动',
        'travel': '旅行'
      }
      if (this.userForm.hobbies.length === 0) {
        return '未选择'
      }
      return this.userForm.hobbies.map(hobby => hobbiesMap[hobby]).join('、')
    }
  },
  watch: {
    userForm: {
      handler() {
        this.validateForm()
      },
      deep: true
    }
  },
  methods: {
    validateForm() {
      this.$refs.userForm && this.$refs.userForm.validate((valid) => {
        this.formValid = valid
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true
          // 模拟提交
          setTimeout(() => {
            this.submitting = false
            this.$message.success('提交成功!')
            console.log('提交的表单数据:', this.userForm)
          }, 2000)
        } else {
          this.$message.error('表单验证失败，请检查输入!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$message.info('表单已重置')
    }
  }
}
</script>

<style scoped>
.demo-form {
  max-width: 500px;
}

.validation-status {
  padding: 10px 0;
}
</style>