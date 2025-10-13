<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="welcome-card">
          <div slot="header" class="clearfix">
            <span>欢迎使用 Vue2 + Element UI</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="welcome-content">
            <el-alert
              title="项目创建成功！"
              type="success"
              description="这是一个基于Vue2和Element UI构建的项目模板，包含了常用的组件和功能示例。"
              show-icon>
            </el-alert>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="8">
        <el-card class="feature-card">
          <i class="el-icon-s-grid" style="font-size: 40px; color: #409EFF;"></i>
          <h3>组件丰富</h3>
          <p>Element UI 提供了丰富的组件库，满足各种业务需求</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="feature-card">
          <i class="el-icon-s-tools" style="font-size: 40px; color: #67C23A;"></i>
          <h3>配置灵活</h3>
          <p>支持主题定制，可以根据项目需求进行个性化配置</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="feature-card">
          <i class="el-icon-s-promotion" style="font-size: 40px; color: #E6A23C;"></i>
          <h3>开发高效</h3>
          <p>完善的文档和丰富的示例，让开发更加高效便捷</p>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top: 20px;">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>快速开始</span>
          </div>
          <el-steps :active="1" finish-status="success">
            <el-step title="安装依赖" description="npm install"></el-step>
            <el-step title="启动项目" description="npm run serve"></el-step>
            <el-step title="开始开发" description="编辑代码并查看效果"></el-step>
            <el-step title="构建部署" description="npm run build"></el-step>
          </el-steps>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.welcome-card {
  margin-bottom: 20px;
}

.welcome-content {
  padding: 20px 0;
}

.feature-card {
  text-align: center;
  padding: 20px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.feature-card h3 {
  margin: 15px 0 10px 0;
  color: #303133;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
  margin: 0;
}
</style>