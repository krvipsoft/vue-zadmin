<template>
  <el-dialog :title="title" :visible="visible" @close="handleClose()">
    <el-form :ref="formName" :model="formData" label-width="100px" :rules="rules">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name" autocomplete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" type="text" autocomplete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="角色" prop="role_ids">
        <RoleSelect :role-ids.sync="formData.role_ids" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" autocomplete="off" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createUser, updateUser } from '@/api/user'
import { validUsername, validEmail, isPassword } from '@/utils/validate'
import RoleSelect from '@/views/components/RoleSelect'

const defaultFormData = {
  id: null,
  name: '',
  email: '',
  role_ids: [],
  password: ''
}

export default {
  name: 'UserForm',
  components: {
    RoleSelect
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
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('用户名不能少于2位'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (value && !validEmail(value)) {
        callback(new Error('输入正确邮箱'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value && !isPassword(value)) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }

    return {
      visible: false,
      formName: 'UserForm',
      formData: {},
      createRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { trigger: 'blur', validator: validateUsername }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { trigger: 'blur', validator: validatePassword }
        ]
      },
      editRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { trigger: 'blur', validator: validateUsername }
        ],
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { trigger: 'blur', validator: validateEmail }
        ],
        password: [
          { required: false, message: '请输入密码', trigger: 'blur' },
          { trigger: 'blur', validator: validatePassword }
        ]
      }
    }
  },
  computed: {
    title: function() {
      return this.formData.id ? '编辑用户' : '添加用户'
    },
    rules: function() {
      return this.formData.id ? this.editRules : this.createRules
    }
  },
  watch: {
    dialogInfo: function() {
      console.log(this.dialogInfo)
      this.visible = this.dialogInfo.show
      this.formData = Object.assign({}, defaultFormData, this.dialogInfo.formData)
      this.formData.role_ids = []
      if (this.formData.roles) {
        this.formData.roles.forEach(item => {
          this.formData.role_ids.push(item.id)
        })
      }
    }
  },
  created() {
  },
  methods: {
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
      createUser(this.formData).then(response => {
        this.$message.success('创建成功')
        this.$emit('refresh')
        this.handleClose()
      })
    },
    handleUpdate() {
      updateUser(this.formData).then(response => {
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
