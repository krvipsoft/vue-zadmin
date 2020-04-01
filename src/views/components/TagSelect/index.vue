<template>
  <div>
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in options" :key="item.id" :label="item.id">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
    <el-popover
      v-model="visible"
      placement="top"
      width="200"
      title="添加标签"
    >
      <p>
        <el-input v-model="tagname" placeholder="输入标签" />
      </p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" size="mini" @click="handleAddTag">确定</el-button>
      </div>
      <span slot="reference" class="add-span"><i class="el-icon-circle-plus" /></span>
    </el-popover>
  </div>
</template>

<script>
import { getTagAll, createTag } from '@/api/tag'

export default {
  name: 'TagSelect',
  components: {},
  props: {
    tagIds: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      options: [],
      checkList: this.tagIds,
      visible: false,
      tagname: ''
    }
  },
  watch: {
    tagIds: function() {
      this.checkList = this.tagIds
    },
    checkList: function() {
      this.$emit('update:tagIds', this.checkList)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getTagAll().then(response => {
        this.options = []
        response.data.list.forEach(item => {
          this.options.push({ id: item.id, label: item.tagname })
        })
      })
    },
    handleAddTag() {
      if (!this.tagname) { return }
      var data = { tagname: this.tagname }
      createTag(data).then(response => {
        this.options.push({ id: response.data.id, label: this.tagname })
      })
      this.visible = false
    }
  }
}
</script>

<style scoped>
.add-span{
  color:gray;
  font-size:28px;
  cursor: pointer;
}
</style>
