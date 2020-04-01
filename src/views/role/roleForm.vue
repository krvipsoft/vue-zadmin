<template>
  <el-dialog :title="title" :visible="visible" @close="handleClose()">
    <el-form :ref="formName" :model="formData" label-width="100px" :rules="rules">
      <el-form-item label="角色名" prop="name">
        <el-input v-model="formData.name" autocomplete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" type="textarea" autocomplete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="权限" prop="permissions">
        <PermissionSelect :permissions.sync="formData.permissions" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createRole, updateRole, getRoleDetail } from '@/api/role'
import PermissionSelect from '@/views/components/PermissionSelect'

const defaultFormData = {
  id: null,
  name: '',
  remark: '',
  permissions: []
}

export default {
  name: 'RoleForm',
  components: {
    PermissionSelect
  },
  props: {
    dialogInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: false,
      formName: 'UserForm',
      formData: {},
      rules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    title: function() {
      return this.formData.id ? '编辑角色' : '添加角色'
    }
  },
  watch: {
    dialogInfo: function() {
      console.log(this.dialogInfo)
      this.visible = this.dialogInfo.show
      this.formData = Object.assign({}, defaultFormData, this.dialogInfo.formData)
      this.fetchDetailData()
    }
  },
  created() {
  },
  methods: {
    fetchDetailData() {
      if (!this.formData.id) { return }
      getRoleDetail(this.formData.id).then(response => {
        console.log(response)
        this.formData = response.data
      })
    },
    handleSubmit() {
      this.$refs[this.formName].validate((valid) => {
        console.log(666)
        console.log(valid)
        console.log(this.formData)
        if (!valid) return
        if (this.formData.id) {
          this.handleUpdate()
        } else {
          this.handleCreate()
        }
      })
    },
    handleReset() {
      this.$refs[this.formName].resetFields()
    },
    handleCreate() {
      createRole(this.formData).then(response => {
        this.$message.success('创建成功')
        this.$emit('refresh')
        this.handleClose()
      })
    },
    handleUpdate() {
      updateRole(this.formData).then(response => {
        this.$message.success('修改成功')
        this.$emit('refresh')
        this.handleClose()
      })
    },
    handleClose() {
      this.visible = false
      this.$refs[this.formName].clearValidate()
    }
  }
}
</script>

<style scoped>

</style>
