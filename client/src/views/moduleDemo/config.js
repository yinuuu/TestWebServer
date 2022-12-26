/*
 * @Author: sihan.gong
 * @Date: 2021-01-20 15:38:31
 * @LastEditors: yiwen.wu
 * @LastEditTime: 2021-09-03 16:49:09
 * @Description: 模块生成配置文件
 */
export default {
  queryForm: [{
    valueKey: 'name',
    label: '姓名',
    component: 'input',
    value: '张三', // 可配属性，默认值，表单组件都可配
    readonly: false, // 可配属性,表单组件都可配
    // required: true, // 表单组件都可配
    type: '', // number，textarea，input独有
    showPassword: false, // 如果需要是密码类型，写这个参数
    validateType: '' // 只有input有,email,tel,url,card,
  },
  {
    valueKey: 'date',
    label: '日期',
    component: 'datepicker',
    type: '',
    valueFormat: 'yyyy-MM-dd', // 默认是时间date类型
    format: 'yyyy-MM-dd', // 显示格式。默认是yyyy-MM-dd
    value: '', // 默认值
    readonly: false, // 可配属性，默认值
    required: true
  }, {
    valueKey: 'dept',
    label: '部门',
    component: 'dropdowntree',
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1',
        children: [{
          id: 10,
          label: '三级 2-1-1'
        }]
      }, {
        id: 6,
        label: '二级 2-2',
        children: [{
          id: 11,
          label: '三级 2-2-1'
        }]
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1',
        children: [{
          id: 12,
          label: '三级 3-1-1'
        }]
      }, {
        id: 8,
        label: '二级 3-2',
        children: [{
          id: 13,
          label: '三级 3-2-1'
        }]
      }]
    }],
    multiple: true, // 是否多选
    url: {}, // 服务端获取数据请求
    displayField: 'label', // 显示字段
    valueField: 'id', // 传值字段
    value: '', // 默认值
    children: '', // 可不传，不传默认是children
    readonly: false, // 可配属性，默认值
    required: false
  }
  ],
  editForm: [{
    valueKey: 'name',
    label: '姓名',
    component: 'input',
    value: '', // 可配属性，默认值，表单组件都可配
    readonly: false, // 可配属性,表单组件都可配
    // required: true, // 表单组件都可配
    type: '', // number，textarea，input独有
    showPassword: false, // 如果需要是密码类型，写这个参数
    validateType: '' // 只有input有,email,tel,url,card,
  }, {
    valueKey: 'sex',
    label: '性别',
    component: 'select',
    data: [{ val: '0', key: '男' }, { val: '1', key: '女' }],
    url: { url: '', method: 'get', params: {}}, // 去url
    displayField: 'key', // 显示字段
    valueField: 'val', // 传值字段
    value: '', // 默认值
    readonly: false, // 可配属性，默认值
    required: true
  }, {
    valueKey: 'date',
    label: '日期',
    component: 'datepicker',
    type: 'date',
    valueFormat: '', // 默认是时间date类型
    format: '', // 显示格式。默认是yyyy-MM-dd
    value: '', // 默认值
    readonly: false, // 可配属性，默认值
    required: true
  }, {
    valueKey: 'dept',
    label: '部门',
    component: 'dropdowntree',
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1',
        children: [{
          id: 10,
          label: '三级 2-1-1'
        }]
      }, {
        id: 6,
        label: '二级 2-2',
        children: [{
          id: 11,
          label: '三级 2-2-1'
        }]
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1',
        children: [{
          id: 12,
          label: '三级 3-1-1'
        }]
      }, {
        id: 8,
        label: '二级 3-2',
        children: [{
          id: 13,
          label: '三级 3-2-1'
        }]
      }]
    }],
    multiple: false, // 是否多选
    url: {}, // 服务端获取数据请求
    displayField: 'label', // 显示字段
    valueField: 'id', // 传值字段
    value: '', // 默认值
    children: '', // 可不传，不传默认是children
    readonly: false, // 可配属性，默认值
    required: true
  }],
  addForm: [{
    valueKey: 'name',
    label: '姓名',
    component: 'input',
    value: '', // 可配属性，默认值，表单组件都可配
    readonly: false, // 可配属性,表单组件都可配
    // required: true, // 表单组件都可配
    type: '', // number，textarea，input独有
    showPassword: false, // 如果需要是密码类型，写这个参数
    validateType: '' // 只有input有,email,tel,url,card,
  }, {
    valueKey: 'sex',
    label: '性别',
    component: 'select',
    data: [{ val: '0', key: '男' }, { val: '1', key: '女' }],
    url: { url: '', method: 'get', params: {}}, // 去url
    displayField: 'key', // 显示字段
    valueField: 'val', // 传值字段
    value: '', // 默认值
    readonly: false, // 可配属性，默认值
    required: true
  }, {
    valueKey: 'date',
    label: '日期',
    component: 'datepicker',
    type: '',
    valueFormat: '', // 默认是时间date类型
    format: '', // 显示格式。默认是yyyy-MM-dd
    value: '', // 默认值
    readonly: false, // 可配属性，默认值
    required: true
  }, {
    valueKey: 'dept',
    label: '部门',
    component: 'dropdowntree',
    data: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1',
        children: [{
          id: 10,
          label: '三级 2-1-1'
        }]
      }, {
        id: 6,
        label: '二级 2-2',
        children: [{
          id: 11,
          label: '三级 2-2-1'
        }]
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1',
        children: [{
          id: 12,
          label: '三级 3-1-1'
        }]
      }, {
        id: 8,
        label: '二级 3-2',
        children: [{
          id: 13,
          label: '三级 3-2-1'
        }]
      }]
    }],
    multiple: true, // 是否多选
    url: {}, // 服务端获取数据请求
    displayField: 'label', // 显示字段
    valueField: 'id', // 传值字段
    value: '', // 默认值
    children: '', // 可不传，不传默认是children
    readonly: false, // 可配属性，默认值
    required: true
  }],
  tableConfigs: {
    tableOptions: {
      editTable: true, // 是否可修改删除
      operateWidth: 50, // 操作列宽度
      stripe: true, // 是否为斑马纹
      border: true, // 是否带纵向边框
      showHeader: true, // 是否显示表头
      showPagination: true, // 是否分页
      highlightCcurrentRow: true, // 是否高亮当前行
      currentRowKey: '', // 当前行的 key，只写属性
      showIndex: true // 是否显示列索引
    },
    paginationOptions: {
      label: { // 分页字段映射
        pageSizes: 'pageSizes',
        limit: 'limit',
        currentPage: 'currentPage',
        total: 'total'
      },
      config: { // 初始化时的数据
        pageSizes: [20, 30, 50, 80, 100], // 页面分页大小选择
        limit: 30, // 页面数据条数
        currentPage: 1, // 当前页
        total: undefined // 总数据
      }
    },
    operateOptions: [ // 需要追加操作列时的配置
      { label: '获取',
        handleFun: 'getRecord',
        icon: 'ks-icon-direction-down2'
      }
    ],
    tableColumns: [{
      label: '姓名',
      prop: 'name',
      width: '200'
    },
    {
      label: '个人信息',
      columns: [{
        prop: 'sexLabel',
        label: '性别',
        width: '200'
      },
      {
        prop: 'date',
        label: '出生日期',
        width: '200'
      }, {
        prop: 'deptName',
        label: '所属部门'
      }]
    }]

  },
  urls: {
    queryUrl: {
      url: '',
      params: {},
      method: 'get',
      header: {}
    },
    addUrl: {
      url: '',
      params: {},
      method: 'get',
      header: {}
    },
    editUrl: {
      url: '',
      params: {},
      method: 'get',
      header: {}
    }
  },
  validateRules: {
    addForm: {
      name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
      sex: [
        { validator: function(rule, value, callback) {
          if (value === '') {
            callback(new Error('请输入性别'))
          }
        }, trigger: 'change' }
      ]
    },
    editForm: {
      name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
      sex: [
        { validator: function(rule, value, callback) {
          if (value === '') {
            callback(new Error('请输入性别'))
          }
        }, trigger: 'change' }
      ]
    },
    queryForm: {
      name: [{ required: true, message: '请输入姓名', trigger: 'change' }],
      sex: [
        { validator: function(rule, value, callback) {
          if (value === '') {
            callback(new Error('请输入性别'))
          }
        }, trigger: 'change' }
      ]
    }
  }
}
