<template>
  <el-select v-model="value" clearable placeholder="请选择" style="width:100%;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getCategoryAll } from '@/api/category'

export default {
  name: 'CategorySelect',
  components: {},
  props: {
    categoryId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      options: [],
      value: this.categoryId
    }
  },
  watch: {
    categoryId: function() {
      this.value = this.categoryId
    },
    value: function() {
      this.$emit('update:categoryId', this.value)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getCategoryAll().then(response => {
        this.options = []
        response.data.list.forEach(item => {
          this.options.push({ value: item.id, label: item.catename })
        })
      })
    }
  }
}
</script>
