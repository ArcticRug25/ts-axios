import axios, { AxiosResponse, AxiosError } from '../src/index'
import { getAjaxRequest } from './helper'

describe('requests', () => {
    beforeEach(() => {
        jasmine.Ajax.install()
    })

    afterEach(() => {
        jasmine.Ajax.uninstall()
    })

    test('should treat single string arg as url', () => {
        axios('/foo')

        return getAjaxRequest().then(request => {
            expect(request.url).toBe('/foo')
            expect(request.method).toBe('GET')
        })
    })

    test('should treat method value as lowercase string', () => {
        axios({
            url: '/foo',
            method: 'POST'
        }).then(response => {
            expect(response.config.method).toBe('post')
        })

        return getAjaxRequest().then(request => {
            request.respondWith({
                status: 200
            })
        })
    })
})