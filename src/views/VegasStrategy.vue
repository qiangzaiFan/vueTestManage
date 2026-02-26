<template>
  <div class="vegas-strategy">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">Vegas Tunnel Strategy Visualization</span>
        <div class="strategy-desc">
          <el-tag type="success">Short-term Tunnel: EMA 36 & 43</el-tag>
          <el-tag type="warning">Long-term Tunnel: EMA 144 & 169</el-tag>
        </div>
      </div>
      <div class="chart-container">
        <div id="vegas-chart" style="width: 100%; height: 600px;"></div>
      </div>
      <div class="strategy-explanation">
        <h3>Strategy Logic</h3>
        <p>The Vegas Tunnel method uses two sets of Exponential Moving Averages (EMAs) to identify trends and potential reversal points.</p>
        <ul>
          <li><strong>Long-term Tunnel (EMA 144 & 169):</strong> Acts as a major support/resistance zone. Price staying above this tunnel indicates a long-term uptrend, while below indicates a downtrend.</li>
          <li><strong>Short-term Tunnel (EMA 36 & 43):</strong> Acts as a filter or a trigger for shorter-term moves within the larger trend.</li>
          <li><strong>Trading Signals:</strong>
            <ul>
              <li><strong>Buy:</strong> When price (or short-term tunnel) crosses above the long-term tunnel, or bounces off the long-term tunnel in an uptrend.</li>
              <li><strong>Sell:</strong> When price (or short-term tunnel) crosses below the long-term tunnel, or rejects off the long-term tunnel in a downtrend.</li>
            </ul>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'VegasStrategy',
  data() {
    return {
      chart: null,
      data: []
    }
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    handleResize() {
      if (this.chart) {
        this.chart.resize()
      }
    },
    generateData() {
      // Generate 200 days of mock data
      let basePrice = 1000
      let data = []
      let date = new Date('2023-01-01')
      
      for (let i = 0; i < 300; i++) {
        let open = basePrice + (Math.random() - 0.5) * 20
        let close = open + (Math.random() - 0.5) * 20
        let high = Math.max(open, close) + Math.random() * 10
        let low = Math.min(open, close) - Math.random() * 10
        
        // Add some trend
        if (i > 50 && i < 150) basePrice += 2 // Uptrend
        else if (i > 150 && i < 250) basePrice -= 2 // Downtrend
        else basePrice += (Math.random() - 0.5) * 5 // Sideways
        
        data.push({
          date: date.toISOString().split('T')[0],
          open,
          close,
          high,
          low
        })
        date.setDate(date.getDate() + 1)
      }
      return data
    },
    calculateEMA(data, period) {
      let k = 2 / (period + 1)
      let emaArray = []
      let ema = data[0].close // Start with first close price
      
      for (let i = 0; i < data.length; i++) {
        ema = data[i].close * k + ema * (1 - k)
        emaArray.push(ema.toFixed(2))
      }
      return emaArray
    },
    initChart() {
      const rawData = this.generateData()
      
      // Calculate EMAs
      const ema36 = this.calculateEMA(rawData, 36)
      const ema43 = this.calculateEMA(rawData, 43)
      const ema144 = this.calculateEMA(rawData, 144)
      const ema169 = this.calculateEMA(rawData, 169)
      
      const dates = rawData.map(item => item.date)
      const values = rawData.map(item => [item.open, item.close, item.low, item.high]) // OHLC for candlestick in ECharts is usually Open, Close, Low, High
      
      const chartDom = document.getElementById('vegas-chart')
      this.chart = echarts.init(chartDom)
      
      const option = {
        title: {
          text: 'Price vs Vegas Tunnel',
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['K-Line', 'EMA36', 'EMA43', 'EMA144', 'EMA169']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: dates,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 50,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: 'K-Line',
            type: 'candlestick',
            data: values,
            itemStyle: {
              color: '#ec0000',
              color0: '#00da3c',
              borderColor: '#8A0000',
              borderColor0: '#008F28'
            }
          },
          {
            name: 'EMA36',
            type: 'line',
            data: ema36,
            smooth: true,
            lineStyle: { opacity: 0.8, width: 1, color: '#3398DB' } // Blueish
          },
          {
            name: 'EMA43',
            type: 'line',
            data: ema43,
            smooth: true,
            lineStyle: { opacity: 0.8, width: 1, color: '#3398DB' } // Blueish
          },
          {
            name: 'EMA144',
            type: 'line',
            data: ema144,
            smooth: true,
            lineStyle: { opacity: 0.8, width: 2, color: '#E6A23C' } // Orange/Gold
          },
          {
            name: 'EMA169',
            type: 'line',
            data: ema169,
            smooth: true,
            lineStyle: { opacity: 0.8, width: 2, color: '#E6A23C' } // Orange/Gold
          }
        ]
      }
      
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.vegas-strategy {
  padding: 20px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
}
.strategy-desc {
  display: inline-block;
}
.strategy-desc .el-tag {
  margin-right: 10px;
}
.strategy-explanation {
  margin-top: 20px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 4px;
}
</style>
