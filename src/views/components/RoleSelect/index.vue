<template>
  <el-select v-model="value" clearable multiple placeholder="请选择" style="width:100%;">
    <el-option
      v-for="(item,index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
import { getRoleAll } from '@/api/role'

export default {
  name: 'RoleSelect',
  components: {},
  props: {
    roleIds: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      options: [],
      value: this.roleIds
    }
  },
  watch: {
    roleIds: function() {
      this.value = this.roleIds
    },
    value: function() {
      this.$emit('update:roleIds', this.value)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getRoleAll().then(response => {
        this.options = []
        response.data.list.forEach(item => {
          this.options.push({ value: item.id, label: item.name })
        })
      })
    }
  }
}
</script>
