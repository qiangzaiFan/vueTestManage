<template>
  <div class="personal-portrait">
    <!-- Header Section -->
    <team-header
      team-name="张保国"
      :tags="['输电专业', '国网拉萨供电公输电运检一班', '员工编号：460062397']"
      :info-items="headerInfo"
    ></team-header>

    <!-- Main Portrait Content -->
    <div class="portrait-container">
      
      <!-- Background Decorations -->
      <div class="bg-decoration square-1"></div>
      <div class="bg-decoration square-2"></div>
      <div class="bg-decoration circle-1"></div>

      <!-- Central Image with Hexagon -->
      <div class="center-image-wrapper">
        <div class="hexagon-bg"></div>
        <div class="worker-image-container">
           <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="Worker" class="worker-image" />
        </div>
      </div>

      <!-- Connecting Lines -->
      <svg class="connection-lines" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Lines -->
        <line
          v-for="tag in tags"
          :key="'line-' + tag.id"
          x1="50%"
          y1="50%"
          :x2="tag.x + '%'"
          :y2="tag.y + '%'"
          stroke="#DCDFE6"
          stroke-width="1"
        />
      </svg>

      <!-- Data-Driven Floating Tags -->
      <portrait-tag
        v-for="tag in tags"
        :key="tag.id"
        :x="tag.x"
        :y="tag.y"
        :side="tag.side"
        :type="tag.type"
        :dot-color="tag.dotColor"
        :content="tag.content"
      ></portrait-tag>
    </div>
  </div>
</template>

<script>
import TeamHeader from '@/components/TeamHeader.vue'
import PortraitTag from '@/components/PortraitTag.vue'

export default {
  name: 'PersonalPortrait',
  components: {
    TeamHeader,
    PortraitTag
  },
  data() {
    return {
      headerInfo: [
        { label: '所属地市', value: '国网拉萨供电公司' },
        { label: '所属工区', value: '输电运检工区' },
        { label: '班组归属', value: '市公司' },
        { label: '班组类型', value: '输电运检班' }
      ],
      // Tag data strictly matching the design draft
      tags: [
        // --- Left Side ---
        {
          id: 1,
          x: 28, y: 30,
          side: 'left',
          type: 'text',
          dotColor: 'blue',
          content: [{ text: '今年26岁，已参加工作1年' }]
        },
        {
          id: 2,
          x: 25, y: 50,
          side: 'left',
          type: 'card',
          dotColor: 'red', // Visual is reddish/orange
          content: [
            { text: '已完成' },
            { text: '3项', class: 'red' },
            { text: '技能鉴定' }
          ]
        },
        {
          id: 3,
          x: 20, y: 70,
          side: 'left',
          type: 'text',
          dotColor: 'blue',
          content: [{ text: '拥有本科学历' }]
        },
        {
          id: 4,
          x: 35, y: 85,
          side: 'left',
          type: 'card',
          dotColor: 'orange',
          content: [
            { text: '拥有' },
            { text: '2项', class: 'orange' },
            { text: '创新成果' }
          ]
        },
        // --- Right/Bottom Side ---
        {
          id: 5,
          x: 60, y: 22,
          side: 'right',
          type: 'card',
          dotColor: 'blue',
          content: [
            { text: '近三年绩效' },
            { text: '4.5分', class: 'blue' }
          ]
        },
        {
          id: 6,
          x: 75, y: 40,
          side: 'right',
          type: 'text',
          dotColor: 'blue',
          content: [{ text: '担任输电运检初级工' }]
        },
        {
          id: 7,
          x: 78, y: 60,
          side: 'right',
          type: 'card',
          dotColor: 'orange',
          content: [
            { text: '获奖表彰' },
            { text: '2次', class: 'orange' }
          ]
        },
        {
          id: 8,
          x: 72, y: 80,
          side: 'right',
          type: 'text',
          dotColor: 'blue',
          content: [{ text: '计划在2026年取得中级职称' }]
        },
        {
          id: 9,
          x: 55, y: 92,
          side: 'right',
          type: 'text',
          dotColor: 'blue',
          content: [{ text: '职称为初级' }]
        }
      ]
    }
  }
}
</script>

<style scoped>
.personal-portrait {
  min-height: 100vh;
  background-color: #f5f9fc;
  padding: 20px;
}

.portrait-container {
  position: relative;
  height: 650px; /* Increased height for better spacing */
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  background: radial-gradient(circle at center, #f0f9ff 0%, #fff 70%);
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

/* Background Decorations (Squares, Circles) */
.bg-decoration {
  position: absolute;
  background: rgba(64, 158, 255, 0.05);
  z-index: 1;
}
.square-1 {
  width: 60px; height: 60px;
  top: 20%; left: 60%;
  transform: rotate(45deg);
}
.square-2 {
  width: 40px; height: 40px;
  bottom: 30%; left: 30%;
  background: rgba(64, 158, 255, 0.08);
}
.circle-1 {
  width: 100px; height: 100px;
  border-radius: 50%;
  border: 1px solid rgba(64, 158, 255, 0.1);
  background: transparent;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(4); /* Large ring */
}

.center-image-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 280px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hexagon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  /* Hexagon SVG Background */
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 2 L93 27 L93 73 L50 98 L7 73 L7 27 Z' fill='none' stroke='%23409EFF' stroke-width='2'/%3E%3Cpath d='M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z' fill='%23e6f7ff' opacity='0.6'/%3E%3C/svg%3E") no-repeat center center;
  background-size: contain;
  filter: drop-shadow(0 0 15px rgba(64, 158, 255, 0.3));
  z-index: 1;
}

.worker-image-container {
  width: 180px;
  height: 180px;
  z-index: 2;
  border-radius: 50%; /* Circle inside Hexagon */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 4px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.worker-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5; /* Behind central image wrapper (z-10) */
  pointer-events: none;
}
</style>
