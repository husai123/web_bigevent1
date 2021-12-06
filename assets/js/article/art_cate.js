$(function() {

    var form = layui.form;
    var layer = layui.layer;


    initArtCateList();
    //获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    // 添加按钮绑定事件

    var index = null;
    $("#btnAddCate").on("click", function() {
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })



    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $("body").on("submit", "#form-add", function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("新增文章分类失败")
                } else {
                    initArtCateList();
                    layer.msg("新增文章分类成功");
                    layer.close(index);
                }
            }
        })
    })

    // `btn-edit` 按钮绑定点击事件：
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr("data-id");
        console.log(id);
        $.ajax({
            method: "get",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val("form-edit", res.data)
            }
        })
    })




    //通过代理事件，为form-edit表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })



    // 通过代理的形式，为删除按钮绑定点击事件：
    $("tbody").on("click", ".btn-delete", function() {
        var id = $(this).attr("data-id");
        //eg1
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {

            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除文章分类失败！")
                    } else {
                        layer.msg("删除文章分类成功！")
                        layer.close();
                        initArtCateList();
                    }
                }
            })

        });

    })
})