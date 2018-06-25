/**
 * 项目类型
 * @type {any[]}
 */
projectTypeArray = new Array()
projectTypeArray[0]='Server'
projectTypeArray[1]='Server'
projectTypeArray[2]='Web'
projectTypeArray[3]='App'
projectTypeArray[4]='其他'

/**
 * 项目状态
 * @type {any[]}
 */
projectStatusArray = new Array()
projectStatusArray[0] = '已归档'
projectStatusArray[1] = '正常'
projectStatusArray[2] = '已归档'

/**
 * 共享范围
 * @type {any[]}
 */
shareSpaceArray = new Array()
shareSpaceArray[0] = '企业外'
shareSpaceArray[1] = '企业内'
shareSpaceArray[2] = '业务域'
shareSpaceArray[3] = '应用系统内部'

/**
 * 操作列表
 * @type {any[]}
 */
operateTypeArray = new Array()
operateTypeArray[0] = '添加'
operateTypeArray[1] = '添加'
operateTypeArray[2] = '修改'
operateTypeArray[3] = '查询'
operateTypeArray[4] = '删除'

/**
 * 数据存储类型
 * @type {any[]}
 */
dataTypeArray = new Array()
dataTypeArray[0] = '只读(查询)'
dataTypeArray[1] = '只读(查询)'
dataTypeArray[2] = '写入(提交)'
dataTypeArray[3] = '读出写入'

/**
 * 审核状态类型
 * @type {any[]}
 */
checkStatusArray = new Array()
checkStatusArray[0] = '开发'
checkStatusArray[1] = '启用'
checkStatusArray[2] = '维护'
checkStatusArray[3] = '弃用'

/**
 * 用户类型 0:创建者 1:管理员 2:开发者(读写) 3:开发者(只读)
 * @type {any[]}
 */
userTypeArray = new Array()
userTypeArray[0] = '超级管理员'
userTypeArray[1] = '管理员'
userTypeArray[2] = '开发者(读写)'
userTypeArray[3] = '开发者(只读)'

/**
 * 异常类型 0:正常 1:获取IService失败 2:获取提供者失败 3:系统异常
 * @type {any[]}
 */
exceptionTypeArray = new Array()
exceptionTypeArray[0] = ''
exceptionTypeArray[1] = '获取IService失败'
exceptionTypeArray[2] = '获取提供者失败'
exceptionTypeArray[3] = '系统异常'
exceptionTypeArray[4] = '方法执行异常'
exceptionTypeArray[5] = '调用方法异常'
exceptionTypeArray[6] = '其他未知异常'

/**
 * 测试取参方式
 * @type {any[]}
 */
getrequestParamTypeArray = new Array()
getrequestParamTypeArray[0] = '取前台传值'
getrequestParamTypeArray[1] = '取前置接口值'
getrequestParamTypeArray[2] = '取示例值'

/**
 * 数据类型 1:string 2:int 3:float 4:double 5:byte 6:short
 * 7:long 8:boolean 9:decimal 10:date 11:datetime
 * 12:json 13:object 14:array 15:file
 * @type {any[]}
 */
paramTypeArray = new Array()
paramTypeArray[0] = '[string]'
paramTypeArray[1] = '[string]'
paramTypeArray[2] = '[int]'
paramTypeArray[3] = '[float]'
paramTypeArray[4] = '[double]'
paramTypeArray[5] = '[byte]'
paramTypeArray[6] = '[short]'
paramTypeArray[7] = '[long]'
paramTypeArray[8] = '[boolean]'
paramTypeArray[9] = '[decimal]'
paramTypeArray[10] = '[date]'
paramTypeArray[11] = '[datetime]'
paramTypeArray[12] = '[json]'
paramTypeArray[13] = '[object]'
paramTypeArray[14] = '[array/list]'
paramTypeArray[15] = '[file]'

searchDateType = new Array()
searchDateType[0]={
    type:'date',
    value:7
}
searchDateType[1]={
    type:'month',
    value:1
}
searchDateType[2]={
    type:'month',
    value:3
}

/**
 * 日期格式转换
 * @param value
 * @returns {string}
 */
function dateFormat (value) {
    var date='';
    layui.use('util', function () {
        var util = layui.util;
        date =  util.toDateString(value, 'yyyy-MM-dd HH:mm:ss')
    })
    return date;
}