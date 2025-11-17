<template>
  <el-dialog
    title="HTTP 请求工具"
    :visible="visible"
    width="60%"
    :close-on-click-modal="false"
    @update:visible="onVisibleUpdate"
  >
    <div>
      <el-form :model="form" label-width="100px" label-position="left">
        <el-form-item label="请求地址">
          <el-input v-model.trim="form.url" placeholder="例如：https://api.example.com/path"></el-input>
        </el-form-item>
        <el-form-item label="请求方式">
          <el-radio-group v-model="form.method">
            <el-radio label="GET">GET</el-radio>
            <el-radio label="POST">POST</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请求体">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="POST时为JSON；GET时可填写JSON作为查询参数"
            v-model="form.body"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="sendRequest">发送请求</el-button>
          <el-button @click="reset">清空</el-button>
        </el-form-item>
      </el-form>

      <el-divider>响应结果</el-divider>

      <div v-if="error" style="margin-bottom: 12px;">
        <el-alert :title="errorTitle" type="error" show-icon :closable="false"></el-alert>
      </div>

      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>响应数据</span>
              <el-tag v-if="status" size="mini" :type="statusTagType" style="float:right">{{ status }}</el-tag>
            </div>
            <pre class="result-pre">{{ pretty(responseData) }}</pre>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never">
            <div slot="header" class="clearfix">
              <span>响应头</span>
            </div>
            <pre class="result-pre">{{ pretty(responseHeaders) }}</pre>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RequestDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        url: '',
        method: 'GET',
        body: ''
      },
      loading: false,
      responseData: null,
      responseHeaders: null,
      status: null,
      error: null
    }
  },
  computed: {
    errorTitle() {
      if (!this.error) return ''
      return this.error.message || '请求失败'
    },
    statusTagType() {
      if (!this.status) return 'info'
      const s = Number(this.status)
      if (s >= 200 && s < 300) return 'success'
      if (s >= 300 && s < 400) return 'warning'
      return 'danger'
    }
  },
  methods: {
    onVisibleUpdate(val) {
      this.$emit('update:visible', val)
    },
    pretty(obj) {
      try {
        return obj != null ? JSON.stringify(obj, null, 2) : '—'
      } catch (e) {
        return String(obj)
      }
    },
    reset() {
      this.form.url = ''
      this.form.body = ''
      this.form.method = 'GET'
      this.responseData = null
      this.responseHeaders = null
      this.status = null
      this.error = null
    },
    parseBody(raw) {
      if (!raw || !raw.trim()) return null
      try {
        return JSON.parse(raw)
      } catch (e) {
        return raw // 返回原始字符串，作为 text/plain
      }
    },
    async sendRequest() {
      this.error = null
      this.responseData = null
      this.responseHeaders = null
      this.status = null

      const url = (this.form.url || '').trim()
      if (!url) {
        this.$message.error('请输入请求地址')
        return
      }

      const method = (this.form.method || 'GET').toUpperCase()
      const body = this.parseBody(this.form.body)

      const config = {
        url,
        method,
        headers: {},
        timeout: 15000
      }

      if (method === 'GET') {
        if (body && typeof body === 'object') {
          config.params = body
        }
      } else if (method === 'POST') {
        if (body !== null) {
          config.data = body
          if (typeof body === 'string') {
            config.headers['Content-Type'] = 'text/plain'
          } else {
            config.headers['Content-Type'] = 'application/json'
          }
        } else {
          config.data = {}
          config.headers['Content-Type'] = 'application/json'
        }
      }

      this.loading = true
      try {
        const res = await this.$http(config)
        this.status = res.status
        this.responseHeaders = res.headers
        this.responseData = res.data
        this.$message.success('请求成功')
      } catch (err) {
        const e = err || {}
        if (e.response) {
          this.status = e.response.status
          this.responseHeaders = e.response.headers
          this.responseData = e.response.data
        }
        this.error = {
          message: e.message || '请求失败'
        }
        this.$message.error('请求失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.result-pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  font-size: 12px;
  line-height: 1.6;
  margin: 0;
}
</style>