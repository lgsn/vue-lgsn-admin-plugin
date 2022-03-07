<!--上传图片-->
<template>

  <!--只读模式-->
  <div v-if="readOnly">
    <img
        v-if="!border"
        :src="value"
        alt=""
        :style="{
          width: `${customSize ? customSize.width : size}px`,
          height: `${customSize ? customSize.height : size}px`,
          borderRadius: border ? '50%' : '4px'
        }"
    >
    <Avatar
        v-else-if="value"
        :size="size"
        :src="value"
    />
    <Avatar
        v-else
        :size="size"
        :style="{background: 'rgb(33, 133, 240)', color: '#fff', fontWeight: 'bold', fontSize: `${fontSize}px`}"
    >
      {{ !value && avatarText ? avatarText.substr(0, 1) : 'G' }}
    </Avatar>
  </div>

  <!--可编辑-->
  <div
    v-else
    class="g-upload-img"
    :style="{
      width: `${customSize ? customSize.width : size}px`,
      height: `${customSize ? customSize.height : size}px`,
      borderRadius: border ? '50%' : '4px'
    }"
  >

    <div loading v-if="uploadLoad" class="uploader-loading" />

    <Upload
        name="image"
        :multiple="multiple"
        :action="uploadFileSrc"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :accept="accept"
        @change="uploadImg"
    >

      <!--上传标示-->
      <div v-if="!uploadLoad" class="upload-model">
        <GIcon icon="icon-xiangji" />
      </div>

      <img
        v-if="!border && value"
        class="g-upload-square"
        :src="value"
        alt=""
        :style="{
          width: `${customSize ? customSize.width : size}px`,
          height: `${customSize ? customSize.height : size}px`
        }"
      >

      <span v-else-if="!border && !value" class="upload-text">上传</span>

      <Avatar
          v-else-if="border && value"
          :size="size"
          :src="value"
      />

      <Avatar
          v-else-if="border && !value"
          :size="size"
          :style="{background: 'rgb(33, 133, 240)', color: '#fff', fontWeight: 'bold', fontSize: `${fontSize}px`}"
      >
        {{ !value && avatarText ? avatarText.substr(0, 1) : 'G' }}
      </Avatar>

    </Upload>
  </div>
</template>

<script>
  import { Avatar, Upload } from 'element-ui'
  export default {
    name: 'GUploadImg',
    components: {
      Avatar,
      Upload
    },
    props: {
      // 图片地址
      value: {
        type: String,
        default: ''
      },
      // !value 展示文字内容
      avatarText: {
        type: String,
        default: ''
      },
      // !value 文字大小
      fontSize: {
        type: Number,
        default: 18
      },
      // 图片大小
      size: {
        type: Number,
        default: 36
      },
      // 多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 是否只读
      readOnly: {
        type: Boolean,
        default: false
      },
      // 是否开始展示位圆
      border: {
        type: Boolean,
        default: false
      },
      // 自定义 宽/高
      customSize: {
        type: [Boolean, Object],
        default: false
      },
      // 文件类型
      accept: {
        type: String,
        default: 'image/png,image/jpeg'
      },
      // 文件大小
      fileSize: {
        type: Number,
        default: 500
      }
    },
    data() {
      return {
        uploadFileSrc: 'TODO: 上传文件地址',
        uploadLoad: false
      }
    },
    methods: {
      // 上传完成
      uploadImg(info) {
        if (info.file.status === 'uploading') this.uploadLoad = true
        if (info.file.status === 'done') {
          const { response } = info.file
          if (response && response.success) {
            this.uploadLoad = false
            this.$emit('input', response.data.url)
            this.$emit('success', response.data.url)
          }
        }
      },
      // 校验文件类型 or 大小
      beforeUpload(file) {
        const fileTypes = this.accept.split(',')
        const checkFormat = fileTypes.includes(file.type)
        if (!checkFormat) {
          this.$message.error(`请选择${this.accept}格式`)
        }
        const checkSize = file.size / 1024 < this.fileSize
        if (!checkSize) {
          this.$message.error(`图片必须小于${this.fileSize}KB！`)
        }
        return checkFormat && checkSize
      }
    }
  }
</script>

<style lang="scss" scoped>
  .g-upload-img{
    position: relative;
    margin: 0;
    cursor: pointer;
    overflow: hidden;
    border: 1px #f3f3f3 solid;

    &:hover{
      .upload-model {
        display: flex;
      }
    }

    .upload-model {
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      align-items: center;
      justify-content: center;
      color: #fff;
      z-index: 10;

      .icon {
        font-size: 40px;
      }
    }
    .uploader-loading {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: no-drop;
      z-index: 11;
    }
    .g-upload-square{
      width: 100%;
      height: 100%;
    }
    .upload-text{
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: var(--titleColor);
    }
  }
  .avatar-com-img{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
