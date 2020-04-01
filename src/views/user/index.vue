<template>
  <div class="app-container">

    <el-row>
      <el-col :span="12">
        <el-form :inline="true" :model="search" class="form-inline" size="small">
          <el-form-item label="关键字">
            <el-input v-model="search.kw" placeholder="输入用户名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-button-group style="float:right">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleCreate">添加</el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-table
      border
      :data="list"
      style="width: 100%"
      size="small"
      @sort-change="handleSort"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="100px"
        sortable="custom"
      />
      <el-table-column
        prop="name"
        label="用户名"
      />
      <el-table-column
        prop="email"
        label="邮箱"
      />
      <el-table-column label="角色">
        <template slot-scope="{row}">
          <el-tag v-for="(item,index) in row.roles" :key="index" size="small">{{ item.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="注册日期"
      />
      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <el-button slot="reference" type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button slot="reference" type="text" @click="handleDestroy(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="page-bar">
      <el-pagination
        background
        :current-page="search.page"
        :page-sizes="per_pages"
        :page-size="search.per_page"
        :layout="page_layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>

    <UserForm :dialog-info="dialogInfo" @refresh="fetchListData()" />
  </div>
</template>

<script>
import settings from '@/settings'
import { getUserList, updateUser, destroyUser } from '@/api/user'
import UserForm from './userForm'

export default {
  name: 'Tag',
  components: { UserForm },
  data() {
    return {
      list: [],
      total: 0,
      per_pages: settings.per_pages,
      page_layout: settings.page_layout,
      search: {
        kw: '',
        per_page: settings.per_page,
        page: 1,
        order_field: 'id',
        order_type: 'desc'
      },
      dialogInfo: {
        show: false,
        formData: {}
      }
    }
  },
  created() {
    console.log(settings.per_pages)
    this.fetchListData()
  },
  methods: {
    fetchListData() {
      getUserList(this.search).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    handleCreate() {
      this.dialogInfo = Object.assign({}, { show: true, formData: {}})
    },
    handleEdit(row) {
      this.dialogInfo = Object.assign({}, { show: true, formData: row })
      console.log(this.dialogInfo)
    },
    handleChange(row) {
      updateUser(row).then(response => {
        this.fetchListData()
      })
    },
    handleDestroy(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        destroyUser(row.id).then(response => {
          this.fetchListData()
        })
      })
    },
    handleSort(sortDict) {
      this.search.page = 1
      this.search.order_field = sortDict.prop
      this.search.order_type = sortDict.order === 'ascending' ? 'asc' : 'desc'
      this.fetchListData()
    },
    handleSearch() {
      this.search.page = 1
      this.fetchListData()
    },
    handleSizeChange(val) {
      this.search.per_page = val
      this.fetchListData()
    },
    handleCurrentChange(val) {
      this.search.page = val
      this.fetchListData()
    }
  }
}
</script>

<style scoped>
.el-tag {
 margin-right:5px;
}
</style>
