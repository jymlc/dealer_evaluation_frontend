const http = require('node:http')
const { dealers } = require('./dealers.json')

function send(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  })
  response.end(JSON.stringify(body))
}

http.createServer((request, response) => {
  if (request.method !== 'GET') {
    return send(response, 405, { message: 'Method not allowed.' })
  }
  let parts
  try {
    parts = new URL(request.url, 'http://localhost').pathname.split('/').slice(1).map(decodeURIComponent)
  } catch {
    return send(response, 400, { message: 'Invalid request path.' })
  }
  const [route, first, second] = parts
  if (route === '' && parts.length === 1) return send(response, 200, { service: 'Dealer Pricing' })
  if (route === 'price' && parts.length === 3) {
    const dealer = dealers.find(({ Dealer }) => Dealer === first)
    if (!dealer || !Object.hasOwn(dealer.products, second)) {
      return send(response, 404, { message: 'No price found for this dealer and product.' })
    }
    return send(response, 200, { message: `${second} costs ${dealer.products[second]} at ${first}` })
  }
  if (route === 'allprice' && parts.length === 2) {
    const prices = dealers.filter(({ products }) => Object.hasOwn(products, first))
      .map(({ Dealer, products }) => ({ key: Dealer, value: products[first] }))
    return prices.length
      ? send(response, 200, { prices })
      : send(response, 404, { message: 'No prices found for this product.' })
  }
  return send(response, 404, { message: 'Endpoint not found.' })
}).listen(Number(process.env.PORT || 8080), '0.0.0.0')
