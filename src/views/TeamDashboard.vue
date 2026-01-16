<template>
  <div class="team-dashboard">
    <team-header></team-header>

    <div class="statistics-section">
      <el-row :gutter="20" type="flex">
        <el-col :span="8">
          <distribution-card
            title="年龄分布"
            :total="200"
            icon="el-icon-suitcase"
            icon-color="#409EFF"
            :data="ageData"
            default-color="#409EFF"
          ></distribution-card>
        </el-col>
        <el-col :span="8">
          <distribution-card
            title="学历分布"
            :total="200"
            icon="el-icon-school"
            icon-color="#13ce66"
            :data="educationData"
            default-color="#13ce66"
          ></distribution-card>
        </el-col>
        <el-col :span="8">
          <distribution-card
            title="职称分布"
            :total="200"
            icon="el-icon-medal"
            icon-color="#E6A23C"
            :data="jobTitleData"
            default-color="#E6A23C"
          ></distribution-card>
        </el-col>
      </el-row>
    </div>

    <div class="charts-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card shadow="hover">
            <div slot="header" class="chart-header">
              <span class="chart-title">输电线路跳闸率</span>
              <div class="chart-legend">
                <span class="legend-item"><i class="legend-dot blue"></i>输电线路跳闸率</span>
              </div>
            </div>
            <div id="tripRateChart" class="chart-container"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <div slot="header" class="chart-header">
              <span class="chart-title">两率年度统计</span>
              <div class="chart-legend">
                <!-- Legend handled by echarts, or custom if needed to match design exactly. ECharts legend is usually fine. -->
              </div>
            </div>
            <div id="annualStatsChart" class="chart-container"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import TeamHeader from '@/components/TeamHeader.vue'
import DistributionCard from '@/components/DistributionCard.vue'

export default {
  name: 'TeamDashboard',
  components: {
    TeamHeader,
    DistributionCard
  },
  data() {
    return {
      ageData: [
        { label: '5年及以下', value: 60, percentage: 15, color: '#409EFF' },
        { label: '5-10年', value: 124, percentage: 62, color: '#409EFF' },
        { label: '10-20年', value: 30, percentage: 15, color: '#409EFF' },
        { label: '20年以上', value: 16, percentage: 8, color: '#409EFF' }
      ],
      educationData: [
        { label: '大专及以下', value: 18, percentage: 9, color: '#13ce66' },
        { label: '本科', value: 110, percentage: 55, color: '#13ce66' },
        { label: '硕士', value: 54, percentage: 27, color: '#13ce66' },
        { label: '博士', value: 18, percentage: 9, color: '#13ce66' }
      ],
      jobTitleData: [
        { label: '初级', value: 80, percentage: 40, color: '#E6A23C' },
        { label: '中级', value: 54, percentage: 27, color: '#E6A23C' },
        { label: '高级', value: 40, percentage: 20, color: '#E6A23C' },
        { label: '副高', value: 14, percentage: 7, color: '#E6A23C' },
        { label: '正高', value: 12, percentage: 6, color: '#E6A23C' }
      ],
      tripRateChart: null,
      annualStatsChart: null
    }
  },
  mounted() {
    this.initCharts()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.tripRateChart) this.tripRateChart.dispose()
    if (this.annualStatsChart) this.annualStatsChart.dispose()
  },
  methods: {
    handleResize() {
      if (this.tripRateChart) this.tripRateChart.resize()
      if (this.annualStatsChart) this.annualStatsChart.resize()
    },
    initCharts() {
      // Check if echarts is available
      if (!window.echarts) {
        console.error('ECharts not loaded')
        return
      }

      this.initTripRateChart()
      this.initAnnualStatsChart()
    },
    initTripRateChart() {
      const chartDom = document.getElementById('tripRateChart')
      this.tripRateChart = window.echarts.init(chartDom)
      
      const option = {
        legend: {
          data: ['输电线路跳闸率'],
          top: 0,
          right: 0,
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisLine: { lineStyle: { color: '#ddd' } },
          axisLabel: { color: '#666' }
        },
        yAxis: {
          type: 'value',
          name: '单位：%',
          min: 0,
          max: 10,
          splitLine: { lineStyle: { type: 'dashed' } }
        },
        series: [{
          name: '输电线路跳闸率',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: '#409EFF'
          },
          areaStyle: {
            color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgba(64, 158, 255, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(64, 158, 255, 0.05)'
            }])
          },
          data: [4.5, 7.0, 5.5, 4.3, 5.2, 3.9, 4.4, 4.2, 6.0, 6.4, 6.8, 5.6]
        }]
      }
      
      this.tripRateChart.setOption(option)
    },
    initAnnualStatsChart() {
      const chartDom = document.getElementById('annualStatsChart')
      this.annualStatsChart = window.echarts.init(chartDom)
      
      const option = {
        title: [
          {
             text: '关键业务自主实施能力覆盖率：',
             left: 0,
             top: 0,
             textStyle: {
               fontSize: 12,
               fontWeight: 'normal',
               color: '#606266'
             }
           },
           {
             text: '年度关键业务自主实施类型覆盖率：',
             left: 360,
             top: 0,
             textStyle: {
               fontSize: 12,
               fontWeight: 'normal',
               color: '#606266'
             }
           }
         ],
         legend: [
           {
             data: ['关键业务自主实施能力覆盖率 I类', '关键业务自主实施能力覆盖率 II类'],
             top: 0,
             left: 200,
             itemWidth: 25,
             itemHeight: 14,
             textStyle: { fontSize: 12, color: '#606266' },
             formatter: function (name) {
               return name.includes('I类') ? 'I 类' : 'II 类'
             }
           },
           {
             data: ['年度关键业务自主实施类型覆盖率 I类', '年度关键业务自主实施类型覆盖率 II类'],
             top: 0,
             left: 580,
             itemWidth: 25,
             itemHeight: 14,
             textStyle: { fontSize: 12, color: '#606266' },
             formatter: function (name) {
               return name.includes('I类') ? 'I 类' : 'II 类'
             }
           }
         ],
         grid: {
          top: 80, // Adjust top margin to accommodate 2 rows of legend and titles
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          axisLine: { lineStyle: { color: '#ddd' } },
          axisLabel: { color: '#666' }
        },
        yAxis: {
          type: 'value',
          name: '单位：%',
          min: 70,
          max: 95,
          splitLine: { lineStyle: { type: 'dashed' } }
        },
        series: [
          {
            name: '关键业务自主实施能力覆盖率 I类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 6,
            itemStyle: { color: '#409EFF' },
            data: [78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89]
          },
          {
            name: '关键业务自主实施能力覆盖率 II类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 6,
            itemStyle: { color: '#13ce66' },
            data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
          },
          {
            name: '年度关键业务自主实施类型覆盖率 I类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 6,
            itemStyle: { color: '#E6A23C' },
            data: [76, 77, 77.5, 77.8, 78, 78.5, 78.8, 79, 79.2, 79.5, 79.8, 80]
          },
          {
            name: '年度关键业务自主实施类型覆盖率 II类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 6,
            itemStyle: { color: '#F56C6C' },
            data: [79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
          }
        ]
      }
      
      this.annualStatsChart.setOption(option)
    }
  }
}
</script>

<style scoped>
.team-dashboard {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
}

.statistics-section {
  margin-bottom: 20px;
}

.charts-section {
  margin-bottom: 20px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.chart-title::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 16px;
  background-color: #409EFF;
  margin-right: 8px;
  vertical-align: middle;
  border-radius: 2px;
}

.chart-container {
  height: 300px;
  width: 100%;
}

.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
}

.legend-dot.blue {
  background-color: #409EFF;
}

.legend-item {
  font-size: 12px;
  color: #606266;
}
</style>
