import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?: string | null
    request?: any
    response?: AxiosResponse

    constructor(
        message: string,
        config: AxiosRequestConfig,
        code?: string | null,
        request?: any,
        response?: AxiosResponse
    ) {
        super(message)

        this.config = config
        this.code = code
        this.request = request
        this.response = response

        this.isAxiosError = true

        // 当继承 Error、Array、Map 时 例如 AxiosError 上的方法 经过实例化调用是调用不到的 需要以下操作
        Object.setPrototypeOf(this, AxiosError.prototype)
    }
}

// 工厂函数
export function createError(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
) {
    const error = new AxiosError(message, config, code, request, response)
    return error
}