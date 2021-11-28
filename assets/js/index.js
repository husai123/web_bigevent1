$(function() {
    //调用getUserInfo获取基本用户信息
    getUserInfo();



    //点击按钮实现退出功能
    var layer = layui.layer
    $("#btnLogout").on("click", function() {
        //提升用户是否确认退出
        layer.confirm("确定退出登录", { icon: 3, title: '提示' }, function(index) {
            //1.清空本地储存token
            localStorage.removeItem("token")
                //2.跳转到登录页面
            location.href = "/login.html"

            layer.close(index);
        });
    })


})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            } else {
                //调用renderAvatar渲染头像
                renderAvatar(res.data)
            }
        },

        //无论成功还是失败，最终都会调用complete回调函数
        complete: function(res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //强制清空token
                localStorage.removeItem("token")
                    //强制调整到登录页面
                location.href = '/login.html'
            }
        }
    })






    //渲染用户头像
    function renderAvatar(user) {
        //获取用户的名称
        var name = user.username || user.nickname;
        //设置欢迎的文本
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
        //渲染用户的头像
        if (user.user_pic !== null) {
            //渲染图片头像
            $(".layui-nav-img").attr("src", user.user_pic).show();
            $(".text-avatar").hide();
        } {
            //渲染文本头像
            $(".layui-nav-img").hide();
            var first = name[0].toUpperCase()
            $(".text-avatar").html(first).show();
        }
    }
}