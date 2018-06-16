$(function () {
    //加载弹出层
    layui.use(['form', 'element', 'util'],
        function () {
            layer = layui.layer
            element = layui.element
            util = layui.util
        })

    //触发事件
    var tab = {
        tabAdd: function (title, url, id) {
            //新增一个Tab项
            element.tabAdd('xbs_tab', {
                title: title
                ,
                content: '<iframe tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>'
                ,
                id: id
            })
            //增加点击关闭事件
            var r = $(".layui-tab-title").find("li");
            //每次新打开tab都是最后一个，所以只对最后一个tab添加点击关闭事件
            r.addClass('context-menu-one')
            r.eq(r.length - 1).children("i").on("click", function () {
                // alert($(this).parent("li").attr('lay-id'));
                element.tabDelete("xbs_tab", $(this).parent("li").attr('lay-id'));
            }), element.tabChange("xbs_tab", r.length - 1);
            element.init();
        }
        , tabDelete: function (othis) {
            //删除指定Tab项
            // element.tabDelete('xbs_tab', '44') //删除：“商品管理”
            othis.addClass('layui-btn-disabled')
        }
        , tabChange: function (id) {
            //切换到指定Tab项
            element.tabChange('xbs_tab', id) //切换到：用户管理
        }
    }

    tableCheck = {
        init: function () {
            $('.layui-form-checkbox').click(function (event) {
                if ($(this).hasClass('layui-form-checked')) {
                    $(this).removeClass('layui-form-checked')
                    if ($(this).hasClass('header')) {
                        $('.layui-form-checkbox').removeClass('layui-form-checked')
                    }
                } else {
                    $(this).addClass('layui-form-checked')
                    if ($(this).hasClass('header')) {
                        $('.layui-form-checkbox').addClass('layui-form-checked')
                    }
                }

            })
        },
        getData: function () {
            var obj = $('.layui-form-checked').not('.header')
            var arr = []
            obj.each(function (index, el) {
                arr.push(obj.eq(index).attr('data-id'))
            })
            return arr
        }
    }

    //开启表格多选
    tableCheck.init()

    $('.container .left_open i').click(function (event) {
        if ($('.left-nav').css('left') == '0px') {
            $('.left-nav').animate({left: '-221px'}, 100)
            $('.page-content').animate({left: '0px'}, 100)
            $('.page-content-bg').hide()
        } else {
            $('.left-nav').animate({left: '0px'}, 100)
            $('.page-content').animate({left: '221px'}, 100)
            if ($(window).width() < 768) {
                $('.page-content-bg').show()
            }
        }

    })

    $('.page-content-bg').click(function (event) {
        $('.left-nav').animate({left: '-221px'}, 100)
        $('.page-content').animate({left: '0px'}, 100)
        $(this).hide()
    })

    $('.layui-tab-close').click(function (event) {
        $('.layui-tab-title li').eq(0).find('i').remove()
    })

    $('tbody.x-cate tr[fid!=\'0\']').hide()
    // 栏目多级显示效果
    $('.x-show').click(function () {
        if ($(this).attr('status') == 'true') {
            $(this).html('&#xe625;')
            $(this).attr('status', 'false')
            cateId = $(this).parents('tr').attr('cate-id')
            $('tbody tr[fid=' + cateId + ']').show()
        } else {
            cateIds = []
            $(this).html('&#xe623;')
            $(this).attr('status', 'true')
            cateId = $(this).parents('tr').attr('cate-id')
            getCateId(cateId)
            for (var i in cateIds) {
                $('tbody tr[cate-id=' + cateIds[i] + ']').hide().find('.x-show').html('&#xe623;').attr('status', 'true')
            }
        }
    })

    //左侧菜单效果
    // $('#content').bind("click",function(event){
    $('.left-nav #nav li').click(function (event) {
        $('.left-nav #nav li').css('background','#efefec')
        $('.left-nav #nav li').children('a').css('color', '#333');
        $(this).css('background', '#009688');
        $(this).children('a').css('color', '#ffffff');

        if ($(this).children('.sub-menu').length) {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open')
                $(this).find('.nav_right').html('&#xe697;')
                $(this).children('.sub-menu').stop().slideUp()
                $(this).siblings().children('.sub-menu').slideUp()
            } else {
                $(this).addClass('open')
                $(this).children('a').find('.nav_right').html('&#xe6a6;')
                $(this).children('.sub-menu').stop().slideDown()
                $(this).siblings().children('.sub-menu').stop().slideUp()
                $(this).siblings().find('.nav_right').html('&#xe697;')
                $(this).siblings().removeClass('open')
            }
        } else {

            var url = $(this).children('a').attr('_href')
            var title = $(this).find('cite').html()
            var index = $('.left-nav #nav li').index($(this))

            for (var i = 0; i < $('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == index + 1) {
                    tab.tabChange(index + 1)
                    event.stopPropagation()
                    return
                }
            }
            tab.tabAdd(title, url, index + 1)
            tab.tabChange(index + 1)
        }
        event.stopPropagation()
    })

})
var cateIds = []

function getCateId (cateId) {
    $('tbody tr[fid=' + cateId + ']').each(function (index, el) {
        id = $(el).attr('cate-id')
        cateIds.push(id)
        getCateId(id)
    })
}

/*弹出层*/

/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/

function x_admin_show (title, url, w, h) {
    x_admin_show(title,url,w,h,null)
}

function x_admin_show (title, url, w, h,max) {
    if (title == null || title == '') {
        title = false
    }

    if (url == null || url == '') {
        url = '404.html'
    }

    if (w == null || w == '') {
        w = ($(window).width() * 0.9)
    }

    if (h == null || h == '') {
        h = ($(window).height() - 50)
    }

    var index = layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade: 0.4,
        title: title,
        content: url
    })
    if(max){
        layer.full(index)
    }
}

/*关闭弹出框口*/
function x_admin_close () {
    var index = parent.layer.getFrameIndex(window.name)
    parent.layer.close(index)
}

/**
 * 获取数据ajax-get请求
 * @author laixm
 */
$.getJSON = function (url, data, callback) {
    $.ajax({
        url: url,
        type: 'get',
        contentType: 'application/json',
        dataType: 'json',
        timeout: 10000,
        data: data,
        success: function (data) {
            callback(data)
        }
    })
}

/**
 * 提交json数据的post请求
 * @author laixm
 */
$.postJSON = function (url, data, callback) {
    $.ajax({
        url: url,
        type: 'post',
        contentType: 'application/json',
        dataType: 'json',
        data: data,
        timeout: 60000,
        success: function (msg) {
            callback(msg)
        },
        error: function (xhr, textstatus, thrown) {

        }
    })
}

/**
 * 修改数据的ajax-put请求
 * @author laixm
 */
$.putJSON = function (url, data, callback) {
    $.ajax({
        url: url,
        type: 'put',
        contentType: 'application/json',
        dataType: 'json',
        data: data,
        timeout: 20000,
        success: function (msg) {
            callback(msg)
        },
        error: function (xhr, textstatus, thrown) {

        }
    })
}

$.putForm = function (url, data, callback) {
    $.ajax({
        url: url,
        type: 'put',
        data: data,
        timeout: 20000,
        success: function (msg) {
            callback(msg)
        },
        error: function (xhr, textstatus, thrown) {

        }
    })
}

$.deleteForm = function (url, data, callback) {
    $.ajax({
        url: url,
        type: 'delete',
        contentType: 'application/json',
        data: data,
        timeout: 20000,
        success: function (msg) {
            callback(msg)
        },
        error: function (xhr, textstatus, thrown) {

        }
    })
}

$.deleteJSON = function (url, data, callback) {
    $.ajax({
        url: url,
        type: 'delete',
        contentType: 'application/json',
        dataType: 'json',
        data: data,
        success: function (msg) {
            callback(msg)
        },
        error: function (xhr, textstatus, thrown) {

        }
    })
}

var firstFlag = true
// iframe判断登录
function checkLogin () {
    if (!getCookie('login') || getCookie('login') == 'false') {
        parent.location.href = '../login.html'
    }
    var url
    if(firstFlag){
        firstFlag = false
        return
    }
    if((getCookie('projectId') === 'undefined' || getCookie('projectId')==null)){
        url = _hostUrl + '/user/' + getCookie('userId')
    }else{
       url =  _hostUrl + '/project/' + getCookie('projectId')
    }
    $.ajax({
        url: url,
        type: 'get',
        timeout: 3000,
        success: function (res) {
            if (!res || res.responseCode != 200) {
                clearCookies()
                parent.location.href = '../login.html'
            }else{
                //更新项目状态值
                if(res.data && res.data.projectStatus){
                    setCookie('projectStatus',res.data.projectStatus)
                }
            }
        },
        error: function () {
            clearCookies()
            parent.location.href = '../login.html'
        }
    })
}

// function logout () {
//     $.ajax({
//         url: _hostUrl + '/logout',
//         type: 'get',
//         timeout: 3000,
//         success: function (res) {
//             clearCookies()
//             parent.location.href = 'login.html'
//         },
//         error: function () {
//             clearCookies()
//             parent.location.href = 'login.html'
//         }
//     })
// }

function clearCookies () {
    setCookie('login', 'false')
    setCookie('userId', '')
    var remember = getCookie('remember')
    if (!remember || remember != '1') {
        setCookie('username', '')
    }
    setCookie('projectId', '')
    setCookie('projectStatus', '')
    setCookie('nickName', '')
    setCookie('superFlag', '')
}


/**
 * 加载json的数据到页面的表单中，以name为唯一标示符加载
 * @param {String} jsonStr json表单数据
 */
function loadJsonDataToForm (jsonStr) {
    try {
        //var obj = eval("("+jsonStr+")");
        var obj = jsonStr;
        var key, value, tagName, type, arr;
        for (x in obj) {
            key = x;
            value = obj[x];
            $("[name='" + key + "'],[name='" + key + "[]']").each(function () {
                tagName = $(this)[0].tagName;
                type = $(this).attr('type');
                if (tagName == 'INPUT') {
                    if (type == 'radio') {
                        $(this).attr('checked', $(this).val() == value);
                    } else if (type == 'checkbox') {
                        if(value){
                            value = value+''
                            if(value.indexOf(",") != -1){
                                arr = value.split(',');
                            }else {
                                arr = new Array()
                                arr[0] = value
                            }
                            for (var i = 0; i < arr.length; i++) {
                                if ($(this).val() == arr[i]) {
                                    $(this).attr('checked', true);
                                    break;
                                }
                            }
                        }
                    } else {
                        $(this).val(value);
                    }
                } else if (tagName == 'SELECT' || tagName == 'TEXTAREA') {
                    $(this).val(value);
                }

            });
        }
    } catch (e) {
        alert("加载表单：" + e.message + ",数据内容" + JSON.stringify(jsonStr));
    }
}

/**
 * 通用拼接checkbox数据
 * @param checkboxName
 * @returns {string}
 */
function getCheckboxValue (checkboxName) {
    var value = ''
    // 遍历name=operateType的多选框
    var element = 'input:checkbox[name=\"' + checkboxName + '\"]:checked'
    $(element).each(function () {
        value += ',' + $(this).val()
    })
    value = value.substr(1)
    return value
}

/**
 * 点击分组改变背景
 * @param item
 */
function changeBackground (item) {
    var d = $('ul').find('li')
    for (var p = d.length; p--;) {
        if (d[p].innerText.substring(1) != item) {
            $(d[p]).css('backgroundColor', '#FFFFFF')
            $(d[p]).find('a').css('color', '#76756F')
        }
        else {
            $(d[p]).find('a').css('color', '#0AAF53')
            $(d[p]).css('backgroundColor', '#E2F2E4')
        }
    }
}

function getUrlKey (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null

}

/**
 * json转列表
 * @param myId
 * @param array
 * @param tempArray
 * @param tempKeyArray
 * @param prex
 */
function importIntoArray (myId, array, tempArray, tempKeyArray,prex) {
    var key, value, paramNullFlag, paramType,tempValue
    for (var x in tempArray) {
        key = x
        //判断是否已经存在
        if(tempKeyArray.indexOf(prex+key) != -1){
            continue
        }
        tempValue = value = tempArray[x]
        if(jQuery.type(value) === "null"){
            paramType = 1
            paramNullFlag = 0
        }
        else if(jQuery.type(value) === "number"){
            paramType = 2
            paramNullFlag = 1
        }
        else if(jQuery.type(value) === "boolean"){
            paramType = 8
            paramNullFlag = 1
        }
        else if(jQuery.type(value) === "object"){
            paramType = 13
            paramNullFlag = 1
            tempValue = ''
        }
        else if(jQuery.type(value) === "array"){
            paramType = 14
            paramNullFlag = 1
            tempValue=''
        }else{
            //string处理
            paramType = 1
            paramNullFlag = 1
        }
        array.push({
            myId: myId++,
            paramKey: prex+key,
            paramName: key,
            paramType: paramType,
            paramNullFlag: paramNullFlag,
            paramLength: '',
            paramValue: tempValue,
            paramDesc: '',
        })
        tempKeyArray.push(prex + key)
        //有子节点需要进行递归处理
        if(jQuery.type(value) === "object"){
            importIntoArray(myId, array,value, tempKeyArray, prex + key+'>>')
        }else if(jQuery.type(value) === "array"){
            //数组需要递归处理，添加完整的key
            for(var i = 0;i <value.length; i++){
                importIntoArray(myId, array, value[i], tempKeyArray, prex + key + '>>')
            }
        }

    }
}

function arrayToJson (paramArray) {
    let length = paramArray.length
    let tempParamArray = paramArray
    if(length === 0){
        return '{}'
    }
    let tempParam, tempType,tempKey,tempValue
        ,str= '{'
    let parentKeyArray = new Array()
    //初始化根节点，string类型
    parentKeyArray.push({
        key: '',
        type: 1
    })
    for(let i = 0;i<length;i++){
        tempParam = tempParamArray[i]
        tempKey = tempParam.paramKey
        tempType = tempParam.paramType
        tempValue = tempParam.paramValue
        //对象，存在子节点
        if(tempType === 13){
            let subLen = tempKey.lastIndexOf('>>')
            let parent = tempKey.substring(0, subLen)
            if (subLen < 0 ) {
                str += '"' + tempKey + '":{'
            }else{
                //是子数组
                let subKey = tempKey.substring(subLen + 2)
                //判断父节点参数与传入参数是否相同
                if (parent !== parentKeyArray[parentKeyArray.length - 1].key) {
                    //说明子节点元素结束，需要处理end的括号
                    for (var k = parentKeyArray.length - 1; k >= 0; k--) {
                        if (parent !== parentKeyArray[k].key) {
                            if (str.lastIndexOf(',')) {
                                str = str.substring(0, str.length - 1)
                            }
                            if (parentKeyArray[k].type === 13 || parentKeyArray[k].type === 1) {
                                str += '},'
                            } else {
                                str += '}],'
                            }
                            parentKeyArray.pop()
                        } else {
                            break
                        }
                    }
                }
                str += '"' + subKey + '":{'
            }
            //数组
            parentKeyArray.push({
                key: tempKey,
                type: tempType
            })

        }else if(tempType === 14){
            let subLen = tempKey.lastIndexOf('>>')
            //是子数组
            let parent = tempKey.substring(0, subLen)
            if (subLen < 0) {
                str += '"' + tempKey + '":[{'
            } else {
                let subKey = tempKey.substring(subLen + 2)
                //判断父节点参数与传入参数是否相同
                if (parent !== parentKeyArray[parentKeyArray.length - 1].key) {
                    //说明子节点元素结束，需要处理end的括号
                    for (var k = parentKeyArray.length - 1; k >= 0; k--) {
                        if (parent !== parentKeyArray[k].key) {
                            if (str.lastIndexOf(',')) {
                                str = str.substring(0, str.length - 1)
                            }
                            if (parentKeyArray[k].type === 13 || parentKeyArray[k].type === 1) {
                                str += '},'
                            }else {
                                str += '}],'
                            }
                            parentKeyArray.pop()
                        } else {
                            break
                        }
                    }
                }
                str += '"' + subKey + '":[{'
            }
            //数组
            parentKeyArray.push({
                key: tempKey,
                type: tempType
            })
        }else{
            //根节点下元素，非对象，数组元素
            //子一级参数
            let subLen = tempKey.lastIndexOf('>>')
            let parent = tempKey.substring(0, subLen)
            let subKey = tempKey.substring(subLen + 2)
            if(subLen < 0){
                subKey = tempKey
            }
            //判断父节点参数与传入参数是否相同
            if (parent === parentKeyArray[parentKeyArray.length - 1].key) {
                if (tempValue && tempValue !== 'null') {
                    str += '"' + subKey + '":"' + tempValue + '",'
                } else {
                    str += '"' + subKey + '":null,'
                }
            } else {
                //说明子节点元素结束，需要处理end的括号
                for(var k = parentKeyArray.length-1;k>=0;k--){
                    if(parent !== parentKeyArray[k].key){
                        if (str.lastIndexOf(',')) {
                            str = str.substring(0, str.length - 1)
                        }
                        if (parentKeyArray[k].type === 13 || parentKeyArray[k].type === 1) {
                            str += '},'
                        } else {
                            str += '}],'
                        }
                        parentKeyArray.pop()
                    }else{
                        break
                    }
                }
                if (tempValue && tempValue !== 'null') {
                    str += '"' + subKey + '":"' + tempValue + '",'
                } else {
                    str += '"' + subKey + '":null,'
                }
            }
        }
    }
    //TODO 需要处理无法截取的问题
    if (str.lastIndexOf(',')) {
        let len = str.length - 1
        str = str.substring(0, len)
    }
    //收尾工作，需要处理parentKeyArray中还存在的父节点进行end处理
    for (var k = parentKeyArray.length - 1; k >= 0; k--) {
        if (parentKeyArray[k].type === 13 || parentKeyArray[k].type === 1) {
            str += '}'
        } else {
            str += '}]'
        }
        parentKeyArray.pop()
    }
    return str
}
