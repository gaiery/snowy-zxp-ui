<template>
  <div id="app2">
    555
    <!-- <m-menu :data = "menus" :defaultActive="defaultActive" active-text-color="#0066FF">
      <div>这里是主内容</div>
    </m-menu> -->
    <m-card
     imgSrc="images/test.png"
     summary="这是简介啊这是汉堡简介"
    >
      <template v-slot:footer>
        <div class="footer">
          <div class="left">奥尔良鸡腿堡</div>
          <div class="right">￥23</div>
        </div>
      </template>
    </m-card>
    <m-air-control
      :stepDefault="4"
      :stepMax="10"
      @mouseupPtz="mouseupPtz"
      @mousedownPtz="mousedownPtz"
      @mousedownZoom="mousedownZoom"
      @mouseupZoom="mouseupZoom"
    ></m-air-control>
    <m-angle @angle="on_angle"> </m-angle>
    <m-image-shot
      :url="imageUrl"
      :scale="50"
      @getTargetBox="getTargetBox"
      @targetImgUrl="targetImgUrl"
    ></m-image-shot>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      imageUrl: require("./assets/bg1.png"),
      option: {
        imageUrl: require("./assets/bg1.png"),
        size: 1,
        outputType: "png",
      },
      borderHas: false,
      defaultActive: "/home",
      menus: [
        {
          text: "首页",
          link: "/home",
          id: 0,
          icon: "house",
          children: [],
        },
        {
          text: "统计",
          link: "/gather",
          id: 0,
          icon: "pie-chart",
          children: [],
        },
        {
          text: "任务管理",
          link: "/task",
          icon: "setting",
          id: 2,
          children: [
            {
              text: "用户管理",
              link: "/task/user",
              icon: "power.png",
              id: 3,
            },
          ],
        },
        {
          text: "地图管理",
          link: "/map",
          icon: "odometer",
          id: 4,
          children: [
            {
              text: "轨迹管理",
              link: "/map/guiji",
              icon: "power.png",
              id: 5,
            },
          ],
        },
      ],
    };
  },
  methods: {
    getTargetBox(e) {
      console.log(e);
    },
    targetImgUrl(e) {
      console.log(e);
    },
    mouseupPtz(direction, step) {
      console.log(direction);
      console.log(step);
    },
    mousedownPtz(direction, step) {
      console.log(direction);
      console.log(step);
    },
    mousedownZoom(zoom) {
      console.log(zoom);
    },
    mouseupZoom(zoom) {
      console.log(zoom);
    },
    on_angle(angle) {
      console.log(angle);
    },
  },
};
</script>

<style>
.m-r-md {
  margin-right: 20px !important;
}
.footer {
  padding: 0 10px;
  font-weight: bold;
}
.left {
  float: left;
}
.right {
  float: right;
}
</style>
