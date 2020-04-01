<template>
  <el-dialog title="添加标签" :visible="visible" @close="handleClose()">
    <el-form :ref="formName" :model="formData" label-width="100px" :rules="rules">
      <el-form-item label="标签" prop="tagname">
        <el-input v-model="formData.tagname" autocomplete="off" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="formData.sort" type="number" autocomplete="off" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="handleSubmit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createTag } from '@/api/tag'

export default {
  name: 'TagForm',
  components: {
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
      formName: 'tagForm',
      formData: {
        tagname: '',
        sort: 0
      },
      rules: {
        tagname: [
          { required: true, message: '输入标签', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '输入排序', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  watch: {
    dialogInfo: function() {
      this.visible = this.dialogInfo.show
    }
  },
  created() {
  },
  methods: {
    handleSubmit() {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          this.handleCreate()
        } else {
          return false
        }
      })
    },
    handleReset() {
      this.$refs[this.formName].resetFields()
    },
    handleCreate() {
      createTag(this.formData).then(response => {
        this.$message.success('创建成功')
        this.$emit('refresh')
        this.handleClose()
      })
    },
    handleClose() {
      this.visible = false
      this.$refs[this.formName].resetFields()
    }
  }
}
</script>

<style scoped>

</style>
