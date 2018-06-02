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
checkStatusArray[0] = '新增'
checkStatusArray[1] = '启用'
checkStatusArray[2] = '维护'
checkStatusArray[3] = '弃用'

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