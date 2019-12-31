const urls = [
  'http://192.168.1.250:80/',
	'http://weiwo.info/',
	'http://weiwo.info/'
]
const isProduction = process.env.NODE_ENV === 'production'
const baseUrl = urls[Number(isProduction)]

export {
	baseUrl
}
