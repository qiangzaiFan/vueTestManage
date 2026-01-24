<template>
  <div class="team-report">
    <!-- Search Area -->
    <el-card class="search-card" shadow="never">
      <el-form :inline="true" :model="searchForm" size="small" class="search-form">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="所属地市">
              <el-select v-model="searchForm.city" placeholder="请选择">
                <el-option label="国网拉萨供电公司" value="国网拉萨供电公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属工区">
              <el-select v-model="searchForm.workArea" placeholder="请选择">
                <el-option label="输电运检工区" value="输电运检工区"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班组归属">
              <el-select v-model="searchForm.teamAffiliation" placeholder="请选择">
                <el-option label="市公司" value="市公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属专业">
              <el-select v-model="searchForm.profession" placeholder="请选择">
                <el-option label="输电专业" value="输电专业"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="班组类型">
              <el-select v-model="searchForm.teamType" placeholder="请选择">
                <el-option label="输电运检班" value="输电运检班"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班组名称">
              <el-input v-model="searchForm.teamName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="跳闸率范围">
              <div style="display: flex; align-items: center;">
                <el-input v-model="searchForm.tripRateMin" placeholder="2%" style="flex: 1;" @input="validateTripRateRange" :class="{ 'error-input': tripRateRangeError }">
                    <template slot="append">%</template>
                </el-input>
                <span style="margin: 0 5px; color: #606266;">—</span>
                <el-input v-model="searchForm.tripRateMax" placeholder="3%" style="flex: 1;" @input="validateTripRateRange" :class="{ 'error-input': tripRateRangeError }">
                    <template slot="append">%</template>
                </el-input>
              </div>
              <div v-if="tripRateRangeError" class="error-tip" style="margin-top: 4px;">{{ tripRateRangeError }}</div>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="统计周期">
              <el-date-picker
                v-model="searchForm.dateRange"
                type="monthrange"
                range-separator="—"
                start-placeholder="开始"
                end-placeholder="结束"
                value-format="yyyy-MM"
                style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" style="text-align: right;">
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- Toolbar -->
    <div class="toolbar">
      <el-button type="text" icon="el-icon-upload2" class="export-btn">导出</el-button>
    </div>

    <!-- Table -->
    <div class="table-container">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        header-row-class-name="table-header"
        row-class-name="editing-row"
        @row-click="handleRowClick">
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column
          prop="teamName"
          label="班组名称"
          min-width="200"
          align="center">
        </el-table-column>
        <el-table-column
          prop="period"
          label="统计周期"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="status"
          label="填报状态"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status === '已填报' ? 'success' : 'warning'"
              effect="plain"
              size="small"
              style="border-radius: 12px; padding: 0 15px;">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="tripRate"
          label="输电线路跳闸率"
          min-width="150"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.isEditing">
              <el-input 
                ref="tripRateInput"
                size="small" 
                v-model="scope.row.editTripRate" 
                placeholder="请输入数字"
                @keyup.enter.native="handleSave(scope.row)"
                @keyup.esc.native="handleCancel(scope.row)"
                @input="validateTripRate(scope.row)"
                :class="{ 'error-input': scope.row.tripRateError }">
                <template slot="append">%</template>
              </el-input>
              <div v-if="scope.row.tripRateError" class="error-tip">{{ scope.row.tripRateError }}</div>
            </div>
            <span v-else>{{ scope.row.tripRate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          align="center">
          <template slot-scope="scope">
            <div v-if="!scope.row.isEditing">
              <el-button
                type="text"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)">编辑</el-button>
            </div>
            <div v-else>
              <el-button
                type="text"
                icon="el-icon-folder-checked"
                style="color: #67C23A;"
                @click="handleSave(scope.row)">保存</el-button>
              <span style="color: #DCDFE6; margin: 0 5px;">|</span>
              <el-button
                type="text"
                icon="el-icon-circle-close"
                style="color: #909399;"
                @click="handleCancel(scope.row)">取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeamReport',
  data() {
    return {
      searchForm: {
        city: '国网拉萨供电公司',
        workArea: '输电运检工区',
        teamAffiliation: '市公司',
        profession: '输电专业',
        teamType: '输电运检班',
        teamName: '国网拉萨供电公司输电运检一班',
        dateRange: ['2024-09', '2025-09'],
        tripRateMin: '',
        tripRateMax: ''
      },
      tableData: [],
      tripRateRangeError: '' // 跳闸率范围校验错误信息
    }
  },
  created() {
    this.initMockData()
  },
  methods: {
    initMockData() {
      // Mock data generation
      const baseData = [
        {
          teamName: '国网拉萨供电公司输电运检一班',
          period: '2025-12',
          status: '未填报',
          tripRate: ''
        },
        {
          teamName: '国网拉萨供电公司输电运检一班',
          period: '2026-11',
          status: '已填报',
          tripRate: '3.37%'
        },
        {
          teamName: '国网拉萨供电公司输电运检一班',
          period: '2026-10',
          status: '已填报',
          tripRate: '3.37%'
        }
      ]

      this.tableData = baseData.map((item, index) => ({
        ...item,
        id: index + 1,
        isEditing: false,
        editTripRate: item.tripRate.replace('%', ''), // Prepare for editing
        tripRateError: '' // Error message for validation
      }))
    },
    handleSearch() {
      // 查询前校验跳闸率范围
      if (!this.validateTripRateRange()) {
        return
      }
      this.$message.success('查询成功')
    },
    handleReset() {
      this.searchForm = {
        city: '',
        workArea: '',
        teamAffiliation: '',
        profession: '',
        teamType: '',
        teamName: '',
        dateRange: [],
        tripRateMin: '',
        tripRateMax: ''
      }
      // 清除范围校验错误
      this.tripRateRangeError = ''
      this.$message.info('重置成功')
    },
    handleEdit(row) {
      // Enable editing for the row
      row.isEditing = true
      // Initialize edit value
      row.editTripRate = row.tripRate ? row.tripRate.replace('%', '') : ''
      // Clear any previous error
      row.tripRateError = ''
      // Focus input after DOM update
      this.$nextTick(() => {
        const input = this.$refs.tripRateInput
        if (input && input[0]) {
          input[0].focus()
        }
      })
    },
    validateTripRate(row) {
      // Validate trip rate input
      const value = row.editTripRate
      if (value === '') {
        row.tripRateError = ''
        return true
      }
      
      // Check if it's a valid number
      const num = parseFloat(value)
      if (isNaN(num)) {
        row.tripRateError = '请输入有效的数字'
        return false
      }
      
      // Check range (0-100)
      if (num < 0 || num > 100) {
        row.tripRateError = '数值必须在0-100之间'
        return false
      }
      
      // Check decimal places (max 2)
      if (value.includes('.') && value.split('.')[1].length > 2) {
        row.tripRateError = '最多保留2位小数'
        return false
      }
      
      row.tripRateError = ''
      return true
    },
    handleSave(row) {
      // Validate before save
      if (!this.validateTripRate(row)) {
        return
      }
      
      // Save logic
      row.isEditing = false
      if (row.editTripRate) {
        row.tripRate = row.editTripRate + '%'
        row.status = '已填报' // Auto update status for demo
      } else {
        row.tripRate = ''
      }
      this.$message.success('保存成功')
    },
    handleCancel(row) {
      // Cancel logic
      row.isEditing = false
      row.editTripRate = ''
      row.tripRateError = '' // Clear error
    },
    handleRowClick(row, column, event) {
      // Only trigger edit when clicking on non-editing cells
      if (!row.isEditing && column.label !== '操作') {
        // Find the first editable row and start editing
        const editableRow = this.tableData.find(item => !item.isEditing)
        if (editableRow && editableRow.id === row.id) {
          this.handleEdit(row)
        }
      }
    },
    validateTripRateRange() {
      // 跳闸率范围校验
      const min = this.searchForm.tripRateMin
      const max = this.searchForm.tripRateMax
      
      // 如果都为空，清除错误
      if (!min && !max) {
        this.tripRateRangeError = ''
        return true
      }
      
      // 最小值不能小于0
      if (min && parseFloat(min) < 0) {
        this.tripRateRangeError = '跳闸率最小值不能小于0'
        return false
      }
      
      // 最大值不能小于0
      if (max && parseFloat(max) < 0) {
        this.tripRateRangeError = '跳闸率最大值不能小于0'
        return false
      }
      
      // 如果两个值都存在，最大值必须大于等于最小值
      if (min && max) {
        const minNum = parseFloat(min)
        const maxNum = parseFloat(max)
        
        if (maxNum < minNum) {
          this.tripRateRangeError = '跳闸率最大值必须大于等于最小值'
          return false
        }
      }
      
      // 校验通过
      this.tripRateRangeError = ''
      return true
    }
  }
}
</script>

<style scoped>
.team-report {
  padding: 20px;
  background-color: #fff;
  min-height: 100vh;
}

.search-card {
  border: none;
  margin-bottom: 0;
}

.search-form .el-form-item {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
}

/* Deep selector to fix label width alignment if needed, 
   but flex display usually handles it well. 
   Adjusting label styling to match design if specific width is needed */
.search-form ::v-deep .el-form-item__label {
  min-width: 80px;
  text-align: right;
  font-weight: normal;
  color: #606266;
}
.search-form ::v-deep .el-form-item__content {
  flex: 1;
}
.search-form ::v-deep .el-select, 
.search-form ::v-deep .el-input, 
.search-form ::v-deep .el-date-editor {
  width: 100%;
}

.toolbar {
  background-color: #E6F1FC;
  padding: 10px 20px;
  margin-bottom: 0;
  border-top: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
}

.export-btn {
  color: #606266;
  font-weight: bold;
}
.export-btn:hover {
  color: #409EFF;
}

.table-container {
  padding: 0;
}

/* Custom Table Header Style */
::v-deep .table-header th {
  background-color: #F5F7FA !important;
  color: #606266;
  font-weight: bold;
}

/* Error input style */
.error-input ::v-deep .el-input__inner {
  border-color: #F56C6C !important;
}

.error-tip {
  color: #F56C6C;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
}

/* Edit mode highlight */
::v-deep .el-table__row.editing-row {
  background-color: #f0f9ff !important;
}
</style>
