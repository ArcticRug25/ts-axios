import { isDate, isPlainObject, isURLSearchParams } from './util'

interface URLOrigin {
    protocol: string
    host: string
}

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']')
}

export function isAbsoluteURL(url: string): boolean {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}

export function buildURL(url: string, params?: any, paramsSerializer?: (params: any) => string): string {
    if (!params) {
        return url
    }

    let serializedParams

    if (paramsSerializer) {
        serializedParams = paramsSerializer(params)
    } else if (isURLSearchParams(params)) {
        serializedParams = params.toString()
    } else {
        const parts: string[] = []

        Object.keys(params).forEach((key) => {
            const val = params[key]
            // 如果 params 中有null、undefined 则跳过这次循环
            if (val === null || typeof val === 'undefined') {
                return
            }
            let values = []
            if (Array.isArray(val)) {
                values = val
                key += '[]'
            } else {
                values = [val]
            }

            values.forEach((val) => {
                if (isDate(val)) {
                    val = val.toISOString()
                } else if (isPlainObject(val)) {
                    val = JSON.stringify(val)
                }
                parts.push(`${encode(key)}=${encode(val)}`)
            })
        })

        serializedParams = parts.join('&')
    }

    if (serializedParams) {
        const markIndex = url.indexOf('#')
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }

    return url
}

export function isURLSameOrigin(requestURL: string): boolean {
    const parsedOrigin = resolveURl(requestURL)
    return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host)
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURl(window.location.href)

function resolveURl(url: string): URLOrigin {
    urlParsingNode.setAttribute('href', url)
    const { protocol, host } = urlParsingNode

    return {
        protocol,
        host
    }
}