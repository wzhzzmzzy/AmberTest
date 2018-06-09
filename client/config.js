/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var dev_host = 'https://megiw63o.qcloud.la';
var host = 'https://371080126.wzhzzmzzy.xyz';
var image = 'https://ssl.liontao.xin';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,
        searchUrl: `${host}/weapp/search`,
        detailUrl: `${host}/weapp/detail`, // + :id
        allComment: `${host}/weapp/comment`,
        addComment: `${host}/weapp/comment`,

        // Catagory
        catagoryUrl: `${host}/weapp/catagory`, // + :name
        timelineUrl: `${host}/weapp/timeline`,
        publishUrl: `${host}/weapp/publish`,

        // Mine
        myPublished: `${host}/weapp/mine/published`,
        mySold: `${host}/weapp/mine/sold`,
        myBought: `${host}/weapp/mine/bought`,
        myOnTrans: `${host}/weapp/mine/ontrans`,
        myMessage: `${host}/weapp/message`,

        // Location
        myLocation: `${host}/weapp/location`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 上传图片接口
        /* 
        POST: {
            uploadfile: ''
        }
        */
        uploadUrl: `${image}/upload/`,
        imageUrl: `${image}/images/`
    }
};

module.exports = config;
