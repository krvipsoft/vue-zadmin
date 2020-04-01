<template>
  <div>
    <mavon-editor
      ref="md"
      v-model="mdContent"
      placeholder="开始写作吧"
      :box-shadow="false"
      style="min-height:420px;"
      @imgAdd="$imgAdd"
    />
  </div>
</template>

<script>
import { uploadFile } from '@/api/file'

export default {
  name: 'MdEditor',
  components: {},
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mdContent: this.content,
      img_file: {}
    }
  },
  watch: {
    content: function() {
      this.mdContent = this.content
    },
    mdContent: function() {
      this.$emit('update:content', this.mdContent)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      uploadFile(formdata).then((response) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs['md'].$img2Url(pos, response.data[0].url)
      })
    }

  }
}
</script>

<style scoped>

</style>
