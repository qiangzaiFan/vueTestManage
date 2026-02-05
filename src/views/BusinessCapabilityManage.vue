<template>
  <div class="business-capability-manage">
    <div class="page-header">
      <section-title title="业务能力管理" />
      <div class="header-actions">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
    </div>

    <el-card class="table-card">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        :header-cell-style="{background: '#f5f7fa', color: '#606266', fontWeight: 'bold'}"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          label="序号"
          width="60"
          align="center">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="classification"
          label="业务分类"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="category"
          label="业务类别"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="content"
          label="业务内容"
          min-width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="requirement"
          label="能力要求"
          min-width="250"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始生效时间"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="160"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <div class="operation-wrapper">
              <el-button type="text" icon="el-icon-edit-outline" @click="handleEdit(scope.row)">编辑</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" icon="el-icon-top" @click="handleMoveUp(scope.$index)">上移</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" icon="el-icon-bottom" @click="handleMoveDown(scope.$index)">下移</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- Pagination could go here if needed -->
    </el-card>

    <!-- Add Dialog -->
    <el-dialog title="新增业务能力" :visible.sync="addDialogVisible" width="600px" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="110px">
        <el-form-item label="业务分类" prop="classification">
          <el-select v-model="addForm.classification" placeholder="请选择业务分类" @change="handleClassificationChange" style="width: 100%">
            <el-option label="I" value="I"></el-option>
            <el-option label="II" value="II"></el-option>
            <el-option label="III" value="III"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类别" prop="category">
          <el-select v-model="addForm.category" placeholder="请选择业务类别" :disabled="!addForm.classification" style="width: 100%">
            <el-option v-for="item in categoryOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务内容" prop="content">
          <el-input type="textarea" :rows="3" v-model="addForm.content" placeholder="请输入业务内容"></el-input>
        </el-form-item>
        <el-form-item label="能力要求" prop="requirement">
          <el-input type="textarea" :rows="4" v-model="addForm.requirement" placeholder="请输入能力要求"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="开始生效时间" prop="startTime">
          <el-date-picker v-model="addForm.startTime" type="datetime" placeholder="选择日期时间" value-format="yyyy年MM月dd日HH:mm" style="width: 100%"></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'

export default {
  name: 'BusinessCapabilityManage',
  components: {
    SectionTitle
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          classification: 'I',
          category: '巡视作业',
          content: '各级重要输电通道（密集通道、特高压线路等）线路无人机巡检数字建模',
          requirement: '具备输电线路无人机手操飞行巡视能力。具备输电线路本体及通道正常巡视、本体杆塔精细化巡视和故障巡视能力，能够科学制定线路巡视周期，及时发现输电线路运行安全隐患及缺陷。',
          remark: '必备能力',
          startTime: '2025年12月17日19:23',
          updateTime: '2025年12月17日19:23'
        },
        {
          id: 2,
          classification: 'I',
          category: '巡视作业',
          content: '各级非重要输电通道（密集通道、特高压线路等）线路无人机巡检数字建模',
          requirement: '具备输电线路无人机手操飞行巡视能力。具备输电线路本体及通道正常巡视、本体杆塔精细化巡视和故障巡视能力，能够科学制定线路巡视周期，及时发现输电线路运行安全隐患及缺陷。',
          remark: '必备能力',
          startTime: '2025年12月17日19:23',
          updateTime: '2025年12月17日19:23'
        },
        {
          id: 3,
          classification: 'II',
          category: '日常运维',
          content: '工程前期方案评审（可研、初设等）',
          requirement: '具备输电线路工程前期方案论证及审查能力，具备制定新建线路现场运行规程、线路运行维护方案以及建立设备台账等生产准备能力。',
          remark: '',
          startTime: '',
          updateTime: ''
        },
        {
          id: 4,
          classification: 'II',
          category: '日常运维',
          content: '各电压等级新、改、扩输电线路工程新设备验收',
          requirement: '具备输电线路工程现场验收能力，掌握理解相关技术标准，具备登高检查、检测作业能力，提前介入工程施工，开展施工关键工序见证、隐蔽工程验收等中间验收和竣工交接验收。工程建设基础开挖后，联合属地供电所制定通道验收方案，掌握线路通道情况，开展线路通道验收工作。',
          remark: '',
          startTime: '',
          updateTime: ''
        },
        {
          id: 5,
          classification: 'III',
          category: '安全管控',
          content: '工程前期方案评审（可研、初设等）',
          requirement: '具备输电线路工程前期方案论证及审查能力，具备制定新建线路现场运行规程、线路运行维护方案以及建立设备台账等生产准备能力。',
          remark: '',
          startTime: '',
          updateTime: ''
        }
      ],
      multipleSelection: [],
      addDialogVisible: false,
      categoryOptions: [],
      addForm: {
        classification: '',
        category: '',
        content: '',
        requirement: '',
        remark: '',
        startTime: ''
      },
      addRules: {
        classification: [
          { required: true, message: '请选择业务分类', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择业务类别', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入业务内容', trigger: 'blur' }
        ],
        requirement: [
          { required: true, message: '请输入能力要求', trigger: 'blur' }
        ]
      },
      categoryMapping: {
        'I': ['巡视作业', '检修作业'],
        'II': ['日常运维', '带电作业'],
        'III': ['安全管控', '技术监督']
      }
    }
  },
  methods: {
    handleAdd() {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        if (this.$refs.addForm) {
          this.$refs.addForm.resetFields();
        }
        // Ensure categoryOptions is reset or set based on initial value if any (empty initially)
        this.categoryOptions = [];
      });
    },
    handleClassificationChange(val) {
      this.categoryOptions = this.categoryMapping[val] || [];
      this.addForm.category = '';
    },
    sortTableData() {
      const classificationOrder = ['I', 'II', 'III'];
      this.tableData.sort((a, b) => {
        // 1. Classification
        const classA = classificationOrder.indexOf(a.classification);
        const classB = classificationOrder.indexOf(b.classification);
        if (classA !== classB) return classA - classB;

        // 2. Category
        const mapping = this.categoryMapping[a.classification] || [];
        const catA = mapping.indexOf(a.category);
        const catB = mapping.indexOf(b.category);
        
        // If one is not found (-1), put it after found ones? Or before?
        // Usually, we want defined order. If not defined, maybe alphabetical?
        if (catA !== -1 && catB !== -1) {
            if (catA !== catB) return catA - catB;
        } else if (catA !== catB) {
            // Put found items before not-found items
            if (catA === -1) return 1;
            if (catB === -1) return -1;
        } else {
            // Both not found or both same category (handled by next step)
            if (a.category !== b.category) return a.category.localeCompare(b.category);
        }

        // 3. Keep relative order (stable sort)
        return 0;
      });
    },
    saveAdd() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          const now = new Date();
          const format = (n) => n < 10 ? '0' + n : n;
          const timeStr = `${now.getFullYear()}年${format(now.getMonth()+1)}月${format(now.getDate())}日${format(now.getHours())}:${format(now.getMinutes())}`;
          
          const newItem = {
            id: Date.now(),
            classification: this.addForm.classification,
            category: this.addForm.category,
            content: this.addForm.content,
            requirement: this.addForm.requirement,
            remark: this.addForm.remark,
            startTime: this.addForm.startTime || '',
            updateTime: timeStr
          };

          // Insert at top, then sort to place correctly
          this.tableData.unshift(newItem);
          this.sortTableData();

          this.addDialogVisible = false;
          this.$message.success('新增成功');
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      this.$message.info(`编辑: ${row.content}`);
    },
    handleMoveUp(index) {
      if (index === 0) {
        this.$message.warning('已经是第一条了');
        return;
      }
      
      const currentItem = this.tableData[index];
      const prevItem = this.tableData[index - 1];
      
      if (currentItem.classification !== prevItem.classification) {
        this.$message.warning('只能在相同的业务分类内移动');
        return;
      }

      this.tableData.splice(index, 1);
      this.tableData.splice(index - 1, 0, currentItem);
      this.$message.success('上移成功');
    },
    handleMoveDown(index) {
      if (index === this.tableData.length - 1) {
        this.$message.warning('已经是最后一条了');
        return;
      }
      
      const currentItem = this.tableData[index];
      const nextItem = this.tableData[index + 1];

      if (currentItem.classification !== nextItem.classification) {
        this.$message.warning('只能在相同的业务分类内移动');
        return;
      }

      this.tableData.splice(index, 1);
      this.tableData.splice(index + 1, 0, currentItem);
      this.$message.success('下移成功');
    }
  }
}
</script>

<style scoped>
.business-capability-manage {
  padding: 20px;
}

.table-card {
  margin-top: 20px;
}

.operation-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Adjust button styles to match the image link color if needed */
.el-button--text {
  color: #409EFF;
}
</style>
