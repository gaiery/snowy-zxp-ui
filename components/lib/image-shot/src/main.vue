<template>
 <div>
  <div
      class="cropper-container"
      :style="{
        'width': currentWidth + 'px',
        'height': currentHeight + 'px'
        }"
      @mousedown.prevent="startMove"
  >
    <div class="cropper-mask" :class="{'bg-opcity':list.length>0}"></div>
    <img
        :src="url"
        :style="{
        'width': currentWidth + 'px',
        'height': currentHeight + 'px'
        }"
        ref = "sourceImg"
        alt="背景图片"
    >
    <div
        v-for="(item,index) in data_list"
        :key="item.id"
        class="crop-box"
        ref="imageDom"
        :style="{
        'width': item.cropW + 'px',
        'height': item.cropH + 'px',
        'transform': 'translate3d('+ item.cropX + 'px,' + item.cropY + 'px,' + '0)'
    }"
    >
    <span
        
        class="cropper-face"
        @mousedown.stop="cropMove($event,item)"
        @contextmenu.prevent="deleteCrop(index)"
    />

    <span v-show="item.canEdit">
        <span
            v-for="line in lineList"
            :key="line"
            :class="[`line-${line}`, 'crop-line']"
            @mousedown.stop="changeCropSize($event, item, line)"
        />
        <span
            v-for="point in pointList"
            :key="point.index"
            :class="[`point${point.index}`, 'crop-point']"
            @mousedown.stop="changeCropSize($event, item, point.position)"
        />
    </span>
    </div>
</div>
<div style="position:relative">
    <canvas id="previewImg" ref="previewImg"></canvas>
    <button class="download" @click="download" style="position:absolute">下载</button>
</div>
 </div>
</template>

<script>
export default {
  name: "m-image-shot",
  model: {
    prop: 'list'
  },
  props: {
    url: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: function () {
        return [];
      }
    },
    scale: {
      type: Number,
      default: 100
    },
    padding: { // 边框安全距离
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 框的8个操作点list，左上 | 上 | 右上 | 右 | 右下 | 下 | 左下 | 左
      pointList: [
        {index: 1, position: ['left', 'top']},
        {index: 2, position: [null, 'top']},
        {index: 3, position: ['right', 'top']},
        {index: 4, position: ['right', null]},
        {index: 5, position: ['right', 'bottom']},
        {index: 6, position: [null, 'bottom']},
        {index: 7, position: ['left', 'bottom']},
        {index: 8, position: ['left', null]},
      ],
      lineList: ['left', 'top', 'right', 'bottom'], // 框的4条线
      trueWidth: 0, // 图片实际宽度
      trueHeight: 0, // 图片实际高度
      currentWidth: 0, // 图片当前宽度
      currentHeight: 0, // 图片当前高度
      tempCrop: {},
      changePosition: [], // 更改边的位置 ['left', 'top] 改上左两条边
      cropClientX: 0,
      cropClientY: 0,
      data_disable:this.disabled,
      imgUrlNew:'',
      target: {
          cropW:0,
          cropH:0
      },
      data_list:this.data_list
    }
  },
  mounted(){
      this.initImage(this.url)
  },
  methods: {
    clickGeneratePicture () {
        let previewImg = this.$refs.previewImg
        previewImg.width = 500
        previewImg.height = 450
        let sourceImg = this.$refs.sourceImg
        let ctx = previewImg.getContext('2d');
        let canvasX=(500-this.target.cropW/(this.scale/100) )/2
        let canvasY=(500-this.target.cropH/(this.scale/100) )/2
        ctx.drawImage(sourceImg, this.target.cropX/(this.scale/100), this.target.cropY/(this.scale/100), this.target.cropW/(this.scale/100), this.target.cropH/(this.scale/100),canvasX,canvasY,this.target.cropW/(this.scale/100), this.target.cropH/(this.scale/100));
        
    },
    getTargetImgUrl(){
        let type = 'png';   //设置下载图片的格式
        let previewImg = this.$refs.previewImg
        let img_png_src = previewImg.toDataURL("image/png");  //将canvas保存为图片
        let imgData = img_png_src.replace(this.imgType(type),'image/octet-stream');
        this.$emit('targetImgUrl',imgData)
    },
    download(){
        let type = 'png';   //设置下载图片的格式
        let previewImg = this.$refs.previewImg
        let img_png_src = previewImg.toDataURL("image/png");  //将canvas保存为图片
        let imgData = img_png_src.replace(this.imgType(type),'image/octet-stream');
        let filename = '图片' + '.' + type; //下载图片的文件名
        this.saveFile(imgData,filename);
    },
    imgType(ty) {
        let type = ty.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    },
    saveFile(data, fileName){
        let save_link = document.createElement('a');
        save_link.href = data;
        save_link.download = fileName;
        let event = document.createEvent('MouseEvents');
        event.initEvent("click", true, false);
        save_link.dispatchEvent(event);
    },
    initImage(item) {
      let image = new Image()
      image.onload = () => {
        // 图片当前宽高
        this.currentWidth = image.width * this.scale / 100;
        this.currentHeight = image.height * this.scale / 100;
        // 图片真实宽高
        this.trueWidth = image.width;
        this.trueHeight = image.height;
        this.$emit('img', {
          width: image.width,
          height: image.height
        })
      };
      image.src = item;
    },
    startMove(e) {
      if (!this.disabled) {
        let item = {
          id: this.guid(),
          cropW: 0,
          cropH: 0,
          cropX: e.offsetX,
          cropY: e.offsetY,
          // 保存老坐标
          oldCropW: 0,
          oldCropH: 0,
          oldCropX: e.offsetX,
          oldCropY: e.offsetY,

          canEdit: true // 是否可以编辑
        };
        this.tempCrop = item;
        this.data_list = [] //只允许一个框，去掉改行，允许多个
        this.data_list.push(item);
        this.cropClientX = e.clientX;
        this.cropClientY = e.clientY;
        // 绑定截图事件
        window.addEventListener("mousemove", this.createCrop);
        window.addEventListener("mouseup", this.endCrop);
      }
    },
    // 创建剪裁框
    createCrop(e) {
      let nowX = e.clientX, nowY = e.clientY, item = this.tempCrop;
      let fw = nowX - this.cropClientX, fh = nowY - this.cropClientY;
      if (fw >= 0) {
        item.cropW = Math.min(this.currentWidth - item.oldCropX - 2 * this.padding, fw);
        item.cropX = item.oldCropX;
      } else {
        item.cropW = Math.min(item.oldCropX - 2 * this.padding, Math.abs(fw));
        item.cropX = Math.max(item.oldCropX + fw, this.padding);
      }
      if (fh >= 0) {
        item.cropH = Math.min(this.currentHeight - item.oldCropY - 2 * this.padding, fh);
        item.cropY = item.oldCropY;
      } else {
        item.cropH = Math.min(item.oldCropY - 2 * this.padding, Math.abs(fh));
        item.cropY = Math.max(item.oldCropY + fh, this.padding);
      }
      if (item.cropW > 10 && item.cropH > 10) {
        item.temp = false;
      }
      this.target = item
      this.clickGeneratePicture()
    },
    // 创建完成
    endCrop() {
      window.removeEventListener("mousemove", this.createCrop);
      window.removeEventListener("mouseup", this.endCrop);
      this.tempCrop = {};
      this.$emit('getTargetBox',this.target)
      this.getTargetImgUrl()
    },
    // 截图移动
    cropMove(e, item) {
      if (!this.disabled && item.canEdit) {
        this.cropClientX = e.clientX;
        this.cropClientY = e.clientY;
        item.oldCropW = item.cropW;
        item.oldCropH = item.cropH;
        item.oldCropX = item.cropX;
        item.oldCropY = item.cropY;
        this.tempCrop = item;

        window.addEventListener("mousemove", this.moveCrop);
        window.addEventListener("mouseup", this.leaveCrop);
      }
    },
    // 截图移动中
    moveCrop(e) {
      e.preventDefault();
      let nowX = e.clientX, nowY = e.clientY, item = this.tempCrop;
      let fw = nowX - this.cropClientX, fh = nowY - this.cropClientY;
      item.cropX = Math.min(Math.max(item.oldCropX + fw, this.padding), this.currentWidth - item.cropW - 2 * this.padding);
      item.cropY = Math.min(Math.max(item.oldCropY + fh, this.padding), this.currentHeight - item.cropH - 2 * this.padding);
      this.target = item
      this.clickGeneratePicture()
    },
    // 截图移动结束
    leaveCrop() {
        console.log("截图移动结束")
      window.removeEventListener("mousemove", this.moveCrop);
      window.removeEventListener("mouseup", this.leaveCrop);
      this.$emit('getTargetBox',this.target)
      this.getTargetImgUrl()
    },
    // 删除框选
    deleteCrop(index) {
        console.log("删除框选")
      if (!this.disabled) {
        this.data_list.splice(index, 1);
      }
    },
    // 改变截图框大小
    changeCropSize(e, item, position) {
      if (!this.disabled && item.canEdit) {
        window.addEventListener("mousemove", this.changeCropNow);
        window.addEventListener("mouseup", this.changeCropEnd);

        this.cropClientX = e.clientX;
        this.cropClientY = e.clientY;
        item.oldCropW = item.cropW;
        item.oldCropH = item.cropH;
        item.oldCropX = item.cropX;
        item.oldCropY = item.cropY;

        this.changePosition = position;
        this.tempCrop = item;
        this.target = item
        this.clickGeneratePicture()
      }
    },
    // 正在改变大小
    changeCropNow(e) {
      e.preventDefault();
      let nowX = e.clientX, nowY = e.clientY, item = this.tempCrop, position = this.changePosition;
      let fw = nowX - this.cropClientX, fh = nowY - this.cropClientY;
      if (position.indexOf('left') > -1) { // 拖动的边中包含左边
        if (item.oldCropW - fw >= 0) {
          item.cropW = Math.min(item.oldCropW - fw, item.oldCropX + item.oldCropW);
          item.cropX = Math.max(this.padding, item.oldCropX + fw);
        } else {
          item.cropW = Math.min(fw - item.oldCropW, this.currentWidth - item.oldCropX - item.oldCropW - 2 * this.padding);
          item.cropX = item.oldCropX + item.oldCropW;
        }
      } else if (position.indexOf('right') > -1) { // 拖动的边中包含右边
        if (item.oldCropW + fw >= 0) {
          item.cropW = Math.min(this.currentWidth - item.cropX - 2 * this.padding, item.oldCropW + fw);
          item.cropX = item.oldCropX;
        } else {
          item.cropW = Math.min(Math.abs(fw + item.oldCropW), item.oldCropX - 2 * this.padding);
          item.cropX = Math.max(this.padding, item.oldCropX - item.cropW);
        }
      }

      if (position.indexOf('top') > -1) { // 拖动的边中包含上边
        if (item.oldCropH - fh > 0) { // 上方
          item.cropH = Math.min(item.oldCropH - fh, item.oldCropH + item.oldCropY - 2 * this.padding);
          item.cropY = Math.max(this.padding, item.oldCropY + fh);
        } else { // 下方
          item.cropH = Math.min(fh - item.oldCropH, this.currentHeight - item.oldCropY - item.oldCropH);
          item.cropY = item.oldCropY + item.oldCropH;
        }
      } else if (position.indexOf('bottom') > -1) { // 拖动的边中包含下边
        if (item.oldCropH + fh > 0) { // 下方
          item.cropH = Math.min(this.currentHeight - item.cropY - 2 * this.padding, item.oldCropH + fh);
          item.cropY = item.oldCropY;
        } else { // 上方
          item.cropH = Math.min(Math.abs(fh + item.oldCropH), item.oldCropY - 2 * this.padding);
          item.cropY = Math.max(this.padding, item.oldCropY + item.oldCropH + fh);
        }
      }
      this.target = item
      this.clickGeneratePicture()
    },
    // 结束改变大小
    changeCropEnd() {
      window.removeEventListener("mousemove", this.changeCropNow);
      window.removeEventListener("mouseup", this.changeCropEnd);
      this.clickGeneratePicture()
      this.$emit('getTargetBox',this.target)
      this.getTargetImgUrl()
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    changeCropScale(val, oldVal) {
      let scale = val / oldVal;
      this.data_list.forEach(item => {
        item.cropX = item.cropX * scale;
        item.cropY = item.cropY * scale;
        item.cropW = item.cropW * scale;
        item.cropH = item.cropH * scale;
      });
    },
  },
  watch: {
    // url: {
    //   handler(val) {
    //     if (val) {
    //       this.initImage(val)
    //     }
    //   },
    //   immediate: true
    // },
    scale(val, oldVal) {
      if (this.url) {
        this.currentWidth = this.trueWidth * val / 100;
        this.currentHeight = this.trueHeight * val / 100;
        this.changeCropScale(val, oldVal);
      }
    }
  }
}
</script>

<style scoped lang="scss">
button{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    margin-left: 20px;
    top: 50px;
    &:hover{
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }
}
button.imgurl{
    top: 100px
}
canvas {
    border: 1px solid #eee;
    margin-top: 50px;
    min-width: 200px;
    min-height: 200px;
}
.cropper-container {
  position: relative;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: crosshair;
}
.cropper-mask{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    user-select: none;
}
// .bg-opcity{
//     background: rgba(0,0,0,.5);
// }
.crop-box,
.cropper-face {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  user-select: none;
  box-sizing: border-box;
}

.crop-box {
  border: 1px solid #39f;
}

.cropper-face {
  top: 0;
  left: 0;
  cursor: move;
//   background-color: #fff;
//   opacity: .2;
}

.crop-line {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

.line-top {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: row-resize;
}

.line-left {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: col-resize;
}

.line-bottom {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: row-resize;
}

.line-right {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: col-resize;
}

.crop-point {
  position: absolute;
  width: 7px;
  height: 7px;
  opacity: .75;
  background-color: #39f;
  border-radius: 100%;
}

.point1 {
  top: -4px;
  left: -4px;
  cursor: nwse-resize;
}

.point2 {
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  cursor: row-resize;
}

.point3 {
  top: -4px;
  right: -4px;
  cursor: nesw-resize;
}

.point4 {
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
  cursor: col-resize;
}

.point5 {
  bottom: -4px;
  right: -4px;
  cursor: nwse-resize;
}

.point6 {
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  cursor: row-resize;
}

.point7 {
  bottom: -4px;
  left: -4px;
  cursor: nesw-resize;
}

.point8 {
  top: 50%;
  left: -4px;
  transform: translateY(-50%);
  cursor: col-resize;
}
</style>
