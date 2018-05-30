projectTypeArray = new Array()
projectTypeArray[0]='Server'
projectTypeArray[1]='Server'
projectTypeArray[2]='Web'
projectTypeArray[3]='App'
projectTypeArray[4]='其他'

projectStatusArray = new Array()
projectStatusArray[0] = '已归档'
projectStatusArray[1] = '正常'
projectStatusArray[2] = '已归档'

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