import Mock from 'mockjs'

const domain = '/api/'

// 模拟login接口
Mock.mock(domain + 'login', function () {
    let result = {
        code: 200,
        message: 'OK',
        data: {
            loginUid: 10000,
            nickname: '兔子先生',
            token: 'yyds2023',
        },
    }
    return result
})