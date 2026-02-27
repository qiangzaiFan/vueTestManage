<template>
  <div class="data-dashboard">
    <el-row :gutter="20" type="flex">
      <!-- Left Content Area (75%) -->
      <el-col :span="18" class="left-content">
        <!-- Top Row -->
        <el-row :gutter="20" class="top-row">
          <!-- Performance Classification -->
          <el-col :span="8" class="full-height-col">
            <pms-card class="box-card full-height-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span class="card-title"><i class="el-icon-s-order"></i> 业绩分类统计情况</span>
              </div>
              <div id="performance-chart" class="chart-container"></div>
            </pms-card>
          </el-col>
          
          <!-- Unit Statistics -->
          <el-col :span="16" class="full-height-col">
            <pms-card class="box-card full-height-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span class="card-title"><i class="el-icon-s-data"></i> 各单位监督人员数量及发现问题情况</span>
              </div>
              <div id="unit-stats-chart" class="chart-container"></div>
            </pms-card>
          </el-col>
        </el-row>

        <!-- Bottom Row -->
        <el-row :gutter="20" class="bottom-row">
          <!-- Dual-qualification Level -->
          <el-col :span="8" class="full-height-col">
            <pms-card class="box-card full-height-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span class="card-title"><i class="el-icon-s-check"></i> 双师等级统计</span>
                <div class="header-tags">
                  <el-tag size="mini" effect="dark" class="tag-title">职称</el-tag>
                  <el-tag size="mini" type="info" class="tag-skill">技能等级</el-tag>
                </div>
              </div>
              <div id="dual-qualification-chart" class="chart-container-small"></div>
            </pms-card>
          </el-col>

          <!-- Expert Title Statistics -->
          <el-col :span="8" class="full-height-col">
            <pms-card class="box-card full-height-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span class="card-title"><i class="el-icon-s-custom"></i> 专家称号统计情况</span>
              </div>
              <div id="expert-title-chart" class="chart-container-small"></div>
            </pms-card>
          </el-col>

          <!-- Years of Service -->
          <el-col :span="8" class="full-height-col">
            <pms-card class="box-card full-height-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span class="card-title"><i class="el-icon-date"></i> 从事岗位年限</span>
              </div>
              <div class="years-list">
                <div v-for="(item, index) in yearsStats" :key="index" class="year-item">
                  <div class="year-header">
                    <div class="year-label">{{ item.label }}</div>
                  </div>
                  <div class="progress-wrapper">
                    <el-progress :percentage="item.percent" :show-text="false" :stroke-width="12" color="#6f7ad3"></el-progress>
                  </div>
                  <div class="year-info">
                    <span class="progress-percent">占比 <span class="highlight-blue">{{ item.percent }}%</span></span>
                    <span class="progress-count">人数 <span class="highlight-blue">{{ item.count }}人</span></span>
                  </div>
                </div>
              </div>
            </pms-card>
          </el-col>
        </el-row>
      </el-col>

      <!-- Right Content Area (25%) -->
      <el-col :span="6">
        <!-- Profession Statistics (Full Height) -->
        <pms-card class="box-card full-height-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="card-title"><i class="el-icon-s-claim"></i> 各专业统计情况</span>
          </div>
          <div class="profession-list">
            <div v-for="(item, index) in professionStats" :key="index" class="profession-item">
              <div class="profession-header">
                <span class="profession-rank">{{ index + 1 }}、</span>
                <span class="profession-name">{{ item.name }}</span>
                <span class="profession-percent">占比 <span class="highlight-blue">{{ item.percent }}%</span></span>
              </div>
              <el-progress :percentage="item.percent" :show-text="false" :stroke-width="6" color="#4a7cea"></el-progress>
              <div class="profession-details">
                <div class="detail-item">
                  <div class="detail-value highlight-blue">{{ item.supervisors }}人</div>
                  <div class="detail-label">监督人员数</div>
                </div>
                <div class="detail-item">
                  <div class="detail-value highlight-cyan">{{ item.tasks }}个</div>
                  <div class="detail-label">参与任务数</div>
                </div>
                <div class="detail-item">
                  <div class="detail-value highlight-orange">{{ item.problems }}个</div>
                  <div class="detail-label">发现问题数</div>
                </div>
              </div>
            </div>
          </div>
        </pms-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DataDashboard',
  data() {
    return {
      professionStats: [
        { name: '电气设备性能（变压器）', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '电气设备性能（开关）', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '电气设备性能（输电）', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '电气设备性能（配电）', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '电能质量', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '辅助设施', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '金属材料', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '绝缘材料', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
        { name: '继电保护', percent: 25.21, supervisors: 36, tasks: 138, problems: 221 },
      ],
      yearsStats: [
        { label: '0-5年', percent: 25.43, count: 25 },
        { label: '5-15年', percent: 25.43, count: 25 },
        { label: '15-25年', percent: 25.43, count: 25 },
        { label: '25年及以上', percent: 25.43, count: 25 },
      ]
    };
  },
  mounted() {
    this.initCharts();
    window.addEventListener('resize', this.resizeCharts);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCharts);
  },
  methods: {
    initCharts() {
      if (!window.echarts) {
        console.error('ECharts is not loaded');
        return;
      }
      this.initPerformanceChart();
      this.initUnitStatsChart();
      this.initDualQualificationChart();
      this.initExpertTitleChart();
    },
    resizeCharts() {
      const charts = [
        'performanceChart',
        'unitStatsChart',
        'dualQualificationChart',
        'expertTitleChart'
      ];
      charts.forEach(chart => {
        if (this[chart]) {
          this[chart].resize();
        }
      });
    },
    initPerformanceChart() {
      const chartDom = document.getElementById('performance-chart');
      this.performanceChart = window.echarts.init(chartDom);
      const option = {
        color: [
          '#00bfa5', '#4a7cea', '#ffc107', '#ff5252', '#40c4ff', '#7c4dff',
          '#ffab40', '#00e676', '#536dfe', '#ff4081', '#ff9100', '#18ffff', '#69f0ae'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c}个 ({d}%)'
        },
        legend: {
          bottom: '0',
          left: 'center',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 10 },
          width: '90%'
        },
        series: [
          {
            name: '业绩分类',
            type: 'pie',
            radius: ['0%', '60%'],
            center: ['50%', '40%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: true,
              formatter: '{b} {c}个',
              backgroundColor: '#fff',
              borderColor: '#ddd',
              borderWidth: 1,
              borderRadius: 4,
              padding: [5, 10],
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 5
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10
            },
            data: [
              { value: 7, name: '典型案例', label: { show: true } },
              { value: 5, name: '应知应会', label: { show: false } },
              { value: 4, name: '监督简报', label: { show: false } },
              { value: 6, name: '质量问题', label: { show: false } },
              { value: 5, name: '不良行为', label: { show: false } },
              { value: 3, name: '家族缺陷', label: { show: false } },
              { value: 4, name: '总部监督任务', label: { show: false } },
              { value: 5, name: '专题活动', label: { show: false } },
              { value: 4, name: '监督论坛', label: { show: false } },
              { value: 3, name: '国网级竞赛', label: { show: false } },
              { value: 2, name: '标准制定', label: { show: false } },
              { value: 3, name: '监督方案', label: { show: false } },
              { value: 4, name: '监督培训', label: { show: false } }
            ]
          }
        ]
      };
      this.performanceChart.setOption(option);
    },
    initUnitStatsChart() {
      const chartDom = document.getElementById('unit-stats-chart');
      this.unitStatsChart = window.echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['监督人员数', '活跃人员数', '参与任务数', '发现问题数'],
          top: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['福州', '厦门', '漳州', '泉州', '三明', '莆田', '南平', '龙岩', '宁德'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位：人',
            min: 0,
            max: 50,
            interval: 10,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '单位：个',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '监督人员数',
            type: 'bar',
            data: [15, 8, 13, 38, 32, 12, 28, 6, 17],
            itemStyle: { color: '#00bfa5' }
          },
          {
            name: '活跃人员数',
            type: 'bar',
            data: [5, 2, 4, 26, 10, 6, 15, 3, 8],
            itemStyle: { color: '#7c4dff' }
          },
          {
            name: '参与任务数',
            type: 'bar',
            yAxisIndex: 1,
            data: [16, 10, 8, 56, 12, 11, 19, 11, 26],
            itemStyle: { color: '#4a7cea' }
          },
          {
            name: '发现问题数',
            type: 'bar',
            yAxisIndex: 1,
            data: [20, 18, 16, 45, 38, 19, 21, 16, 30],
            itemStyle: { color: '#ffab40' }
          }
        ]
      };
      this.unitStatsChart.setOption(option);
    },
    initDualQualificationChart() {
      const chartDom = document.getElementById('dual-qualification-chart');
      this.dualQualificationChart = window.echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '3736个',
          subtext: '总数',
          left: 'center',
          top: '38%',
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#4a7cea'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#909399'
          }
        },
        legend: {
          bottom: '0',
          left: 'center',
          data: ['助理工程师', '正高级工程师', '工程师', '无', '高级工程师'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 10 }
        },
        series: [
          {
            name: '双师等级',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 365, name: '助理工程师', itemStyle: { color: '#4DB6AC' } },
              { value: 365, name: '正高级工程师', itemStyle: { color: '#FF8A65' } },
              { value: 125, name: '工程师', itemStyle: { color: '#29B6F6' } },
              { value: 125, name: '无', itemStyle: { color: '#4a7cea' } },
              { value: 125, name: '高级工程师', itemStyle: { color: '#FFCA28' } }
            ]
          }
        ]
      };
      this.dualQualificationChart.setOption(option);
    },
    initExpertTitleChart() {
      const chartDom = document.getElementById('expert-title-chart');
      this.expertTitleChart = window.echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item'
        },
        title: {
          text: '3736个',
          subtext: '总数',
          left: 'center',
          top: '38%',
          textStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#4a7cea'
          },
          subtextStyle: {
            fontSize: 14,
            color: '#909399'
          }
        },
        legend: {
          bottom: '0',
          left: 'center',
          data: ['大专', '研究生', '本科', '博士及以上'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: { fontSize: 10 }
        },
        series: [
          {
            name: '专家称号',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 365, name: '大专', itemStyle: { color: '#4DB6AC' } },
              { value: 365, name: '研究生', itemStyle: { color: '#FF8A65' } },
              { value: 125, name: '本科', itemStyle: { color: '#29B6F6' } },
              { value: 125, name: '博士及以上', itemStyle: { color: '#FF7043' } }
            ]
          }
        ]
      };
      this.expertTitleChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.data-dashboard {
  padding: 20px;
  background-color: #f0f2f5;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.box-card {
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
}
.card-title {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}
.card-title i {
  color: #4a7cea;
  margin-right: 5px;
}
.profession-item {
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.profession-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 14px;
}
.profession-name {
  font-weight: bold;
  flex: 1;
}
.profession-percent {
  color: #999;
  font-size: 14px;
}
.profession-details {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
  background-color: #f5f9ff;
  padding: 10px 0;
  border-radius: 4px;
}
.detail-item {
  flex: 1;
  position: relative;
}
.detail-item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 10%;
  height: 80%;
  border-right: 1px dashed #dcdfe6;
}
.detail-value {
  font-weight: bold;
  margin-bottom: 2px;
}
.detail-label {
  color: #999;
}
.highlight-blue {
  color: #4a7cea;
}
.highlight-cyan {
  color: #00bfa5;
}
.highlight-orange {
  color: #ffab40;
}
.year-item {
  margin-bottom: 20px;
  background-color: #f5f9ff;
  padding: 15px;
  border-radius: 4px;
}
.year-header {
  margin-bottom: 10px;
}
.year-label {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}
.year-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999;
  margin-top: 8px;
}

.progress-info {
  margin-bottom: 5px;
  font-size: 14px;
  color: #999;
}
.progress-percent {
  color: #999;
}
.progress-count {
  color: #999;
}
.highlight-blue {
  color: #4a7cea;
  font-weight: bold;
}
.progress-wrapper {
  margin-top: 5px;
}
.progress-wrapper ::v-deep .el-progress-bar__outer {
  background-color: #f0f2f5;
}
.progress-wrapper ::v-deep .el-progress-bar__inner {
  border-radius: 100px;
}

/* Layout Classes */
.data-dashboard > .el-row {
  height: 100%;
}
.left-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.top-row {
  height: calc(50% - 10px);
  margin-bottom: 20px;
}
.bottom-row {
  height: calc(50% - 10px);
  display: flex;
  margin-top: 0 !important;
}
.full-height-col {
  height: 100%;
}
.chart-container {
  height: 100%;
  min-height: 200px;
}
.chart-container-small {
  height: 100%;
  min-height: 180px;
}
.full-height-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.full-height-card ::v-deep .pms-card__body {
  flex: 1;
  height: 0;
  overflow: hidden;
  padding: 10px 20px;
}
.header-tags {
  float: right;
}
.tag-title {
  border-color: #4a7cea;
  background-color: #4a7cea;
  color: #fff;
}
.tag-skill {
  margin-left: 5px;
}
.years-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.profession-list {
  height: 100%;
  overflow-y: auto;
}
</style>
