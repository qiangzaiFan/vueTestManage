<template>
  <div 
    class="portrait-tag" 
    :class="[side]" 
    :style="{ left: x + '%', top: y + '%' }"
  >
    <!-- Dot for Right side (Tag is on Right, Dot is on Left) -->
    <div v-if="side === 'right'" class="dot-wrapper right-tag-dot">
      <div class="dot" :class="dotColor"></div>
    </div>

    <!-- Content Area -->
    <div class="content-wrapper" :class="[type]">
      <span 
        v-for="(item, index) in content" 
        :key="index" 
        :class="['text-item', item.class]"
      >
        {{ item.text }}
      </span>
    </div>

    <!-- Dot for Left side (Tag is on Left, Dot is on Right) -->
    <div v-if="side === 'left'" class="dot-wrapper left-tag-dot">
      <div class="dot" :class="dotColor"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortraitTag',
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    side: { 
      type: String, 
      default: 'left',
      validator: val => ['left', 'right'].includes(val)
    },
    type: {
      type: String,
      default: 'text', // 'text' or 'card'
      validator: val => ['text', 'card'].includes(val)
    },
    dotColor: {
      type: String,
      default: 'blue',
      validator: val => ['blue', 'red', 'orange'].includes(val)
    },
    content: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.portrait-tag {
  position: absolute;
  display: flex;
  align-items: center;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  z-index: 20; /* Ensure above lines */
}

.portrait-tag.left {
  transform: translate(-100%, -50%);
  flex-direction: row;
}

.portrait-tag.right {
  transform: translate(0, -50%);
  flex-direction: row;
}

.dot-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 
   Dot Positioning:
   The SVG lines end exactly at the component's anchor point (left/top position).
   We use negative margins to center the dot on that anchor point.
   Dot width is 8px. Center is 4px.
*/
.right-tag-dot {
  margin-right: 12px; /* Space between dot and content */
  margin-left: -4px;  /* Pull dot back so its center aligns with anchor */
}

.left-tag-dot {
  margin-left: 12px;  /* Space between content and dot */
  margin-right: -4px; /* Pull dot back so its center aligns with anchor */
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 2px solid #fff; /* White border to separate from line */
  box-sizing: content-box; /* Ensure 8px is content, border adds to it */
}

.dot.blue { background-color: #409EFF; box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.2); }
.dot.red { background-color: #F56C6C; box-shadow: 0 0 0 1px rgba(245, 108, 108, 0.2); }
.dot.orange { background-color: #E6A23C; box-shadow: 0 0 0 1px rgba(230, 162, 60, 0.2); }

.content-wrapper {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: baseline; /* Align text baselines */
}

/* Text Type Styling */
.content-wrapper.text {
  background: transparent;
  padding: 4px 0;
}
.content-wrapper.text .text-item {
  color: #409EFF; /* Default text tags are blueish */
}

/* Card Type Styling */
.content-wrapper.card {
  background: #fff;
  padding: 10px 20px;
  border-radius: 30px; /* More rounded */
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.1);
  color: #606266;
}

/* Inner Text Colors & Sizes */
.text-item {
  margin: 0 1px;
}
.text-item.blue { color: #409EFF; font-weight: bold; font-size: 18px; }
.text-item.red { color: #F56C6C; font-weight: bold; font-size: 18px; }
.text-item.orange { color: #E6A23C; font-weight: bold; font-size: 18px; }

</style>
