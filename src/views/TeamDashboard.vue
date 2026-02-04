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
            <div slot="header" class="chart-header custom-header">
              <div class="legend-container">
                <!-- 达标率 -->
                <div class="legend-group">
                  <div class="legend-content" @click="toggleSeries('达标率')">
                    <span class="legend-icon solid-blue"></span>
                    <span class="legend-text">达标率</span>
                  </div>
                  <div class="sort-wrapper">
                    <i class="el-icon-caret-top sort-btn" :class="{active: sortField === 'complianceRate' && sortOrder === 'asc'}" @click.stop="handleSort('complianceRate', 'asc')"></i>
                    <i class="el-icon-caret-bottom sort-btn" :class="{active: sortField === 'complianceRate' && sortOrder === 'desc'}" @click.stop="handleSort('complianceRate', 'desc')"></i>
                  </div>
                </div>

                <!-- 关键业务自主实施能力覆盖率 -->
                <div class="legend-group">
                   <span class="legend-title">关键业务自主实施能力覆盖率：</span>
                   <div class="legend-sub-group">
                      <div class="legend-content" @click="toggleSeries('关键业务自主实施能力覆盖率 I类')">
                        <span class="legend-icon hollow-purple"></span>
                        <span class="legend-text">I 类</span>
                      </div>
                      <div class="sort-wrapper">
                        <i class="el-icon-caret-top sort-btn" :class="{active: sortField === 'capabilityCoverage1' && sortOrder === 'asc'}" @click.stop="handleSort('capabilityCoverage1', 'asc')"></i>
                        <i class="el-icon-caret-bottom sort-btn" :class="{active: sortField === 'capabilityCoverage1' && sortOrder === 'desc'}" @click.stop="handleSort('capabilityCoverage1', 'desc')"></i>
                      </div>
                   </div>
                   <div class="legend-sub-group">
                      <div class="legend-content" @click="toggleSeries('关键业务自主实施能力覆盖率 II类')">
                        <span class="legend-icon hollow-teal"></span>
                        <span class="legend-text">II 类</span>
                      </div>
                      <div class="sort-wrapper">
                        <i class="el-icon-caret-top sort-btn" :class="{active: sortField === 'capabilityCoverage2' && sortOrder === 'asc'}" @click.stop="handleSort('capabilityCoverage2', 'asc')"></i>
                        <i class="el-icon-caret-bottom sort-btn" :class="{active: sortField === 'capabilityCoverage2' && sortOrder === 'desc'}" @click.stop="handleSort('capabilityCoverage2', 'desc')"></i>
                      </div>
                   </div>
                </div>

                <!-- 年度关键业务自主实施类型覆盖率 -->
                <div class="legend-group">
                   <span class="legend-title">年度关键业务自主实施类型覆盖率：</span>
                   <div class="legend-sub-group">
                      <div class="legend-content" @click="toggleSeries('年度关键业务自主实施类型覆盖率 I类')">
                        <span class="legend-icon hollow-orange"></span>
                        <span class="legend-text">I 类</span>
                      </div>
                      <div class="sort-wrapper">
                        <i class="el-icon-caret-top sort-btn" :class="{active: sortField === 'typeCoverage1' && sortOrder === 'asc'}" @click.stop="handleSort('typeCoverage1', 'asc')"></i>
                        <i class="el-icon-caret-bottom sort-btn" :class="{active: sortField === 'typeCoverage1' && sortOrder === 'desc'}" @click.stop="handleSort('typeCoverage1', 'desc')"></i>
                      </div>
                   </div>
                   <div class="legend-sub-group">
                      <div class="legend-content" @click="toggleSeries('年度关键业务自主实施类型覆盖率 II类')">
                        <span class="legend-icon hollow-pink"></span>
                        <span class="legend-text">II 类</span>
                      </div>
                      <div class="sort-wrapper">
                        <i class="el-icon-caret-top sort-btn" :class="{active: sortField === 'typeCoverage2' && sortOrder === 'asc'}" @click.stop="handleSort('typeCoverage2', 'asc')"></i>
                        <i class="el-icon-caret-bottom sort-btn" :class="{active: sortField === 'typeCoverage2' && sortOrder === 'desc'}" @click.stop="handleSort('typeCoverage2', 'desc')"></i>
                      </div>
                   </div>
                </div>
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
      annualStatsChart: null,
      sortField: '',
      sortOrder: '',
      annualStatsData: [
        { name: '拉萨', complianceRate: 96.2, capabilityCoverage1: 88.0, capabilityCoverage2: 85.5, typeCoverage1: 92.0, typeCoverage2: 78.5 },
        { name: '日喀则', complianceRate: 95.5, capabilityCoverage1: 92.0, capabilityCoverage2: 87.0, typeCoverage1: 92.0, typeCoverage2: 78.5 },
        { name: '山南', complianceRate: 94.2, capabilityCoverage1: 93.0, capabilityCoverage2: 88.0, typeCoverage1: 92.0, typeCoverage2: 79.5 },
        { name: '林芝', complianceRate: 93.5, capabilityCoverage1: 94.0, capabilityCoverage2: 86.5, typeCoverage1: 92.0, typeCoverage2: 79.5 },
        { name: '那曲', complianceRate: 92.5, capabilityCoverage1: 88.0, capabilityCoverage2: 85.8, typeCoverage1: 91.8, typeCoverage2: 78.5 },
        { name: '昌都', complianceRate: 91.0, capabilityCoverage1: 89.0, capabilityCoverage2: 86.5, typeCoverage1: 92.0, typeCoverage2: 78.5 },
        { name: '阿里', complianceRate: 89.8, capabilityCoverage1: 83.5, capabilityCoverage2: 87.5, typeCoverage1: 92.0, typeCoverage2: 79.5 },
        { name: '超高压', complianceRate: 81.0, capabilityCoverage1: 81.0, capabilityCoverage2: 88.8, typeCoverage1: 92.0, typeCoverage2: 79.5 }
      ]
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
          top: 10,
          left: 'center',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          textStyle: { fontSize: 12, color: '#606266' }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
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
      this.updateAnnualStatsChart()
    },
    updateAnnualStatsChart() {
      if (!this.annualStatsChart) return

      // Sort data
      let data = [...this.annualStatsData]
      if (this.sortField && this.sortOrder) {
        data.sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a[this.sortField] - b[this.sortField]
          } else {
            return b[this.sortField] - a[this.sortField]
          }
        })
      }

      const xAxisData = data.map(item => item.name)
      const seriesData = {
        complianceRate: data.map(item => item.complianceRate),
        capabilityCoverage1: data.map(item => item.capabilityCoverage1),
        capabilityCoverage2: data.map(item => item.capabilityCoverage2),
        typeCoverage1: data.map(item => item.typeCoverage1),
        typeCoverage2: data.map(item => item.typeCoverage2)
      }

      const option = {
        legend: {
          show: false, // Hide default legend
          data: ['达标率', '关键业务自主实施能力覆盖率 I类', '关键业务自主实施能力覆盖率 II类', '年度关键业务自主实施类型覆盖率 I类', '年度关键业务自主实施类型覆盖率 II类']
        },
        grid: {
          top: '10%',
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
          data: xAxisData,
          axisLine: { lineStyle: { color: '#ddd' } },
          axisLabel: { color: '#666' }
        },
        yAxis: {
          type: 'value',
          name: '单位：%',
          min: 75,
          max: 100,
          splitLine: { lineStyle: { type: 'dashed' } }
        },
        series: [
          {
            name: '达标率',
            type: 'line',
            smooth: false,
            symbol: 'circle', // Solid dot
            symbolSize: 8,
            itemStyle: { color: '#409EFF' },
            lineStyle: { width: 2 },
            data: seriesData.complianceRate
          },
          {
            name: '关键业务自主实施能力覆盖率 I类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle', // Hollow
            symbolSize: 8,
            itemStyle: { color: '#8A2BE2' }, // Purple
            lineStyle: { width: 2 },
            data: seriesData.capabilityCoverage1
          },
          {
            name: '关键业务自主实施能力覆盖率 II类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: { color: '#13ce66' }, // Teal/Green
            lineStyle: { width: 2 },
            data: seriesData.capabilityCoverage2
          },
          {
            name: '年度关键业务自主实施类型覆盖率 I类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: { color: '#E6A23C' }, // Orange
            lineStyle: { width: 2 },
            data: seriesData.typeCoverage1
          },
          {
            name: '年度关键业务自主实施类型覆盖率 II类',
            type: 'line',
            smooth: false,
            symbol: 'emptyCircle',
            symbolSize: 8,
            itemStyle: { color: '#F56C6C' }, // Pink/Red
            lineStyle: { width: 2 },
            data: seriesData.typeCoverage2
          }
        ]
      }
      
      this.annualStatsChart.setOption(option)
    },
    handleSort(field, order) {
      if (this.sortField === field && this.sortOrder === order) {
        // Toggle off if clicking same
        this.sortOrder = ''
        this.sortField = ''
      } else {
        this.sortField = field
        this.sortOrder = order
      }
      this.updateAnnualStatsChart()
    },
    toggleSeries(name) {
      if (this.annualStatsChart) {
        this.annualStatsChart.dispatchAction({
          type: 'legendToggleSelect',
          name: name
        })
      }
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

/* Custom Legend Styles */
.custom-header {
  padding: 5px 0;
}
.legend-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: #606266;
}
.legend-group {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.legend-sub-group {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.legend-title {
  font-weight: normal;
  margin-right: 5px;
}
.legend-content {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.legend-text {
  margin-right: 2px;
}
.legend-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
/* Icon styles */
.solid-blue { background-color: #409EFF; }
.hollow-purple { border: 2px solid #8A2BE2; background-color: #fff; width: 6px; height: 6px; }
.hollow-teal { border: 2px solid #13ce66; background-color: #fff; width: 6px; height: 6px; }
.hollow-orange { border: 2px solid #E6A23C; background-color: #fff; width: 6px; height: 6px; }
.hollow-pink { border: 2px solid #F56C6C; background-color: #fff; width: 6px; height: 6px; }

/* Sort controls */
.sort-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 4px;
  height: 16px;
}
.sort-btn {
  font-size: 12px;
  line-height: 6px; /* Tighter spacing */
  height: 6px;
  color: #C0C4CC;
  cursor: pointer;
  transform: scale(0.9);
}
.sort-btn.active {
  color: #409EFF;
}
.sort-btn:hover {
  color: #606266;
}
</style>
