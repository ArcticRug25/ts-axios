import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
    // 实例化 Axios 获取 Axios 上的所有方法
    const context = new Axios(config)

    const instance = Axios.prototype.request.bind(context)

    // 这样可以直接通过 Axios 发送请求 以及使用 Axios 类上的所有方法发送请求
    extend(instance, context)

    return instance as AxiosStatic
}
// console.log(defaults)
const axios = createInstance(defaults)

axios.create = function (config) {
    return createInstance(mergeConfig(defaults, config))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

axios.all = function all(promises) {
    return Promise.all(promises)
}

axios.spread = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr)
    }
}

axios.Axios = Axios

export default axios