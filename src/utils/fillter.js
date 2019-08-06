import Vue from 'vue'

Vue.filter("formatDate", function(value, relu, day) { //全局方法 Vue.filter()注册过滤器, 1*10 => 2018-01-01 09:01:01
	if(!value) return relu != undefined ? relu : '/'
	let timeStamp = +(value + '0000000000000').slice(0, 13)
	let date = new Date(timeStamp)
	let Y = date.getFullYear() + '-'
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	if(!day) {
		let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
		let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
		let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		return Y + M + D + h + m + s
	} else {
		return Y + M + D
	}
})

Vue.filter("formatDateDay", function(value, relu) { //全局方法 Vue.filter()注册过滤器, 1*10 => 2018-01-01
	if(!value) return relu != undefined ? relu : '/'
	let timeStamp = +(value + '0000000000000').slice(0, 13)
	let date = new Date(timeStamp)
	let Y = date.getFullYear() + '-'
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
	return Y + M + D
})

Vue.filter("formatSecs", function(value, tUnit = '时', mUnit = '分') { //全局方法 Vue.filter()注册过滤器, 1*10 => 天时分
	if(!value || value < 1) return '未设置'
	let D = Math.floor(value / 3600 / 24)
	let h = Math.floor(value / 3600) % 24
	let m = Math.floor(value / 60) % 60
	let t = ''
	if(D) {
		t = D + ' 天 '
	}
	if(h) {
		t = t + h + ' ' + tUnit + ' '
	}
	if(m) {
		t = t + m + ' ' + mUnit + ' '
	}
	if(!t) {
		t = value + ' 秒 '
	}
	return t
})