<template>
  <div class="app-container">
    <div class="form-content">
      <el-form :ref="formName" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="分类" prop="category_id">
          <CategorySelect :category-id.sync="formData.category_id" />
        </el-form-item>
        <el-form-item label="标签" prop="tag_ids">
          <TagSelect :tag-ids.sync="formData.tag_ids" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <MdEditor ref="mdEditor" :content.sync="formData.content" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createArticle, getArticleDetail, updateArticle } from '@/api/article'
import CategorySelect from '@/views/components/CategorySelect'
import TagSelect from '@/views/components/TagSelect'
import MdEditor from '@/views/components/MdEditor'

export default {
  name: 'ArticleForm',
  components: {
    CategorySelect,
    TagSelect,
    MdEditor
  },
  props: {
  },
  data() {
    return {
      formName: 'articleForm',
      formData: {
        id: '',
        title: '',
        category_id: '',
        tag_ids: [],
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '输入标题', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.formData.id = this.$route.query.id
    if (this.formData.id) {
      this.fetchDetailData()
    }
  },
  methods: {
    fetchDetailData() {
      getArticleDetail(this.formData.id).then(response => {
        this.formData = Object.assign(this.formData, response.data)
        var tag_ids = []
        response.data.tags.forEach(item => {
          tag_ids.push(item.id)
        })
        this.formData.tag_ids = tag_ids
      })
    },
    handleSubmit() {
      this.$refs[this.formName].validate((valid) => {
        if (valid) {
          if (this.formData.id) {
            this.handleUpdate()
          } else {
            this.handleCreate()
          }
        } else {
          return false
        }
      })
    },
    handleReset() {
      this.$refs[this.formName].resetFields()
    },
    handleCreate() {
      createArticle(this.formData).then(response => {
        this.$message.success('文章已保存')
        this.$router.push({ name: 'Article' })
      })
    },
    handleUpdate() {
      console.log('update')
      updateArticle(this.formData).then(response => {
        this.$message.success('文章已保存')
        this.$router.replace({ name: 'Article' })
      })
    }
  }
}
</script>

<style scoped>

</style>
