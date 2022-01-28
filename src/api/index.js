import { formDataPost, post, jsonPost, get } from '@/http'
import api from './apiList'

// 开票
export function openInvoice(params = {}) {
	params = Object.assign({
		sysAppName: 'payment',
		service: 'BillingOrderService',
		method: 'openInvoice',
	}, params);
	return formDataPost({
		url: api.hotpotBaseUrl,
		data: params
	});
}

