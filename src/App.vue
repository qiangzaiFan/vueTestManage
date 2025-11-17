<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="header-content">
          <h2>Vue2 + Element UI 项目</h2>
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            router
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item index="/table">表格示例</el-menu-item>
            <el-menu-item index="/form">表单示例</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <div class="footer-content">
          © 2023 Vue2 + Element UI 项目
        </div>
      </el-footer>
    </el-container>

    <!-- 全局HTTP请求弹窗 -->
    <request-dialog :visible.sync="requestDialogVisible" />
  </div>
</template>

<script>
import RequestDialog from './components/RequestDialog.vue'
export default {
  name: 'App',
  components: { RequestDialog },
  data() {
    return {
      requestDialogVisible: false
    }
  },
  mounted() {
    const self = this
    // 在 window 上暴露可控的显示/隐藏属性与方法
    try {
      Object.defineProperty(window, 'requestDialogVisible', {
        configurable: true,
        get() { return self.requestDialogVisible },
        set(v) { self.requestDialogVisible = !!v }
      })
    } catch (e) {
      // 回退：直接赋值不可观察，但仍可通过方法控制
      window.requestDialogVisible = self.requestDialogVisible
    }

    window.showRequestDialog = function() { self.requestDialogVisible = true }
    window.hideRequestDialog = function() { self.requestDialogVisible = false }
    window.toggleRequestDialog = function() { self.requestDialogVisible = !self.requestDialogVisible }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

.el-header {
  background-color: #409EFF;
  color: white;
  padding: 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
}

.header-content h2 {
  margin: 0;
  color: white;
}

.el-menu-demo {
  background-color: transparent;
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item {
  color: white;
  border-bottom: 2px solid transparent;
}

.el-menu--horizontal > .el-menu-item:hover,
.el-menu--horizontal > .el-menu-item.is-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-bottom: 2px solid white;
}

.el-main {
  padding: 20px;
  min-height: calc(100vh - 120px);
}

.el-footer {
  background-color: #f5f5f5;
  color: #666;
  text-align: center;
  line-height: 60px;
}

.footer-content {
  font-size: 14px;
}
</style>