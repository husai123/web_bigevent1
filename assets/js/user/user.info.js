$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    InitUserInfo();

    //初始化用户信息
    function InitUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败")
                } else {
                    console.log(res);
                    // 调用form.val()快速为表单复值
                    form.val("fromInfoUser", res.data)
                }
            }
        })
    }


    // 重置表单的数据
    $("#btnReset").on('click', function(e) {
        // 阻止表单的默认重置行为
        e.preventDefault()
        InitUserInfo();

    })



    //表单提交按钮
    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
            // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                    // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})