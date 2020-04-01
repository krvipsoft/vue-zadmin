<template>
  <div>
    <!-- <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in options" :key="item.id" :label="item.id">{{ item.label }}</el-checkbox>
    </el-checkbox-group> -->

    <el-table
      ref="permissionTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      border
    >
      <el-table-column
        prop="module"
        label="模块"
        width="120"
      />
      <el-table-column
        prop="power"
        label="权限"
      >
        <template slot-scope="{row}">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="(item,index) in row.powers" :key="index" :label="item.id">{{ item.power_name }}</el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { getPermissionAll } from '@/api/permission'

export default {
  name: 'PermissionSelect',
  components: {},
  props: {
    permissions: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      list: [],
      checkList: this.permissions,
      visible: false
    }
  },
  watch: {
    permissions: function() {
      this.checkList = this.permissions
    },
    checkList: function() {
      this.$emit('update:permissions', this.checkList)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getPermissionAll().then(response => {
        console.log(response)
        this.list = []
        response.data.list.forEach(item => {
          this.list.push(item)
        })
      })
    }
    // handleAddTag() {
    //   if (!this.tagname) { return }
    //   var data = { tagname: this.tagname }
    //   createTag(data).then(response => {
    //     this.options.push({ id: response.data.id, label: this.tagname })
    //   })
    //   this.visible = false
    // }
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
