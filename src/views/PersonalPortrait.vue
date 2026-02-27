<template>
  <div class="personal-portrait">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <i class="el-icon-loading"></i>
        <span>页面加载中...</span>
      </div>
    </div>
    
    <!-- Top Section: User Info + Middle Grid (Indicators/Materials) | Todo List -->
    <div class="top-section">
      <div class="top-left-column">
        <!-- User Info Section -->
        <el-card class="box-card mb-20" shadow="hover">
          <div slot="header" class="clearfix header-title">
            <span class="text-primary"><i class="el-icon-s-custom text-blue"></i> 个人监督信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-download" @click="handleExportReport">报告导出</el-button>
          </div>
          <div class="user-profile-wrapper">
            <div class="avatar-section">
              <el-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            </div>
            <div class="info-section">
              <div class="name-row">
                <span class="user-name text-primary">谭婷</span>
                <el-tag size="mini" effect="dark" class="ml-10">高级工程师</el-tag>
                <el-tag size="mini" effect="plain" class="ml-5">I级专家</el-tag>
              </div>
              <div class="role-row mt-10 text-secondary">
                <span><i class="el-icon-user"></i> 项目经理：谭婷</span>
                <el-divider direction="vertical"></el-divider>
                <span><i class="el-icon-user-solid"></i> 项目副经理：王伟</span>
              </div>
              <div class="project-row mt-10 text-secondary">
                <span class="label">参与工程 <span class="blue-text">2个</span></span>
                <el-tag type="info" size="small" class="project-tag ml-10">工程名称：福州220kV交流工程</el-tag>
                <el-tag type="info" size="small" class="project-tag ml-5">工程名称：福州220kV交流工程</el-tag>
              </div>
            </div>
            <div class="score-section">
               <div class="score-circle">
                 <div class="score-label text-secondary">总分数</div>
                 <div class="score-value">86<span class="unit">分</span></div>
               </div>
               <div class="score-circle result-circle">
                 <div class="score-label text-secondary">评价结果</div>
                 <div class="score-value">优秀</div>
               </div>
            </div>
          </div>
        </el-card>

        <!-- Middle Grid -->
        <div class="middle-grid">
          <el-card class="box-card" shadow="hover" :body-style="{ padding: '10px' }">
            <div slot="header" class="clearfix header-title">
              <span class="text-primary"><i class="el-icon-s-data text-blue"></i> 监督指标</span>
            </div>
            <div class="metric-list">
              <!-- Row 1 -->
              <div class="metric-item">
                <div class="icon-wrapper bg-green-light">
                  <i class="el-icon-monitor text-green"></i>
                </div>
                <div class="metric-row-content">
                  <div class="metric-data-point">
                    <span class="dot bg-green"></span>
                    <span class="label">工作数</span>
                    <span class="value text-green">170</span>
                    <i class="el-icon-top text-gray"></i>
                  </div>
                  <div class="metric-data-point">
                    <span class="dot bg-green"></span>
                    <span class="label">问题数</span>
                    <span class="value text-green">399</span>
                    <i class="el-icon-top text-gray"></i>
                  </div>
                  <div class="metric-data-point no-dot">
                    <span class="label">监督效率</span>
                    <span class="value text-green large-val">1.89</span>
                  </div>
                </div>
              </div>
              <!-- Row 2 -->
              <div class="metric-item">
                 <div class="icon-wrapper bg-blue-light">
                  <i class="el-icon-question text-blue"></i>
                </div>
                <div class="metric-row-content">
                  <div class="metric-data-point">
                    <span class="dot bg-blue"></span>
                    <span class="label">问题数</span>
                    <span class="value text-blue">170</span>
                    <i class="el-icon-top text-gray"></i>
                  </div>
                  <div class="metric-data-point">
                    <span class="dot bg-blue"></span>
                    <span class="label">已整改</span>
                    <span class="value text-blue">86</span>
                    <i class="el-icon-top text-gray"></i>
                  </div>
                  <div class="metric-data-point no-dot">
                    <span class="label mr-10">整改率(%)</span>
                    <el-progress type="circle" :percentage="54.06" :width="50" :stroke-width="5" color="#409EFF"></el-progress>
                  </div>
                </div>
              </div>
              <!-- Row 3 -->
              <div class="metric-item">
                 <div class="icon-wrapper bg-orange-light">
                  <i class="el-icon-document-checked text-orange"></i>
                </div>
                <div class="metric-row-content">
                  <div class="metric-data-point">
                    <span class="dot bg-orange"></span>
                    <span class="label">告警单</span>
                    <span class="value text-orange">170</span>
                    <i class="el-icon-top text-gray"></i>
                  </div>
                  <div class="metric-data-point">
                    <span class="dot bg-orange"></span>
                    <span class="label">重大问题</span>
                    <span class="value text-orange">69</span>
                    <i class="el-icon-top text-gray"></i>
                  </div>
                  <div class="metric-data-point no-dot">
                    <span class="label mr-10">发布率(%)</span>
                    <el-progress type="circle" :percentage="54.06" :width="50" :stroke-width="5" color="#E6A23C"></el-progress>
                  </div>
                </div>
              </div>
            </div>
          </el-card>

          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix header-title">
              <span class="text-primary"><i class="el-icon-folder-opened text-blue"></i> 履职材料</span>
              <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-upload2">上传</el-button>
            </div>
            <div class="material-list">
              <div v-for="(item, index) in materials" :key="index" class="material-item">
                <div class="material-info">
                  <i class="el-icon-document text-red pdf-icon"></i>
                  <span class="material-link text-underline text-primary" @click="handleLinkClick(item)">{{ item.name }}</span>
                </div>
                <div class="material-date text-secondary">{{ item.date }}</div>
              </div>
            </div>
          </el-card>
        </div>
      </div>

      <!-- Right Column: Todo List -->
      <div class="top-right-column">
        <el-card class="box-card full-height-card" shadow="hover">
          <div slot="header" class="clearfix header-title">
            <span class="text-primary"><i class="el-icon-s-order text-blue"></i> 待办</span>
          </div>
          <div class="todo-list" @scroll="handleScroll">
            <div v-for="(todo, index) in todoList" :key="index" class="todo-item" @click="handleTodoClick(todo)">
              <div class="todo-icon-wrapper">
                <i :class="todo.icon" class="todo-icon"></i>
              </div>
              <div class="todo-content">
                <div class="todo-header">
                  <div class="todo-title text-primary">{{ todo.title }}</div>
                </div>
                <div class="todo-detail text-secondary">
                  <span class="todo-meta">
                    <i class="el-icon-office-building"></i> {{ todo.publisher }}
                  </span>
                  <span class="todo-meta">
                    <i class="el-icon-user"></i> {{ todo.sender }}
                  </span>
                </div>
                <div class="todo-detail text-secondary">
                  <span class="todo-meta">
                    <i class="el-icon-time"></i> 开始：{{ todo.startTime }}
                  </span>
                  <span class="todo-meta">
                    <i class="el-icon-date"></i> 接收：{{ todo.receiveTime }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="loading" class="loading-text text-secondary">
              <i class="el-icon-loading"></i> 加载中...
            </div>
            <div v-if="noMore" class="loading-text text-secondary">
              <i class="el-icon-document-checked"></i> 已加载全部待办事项
            </div>
            <div v-if="todoList.length === 0 && !loading" class="empty-todos">
              <i class="el-icon-document"></i>
              <p>暂无待办事项</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- Bottom Section: Charts (Full Width) -->
    <div class="bottom-section">
      <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix header-title">
          <span class="text-primary"><i class="el-icon-s-marketing text-blue"></i> 环节工作</span>
          <div class="header-actions">
              <el-button-group size="mini">
              <el-button type="primary" size="mini">环节工作</el-button>
              <el-button size="mini">环节问题</el-button>
            </el-button-group>
            <el-button type="text" size="mini" @click="refreshChart('linkWork')" icon="el-icon-refresh" style="margin-left: 10px;"></el-button>
          </div>
        </div>
        <div id="chart-link-work" class="chart-container"></div>
      </el-card>

        <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix header-title">
          <span class="text-primary"><i class="el-icon-s-cooperation text-blue"></i> 问题分级</span>
        </div>
        <div class="donut-chart-wrapper">
            <div class="chart-left-section">
              <div id="chart-issue-class" class="chart-container"></div>
              <!-- Center Text Overlay -->
              <div class="chart-center-text clickable" @click="handleIssueClick('total')">
                <div class="total-count text-primary">142</div>
                <div class="total-label text-secondary">问题总数</div>
              </div>
            </div>
            <!-- Legend -->
            <div class="donut-legend">
              <div class="legend-item" @click="handleIssueClick('general')">
                <span class="dot bg-yellow"></span>
                <span class="label text-secondary">一般</span>
                <span class="val clickable-number text-yellow">36个</span>
              </div>
              <div class="legend-item" @click="handleIssueClick('larger')">
                <span class="dot bg-orange"></span>
                <span class="label text-secondary">较大</span>
                <span class="val clickable-number text-orange">65个</span>
              </div>
              <div class="legend-item" @click="handleIssueClick('major')">
                <span class="dot bg-red"></span>
                <span class="label text-secondary">重大</span>
                <span class="val clickable-number text-red">41个</span>
              </div>
            </div>
        </div>
      </el-card>

        <el-card class="box-card" shadow="hover">
        <div slot="header" class="clearfix header-title">
          <span class="text-primary"><i class="el-icon-s-check text-blue"></i> 各项考核内容成绩</span>
        </div>
        <div id="chart-assessment" class="chart-container"></div>
      </el-card>
    </div>

    <!-- Details Dialog -->
    <el-dialog title="履职材料详情" :visible.sync="dialogVisible" width="400px">
      <div v-if="currentMaterial" class="dialog-content">
        <p class="text-primary mb-20"><strong>文件名:</strong> {{ currentMaterial.name }}</p>
        <p class="text-secondary"><strong>上传时间:</strong> {{ currentMaterial.date }}</p>
        <div class="mt-20 p-20 bg-blue-light text-blue" style="border-radius: 4px;">
           <i class="el-icon-info"></i> 点击下方按钮下载文件
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="dialogVisible = false">下载</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PersonalPortrait',
  constants: {
    CHART_COLORS: {
      primary: '#5b8ff9',
      secondary: '#f6bd16',
      success: '#00baad',
      warning: '#E6A23C',
      danger: '#F56C6C',
      info: '#909399'
    },
    CHART_CONFIG: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: '#333',
        textStyle: { color: '#fff' }
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      currentMaterial: null,
      isLoading: false,
      materials: Array(6).fill({
        name: '关于XXXXXXXXXXXX培训记录.PDF',
        date: '2025-09-29 15:33:21'
      }),
      todoList: [
        {
          title: '紧急计划审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-document-copy bg-blue-light text-blue'
        },
        {
          title: '紧急计划审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-document-copy bg-blue-light text-blue'
        },
        {
          title: '紧急计划审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-document-copy bg-blue-light text-blue'
        },
        {
          title: '紧急计划审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-document-copy bg-blue-light text-blue'
        },
        {
          title: '任务审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-document-checked bg-green-light text-green'
        },
        {
          title: '告预警单审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-warning-outline bg-orange-light text-orange'
        },
        {
          title: '计划审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-document-copy bg-blue-light text-blue'
        },
        {
          title: '告预警单审核',
          publisher: '国网福州公司',
          sender: '谭婷',
          startTime: '2024-12-1',
          receiveTime: '2024-12-1',
          icon: 'el-icon-warning-outline bg-orange-light text-orange'
        }
      ],
      loading: false,
      noMore: false,
      page: 1,
      charts: {},
      refreshInterval: null,
      refreshTimer: null
    }
  },
  mounted() {
    this.loadInitialData()
    this.initCharts()
    this.startAutoRefresh()
    window.addEventListener('resize', this.resizeCharts)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts)
    Object.values(this.charts).forEach(chart => chart.dispose())
    this.stopAutoRefresh()
  },
  methods: {
    async loadInitialData() {
      this.isLoading = true
      try {
        // 模拟数据加载
        await new Promise(resolve => setTimeout(resolve, 800))
        // 这里可以添加真实的数据获取逻辑
      } catch (error) {
        this.$message.error('数据加载失败，请刷新页面重试')
      } finally {
        this.isLoading = false
      }
    },
    handleScroll(e) {
      const { scrollTop, clientHeight, scrollHeight } = e.target
      if (scrollHeight - scrollTop - clientHeight <= 2) {
        this.loadMore()
      }
    },
    loadMore() {
      if (this.loading || this.noMore) return
      this.loading = true
      setTimeout(() => {
        // Simulate API response
        const newTodos = [
          {
            title: '计划审核',
            publisher: '国网福州公司',
            sender: '谭婷',
            startTime: '2024-12-1',
            receiveTime: '2024-12-1',
            icon: 'el-icon-document-copy bg-blue-light text-blue'
          },
          {
            title: '任务审核',
            publisher: '国网福州公司',
            sender: '谭婷',
            startTime: '2024-12-1',
            receiveTime: '2024-12-1',
            icon: 'el-icon-document-checked bg-green-light text-green'
          },
          {
            title: '告预警单审核',
            publisher: '国网福州公司',
            sender: '谭婷',
            startTime: '2024-12-1',
            receiveTime: '2024-12-1',
            icon: 'el-icon-warning-outline bg-orange-light text-orange'
          }
        ]
        
        // Stop after 5 pages (mock limit)
        if (this.page >= 5) {
          this.noMore = true
        } else {
          this.todoList = [...this.todoList, ...newTodos]
          this.page++
        }
        this.loading = false
      }, 1000)
    },
    handleTodoClick(todo) {
      // 查看待办详情
      this.$message.info(`查看待办：${todo.title}`)
      // 这里可以跳转到详情页面或打开详情弹窗
    },
    startAutoRefresh() {
      // 每30秒自动刷新数据
      this.refreshTimer = setInterval(() => {
        this.refreshData()
      }, 30000)
    },
    stopAutoRefresh() {
      if (this.refreshTimer) {
        clearInterval(this.refreshTimer)
        this.refreshTimer = null
      }
    },
    async refreshData() {
      try {
        // 这里可以添加真实的数据刷新逻辑
        console.log('数据自动刷新中...')
        // 模拟刷新监督指标数据
        this.updateMetrics()
      } catch (error) {
        console.error('数据刷新失败:', error)
      }
    },
    updateMetrics() {
      // 模拟数据更新
      const randomChange = () => Math.floor(Math.random() * 10) - 5
      // 这里可以添加实际的数据更新逻辑
    },
    refreshChart(chartName) {
      if (this.charts[chartName]) {
        this.charts[chartName].resize()
        this.$message.success('图表已刷新')
      }
    },
    handleExportReport() {
      this.$confirm('确定要导出个人监督报告吗？', '导出确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message.success('报告导出中...')
        // 模拟导出过程
        setTimeout(() => {
          this.$notify({
            title: '导出成功',
            message: '个人监督报告已导出至下载文件夹',
            type: 'success',
            duration: 3000
          })
        }, 1500)
      }).catch(() => {
        // 取消导出
      })
    },
    // 工具函数
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('zh-CN')
    },
    getStatusColor(status) {
      const colorMap = {
        '优秀': '#67C23A',
        '良好': '#409EFF',
        '一般': '#E6A23C',
        '较差': '#F56C6C'
      }
      return colorMap[status] || '#909399'
    },
    handleLinkClick(item) {
      this.currentMaterial = item
      this.dialogVisible = true
    },
    resizeCharts() {
      Object.values(this.charts).forEach(chart => chart.resize())
    },
    initCharts() {
      // 1. Link Work Chart (Bar + Line)
      this.initLinkWorkChart()
      // 2. Issue Classification Chart (Donut)
      this.initIssueClassChart()
      // 3. Assessment Radar Chart
      this.initAssessmentChart()
    },
    initLinkWorkChart() {
      const chartDom = document.getElementById('chart-link-work')
      const myChart = window.echarts.init(chartDom)
      this.charts.linkWork = myChart
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#333',
          textStyle: {
            color: '#fff'
          },
          formatter: function (params) {
            let res = params[0].name + '<br/>';
            params.forEach(item => {
              let unit = '个';
              if (item.seriesName === '监督效率') {
                unit = '%';
              }
              res += item.marker + item.seriesName + ': ' + item.value + unit + '<br/>';
            });
            return res;
          }
        },
        legend: {
          data: ['工作数', '发现问题数', '监督效率'],
          bottom: 0,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 10, color: '#666' }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['规划可研', '工程设计', '设备采购', '安装调试', '竣工验收'],
          axisLabel: { interval: 0, fontSize: 10, color: '#666' }
        },
        yAxis: [
          {
            type: 'value',
            name: '单位: 个',
            min: 0,
            max: 400,
            interval: 80,
            nameTextStyle: { fontSize: 10, color: '#666' },
            axisLabel: { color: '#666' }
          },
          {
            type: 'value',
            min: 0,
            max: 30,
            interval: 6,
            axisLabel: {
              formatter: '{value}',
              color: '#666'
            }
          }
        ],
        series: [
          {
            name: '工作数',
            type: 'bar',
            data: [40, 0, 250, 260, 180],
            itemStyle: { 
              color: '#5b8ff9',
              borderRadius: [4, 4, 0, 0]
            },
            barWidth: 15,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(91, 143, 249, 0.5)'
              }
            }
          },
          {
            name: '发现问题数',
            type: 'bar',
            data: [180, 100, 370, 360, 270],
            itemStyle: { color: '#f6bd16' },
            barWidth: 15
          },
          {
            name: '监督效率',
            type: 'line',
            yAxisIndex: 1,
            data: [16, 24, 12, 14, 24],
            itemStyle: { color: '#00baad' },
            symbol: 'circle',
            symbolSize: 6
          }
        ]
      }
      myChart.setOption(option)
    },
    initIssueClassChart() {
      const chartDom = document.getElementById('chart-issue-class')
      const myChart = window.echarts.init(chartDom)
      this.charts.issueClass = myChart
      
      const option = {
        // Title removed, using HTML overlay instead
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '问题分级',
            type: 'pie',
            radius: ['60%', '80%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: false
            },
            data: [
              { value: 36, name: '一般', itemStyle: { color: '#E6A23C' } },
              { value: 65, name: '较大', itemStyle: { color: '#FF9900' } }, // Adjusted Orange
              { value: 41, name: '重大', itemStyle: { color: '#F56C6C' } }  // Red
            ]
          }
        ]
      }
      myChart.setOption(option)
      
      // Add click event to chart segments
      myChart.on('click', (params) => {
        this.handleIssueClick(params.name)
      })
    },
    handleIssueClick(type) {
      const typeMap = {
        'total': '问题总数',
        'general': '一般问题',
        'larger': '较大问题',
        'major': '重大问题',
        '一般': '一般问题',
        '较大': '较大问题',
        '重大': '重大问题'
      }
      const label = typeMap[type] || type
      
      this.$msgbox({
        title: `${label}详情`,
        message: `这里展示${label}的具体列表数据...`,
        showCancelButton: false,
        confirmButtonText: '确定'
      })
    },
    initAssessmentChart() {
      const chartDom = document.getElementById('chart-assessment')
      const myChart = window.echarts.init(chartDom)
      this.charts.assessment = myChart
      
      const indicators = [
        { name: '专题监督任务', max: 30 },
        { name: '工作成效', max: 30 },
        { name: '监督问题', max: 30 },
        { name: '职称等级', max: 30 },
        { name: '专家称号', max: 30 },
        { name: '岗位认证', max: 30 },
        { name: '项目部参与度', max: 30 },
        { name: '监督结果应用', max: 30 }
      ]

      const option = {
        radar: {
          indicator: indicators,
          radius: '65%',
          center: ['45%', '60%'],
          splitNumber: 4,
          axisName: {
            color: '#666'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            // Check if params.value is array (it should be for radar)
            if (!Array.isArray(params.value)) return '';
            
            let res = `<div style="margin-bottom: 5px; font-weight: bold;">${params.name}</div>`;
            indicators.forEach((indicator, i) => {
              const val = params.value[i];
              const percent = ((val / indicator.max) * 100).toFixed(0) + '%';
              res += `<div style="display: flex; justify-content: space-between; min-width: 150px;">
                        <span>${indicator.name}:</span>
                        <span style="font-weight: bold;">${val} (${percent})</span>
                      </div>`;
            });
            return res;
          }
        },
        series: [
          {
            name: '考核成绩',
            type: 'radar',
            data: [
              {
                value: [25, 20, 22, 18, 26, 24, 28, 22],
                name: '成绩',
                areaStyle: {
                  color: 'rgba(64, 158, 255, 0.2)'
                },
                lineStyle: {
                  color: '#409EFF'
                },
                itemStyle: {
                  color: '#409EFF'
                },
                label: {
                  show: true,
                  formatter: (params) => {
                    // For radar charts, formatter params doesn't always include index easily in older versions
                    // But we can try to rely on the value.
                    // Or simpler: just show the percentage assuming max is 30 for now, 
                    // or remove label if it's too cluttered and rely on tooltip.
                    // User asked for "Radar chart displays percentage", so label is preferred.
                    return ((params.value / 30) * 100).toFixed(0) + '%';
                  },
                  color: '#333',
                  fontSize: 10
                }
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.personal-portrait {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

/* Layout */
  .top-section {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
    /* Ensure the grid items stretch to the same height */
    align-items: stretch;
  }
  .top-left-column {
    display: flex;
    flex-direction: column;
  }
  .top-right-column {
    display: flex;
    flex-direction: column;
  }

  /* Ensure the card inside top-right-column takes full height */
  .full-height-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  /* Ensure el-card__body inside full-height-card takes full height and flexes */
  .full-height-card ::v-deep .el-card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent body scroll, let list scroll */
    padding: 20px; /* Optional: reset padding if needed */
  }

  .middle-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
  }
  .bottom-section {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  
  /* Colors */
  .text-blue { color: #409EFF; }
.text-orange { color: #E6A23C; }
.text-red { color: #F56C6C; }
.text-yellow { color: #F4D03F; }
.text-gray { color: #909399; }

.text-primary { color: #333333; }
.text-secondary { color: #666666; }

.text-underline {
  text-decoration: underline;
  cursor: pointer;
}
.text-underline:hover {
  color: #66b1ff;
}

.bg-blue-light { background-color: #ecf5ff; }
.bg-green-light { background-color: #e1f3d8; }
.bg-orange-light { background-color: #fdf6ec; }
.bg-yellow { background-color: #F4D03F; }
.bg-orange { background-color: #EB984E; }
.bg-red { background-color: #E74C3C; }
.bg-blue { background-color: #409EFF; }
.bg-green { background-color: #13ce66; }

.mb-20 { margin-bottom: 20px; }
.mt-10 { margin-top: 10px; }
.mt-20 { margin-top: 20px; }
.ml-5 { margin-left: 5px; }
.ml-10 { margin-left: 10px; }
.mr-10 { margin-right: 10px; }
.p-20 { padding: 20px; }

.header-title {
  font-weight: bold;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* User Profile */
.user-profile-wrapper {
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #ffffff, #f0f5ff);
  padding: 20px;
  border-radius: 8px;
}
.avatar-section {
  margin-right: 20px;
}
.info-section {
  flex: 1;
}
.user-name {
  font-size: 20px;
  font-weight: bold;
}
.role-row {
  font-size: 14px;
}
.project-row {
  font-size: 14px;
}
.blue-text {
  color: #409EFF;
  font-weight: bold;
}
.score-section {
  display: flex;
  gap: 20px;
}
.score-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #d9ecff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.score-label {
  font-size: 12px;
}
.score-value {
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}
.unit {
  font-size: 14px;
}
.result-circle .score-value {
  font-size: 20px;
}

/* Metric List (New Style) */
.metric-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px dashed #eee;
}
.metric-item:last-child {
  border-bottom: none;
}
.icon-wrapper {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  font-size: 30px;
  flex-shrink: 0;
}
.metric-row-content {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}
.metric-data-point {
  display: flex;
  align-items: center;
  font-size: 14px;
}
.metric-data-point .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}
.metric-data-point .label {
  color: #666;
  margin-right: 8px;
}
.metric-data-point .value {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  margin-right: 5px;
}
.metric-data-point .large-val {
  font-size: 30px;
}
.no-dot {
  display: flex;
  align-items: center;
}

/* Material List */
.material-list {
  max-height: 250px;
  overflow-y: auto;
}
.material-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f5f7fa;
}
.material-info {
  display: flex;
  align-items: center;
}
.pdf-icon {
  margin-right: 8px;
  font-size: 16px;
}
.material-link {
  color: #409EFF;
  text-decoration: none;
  font-size: 14px;
}
.material-date {
  font-size: 12px;
}

/* Charts */
.chart-container {
  width: 100%;
  height: 100%;
}
.donut-chart-wrapper {
  display: flex;
  align-items: center;
  position: relative; /* For absolute positioning of center text */
  justify-content: flex-start; /* Left align */
  height: 250px;
}
.chart-left-section {
  position: relative;
  width: 50%;
  height: 100%;
}
/* Center Text Overlay */
.chart-center-text {
  position: absolute;
  top: 50%;
  left: 50%; /* Center in left section */
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s;
}
.chart-center-text:hover {
  transform: translate(-50%, -50%) scale(1.05);
}
.total-count {
  font-size: 32px;
  font-weight: bold;
  color: #409EFF;
  line-height: 1.2;
  text-decoration: underline; /* Indicate clickability */
}
.total-label {
  font-size: 14px;
  margin-top: 5px;
}

/* Legend Styles */
.donut-legend {
  margin-left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%; /* Right half */
  padding-left: 20px; /* Gap */
}
.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.2s;
}
.legend-item:hover {
  background-color: #f5f7fa;
}
.legend-item .label {
  margin-left: 5px;
  font-size: 14px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
  flex-shrink: 0;
}
.val {
  margin-left: auto;
  font-weight: bold;
  padding-left: 15px;
  font-size: 16px;
}
.clickable-number {
  text-decoration: underline;
  cursor: pointer;
}
.clickable-number:hover {
  opacity: 0.8;
}

/* Colors */
.text-yellow { color: #E6A23C; }
.bg-yellow { background-color: #E6A23C; }
.text-orange { color: #FF9900; }
.bg-orange { background-color: #FF9900; }
.text-red { color: #F56C6C; }
.bg-red { background-color: #F56C6C; }

/* Todo List */
.full-height-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.todo-list {
  height: 350px;
  overflow-y: auto;
  padding: 0 5px;
}
.todo-item {
  display: flex;
  padding: 15px 10px;
  border-bottom: 1px solid #EBEEF5;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin-bottom: 5px;
}
.todo-item:hover {
  background-color: #f5f7fa;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.todo-icon-wrapper {
  margin-right: 15px;
  flex-shrink: 0;
}
.todo-icon {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.todo-content {
  flex: 1;
  min-width: 0;
}
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.todo-title {
  font-weight: bold;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-detail {
  font-size: 12px;
  line-height: 1.6;
  color: #909399;
}
.todo-meta {
  display: inline-flex;
  align-items: center;
}
.todo-meta i {
  margin-right: 4px;
}
/* Empty State */
.empty-state {
  padding: 40px 0;
  text-align: center;
  color: #909399;
}
.empty-todos i {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}
.empty-todos p {
  font-size: 14px;
  margin: 0;
}

.loading-text {
  text-align: center;
  padding: 15px;
  font-size: 12px;
  color: #909399;
}
/* Loading Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #409EFF;
}

/* Responsive Design */
@media screen and (max-width: 1200px) {
  .top-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .bottom-section {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .user-profile-wrapper {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .score-section {
    justify-content: center;
    margin-top: 20px;
  }
}

@media screen and (max-width: 768px) {
  .personal-portrait {
    padding: 10px;
  }
  
  .metric-row-content {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  
  .metric-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .icon-wrapper {
    margin-bottom: 15px;
  }
  
  .chart-container {
    height: 200px;
  }
  
  .donut-chart-wrapper {
    flex-direction: column;
  }
  
  .donut-legend {
    margin-left: 0;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
}

@media screen and (max-width: 480px) {
  .user-name {
    font-size: 20px;
  }
  
  .score-circle {
    width: 80px;
    height: 80px;
  }
  
  .score-value {
    font-size: 20px;
  }
  
  .todo-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .todo-icon-wrapper {
    margin-bottom: 10px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .personal-portrait {
    background-color: #1a1a1a;
    color: #e0e0e0;
  }
  
  .el-card {
    background-color: #2d2d2d;
    border-color: #444;
  }
  
  .text-primary {
    color: #66b1ff !important;
  }
  
  .text-secondary {
    color: #b0b0b0 !important;
  }
}

/* Animation for chart loading */
@keyframes chartFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chart-container {
  animation: chartFadeIn 0.6s ease-out;
}

/* Hover effects for better interactivity */
.metric-item:hover {
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.todo-item:hover {
  background-color: #f5f7fa;
  transition: background-color 0.3s ease;
}

.material-item:hover {
  background-color: #f5f7fa;
  transition: background-color 0.3s ease;
}
</style>
