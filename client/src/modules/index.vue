<!--
 * @Author: sihan.gong
 * @Date: 2021-01-20 15:41:10
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-22 16:13:56
 * @Description: 模块生成页
-->
<template>
  <div class="module-container">
    <header>
      <div class="form-container d-flex align-items-center">
        <queryForm
          ref="queryForm"
          :form-items="config.queryForm"
          :urls="config.urls"
          :validate-rules="queryFormRules"
          @handleQuery="handleQuery"
        />
      </div>
      <div class="table-tools">
        <ks-button
          type="primary"
          icon="ks-icon-status-add3"
          @click="handleEdit('add')"
        >新增</ks-button>
      </div>
    </header>
    <section>
      <tableList
        ref="tableList"
        :table-configs="config.tableConfigs"
        :url="config.urls.queryUrl"
        class="table-container"
        @handleEdit="handleEdit"
        @handleOptions="handleOptions"
      />
    </section>
    <dialog-form
      :title="dialogForm.title"
      :form-items="dialogForm.formItems"
      :url="dialogForm.url"
      :visible.sync="visible"
      :validate-rules="dialogForm.validateRules"
      @handleQuery="handleQuery"
    />
  </div>
</template>

<script>
import tableList from './components/TableList'
import queryForm from './components/QueryForm'
import DialogForm from './components/DialogForm'
export default {
  components: { tableList, queryForm, DialogForm },
  props: {
    config: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      visible: false,
      dialogForm: {
      }
    }
  },
  computed: {
    queryFormRules() {
      return this.config.validateRules.queryForm || {}
    },
    addFormRules() {
      return this.config.validateRules.addForm || {}
    },
    editFormRules() {
      return this.config.validateRules.editForm || {}
    }
  },
  methods: {
    // 表格数据刷新
    handleQuery(formData) {
      this.$refs.tableList.getTableData(formData)
    },
    /**
     * @description: 单击新增修改按钮的方法
     * @param {*} type： add/edit
     * @return {*}
     */
    handleEdit(type = 'add', editData = {}) {
      this.visible = true
      if (type === 'add') {
        this.dialogForm = {
          formItems: this.config.addForm,
          url: this.config.urls.addUrl,
          validateRules: this.config.validateRules.editForm,
          title: '新增'
        }
      } else {
        const formItems = JSON.parse(JSON.stringify(this.config.editForm))
        formItems.forEach(item => {
          if ((item.valueKey) in editData) {
            item.value = editData[item.valueKey]
          }
        })
        this.dialogForm = {
          formItems: formItems,
          url: this.config.urls.editUrl,
          validateRules: this.config.validateRules.editForm,
          title: '修改'
        }
      }
    },
    handleDel() {
      console.log(1)
    },
    // 处理表格的操作事件
    handleOptions(funcName = '', index, row) {
      this.$emit(funcName, index, row)
    }
  }
}
</script>

<style lang="scss" scoped>
.module-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .form-container {
    padding: 20px;
    background-color: $block-container--bg-color;
  }
  .d-flex {
    display: flex;
  }
  .align-items-center {
    align-items: center !important;
  }
  .table-tools{
    padding: 20px 0;
  }
  section {
    flex: 1;
  }
}
</style>
