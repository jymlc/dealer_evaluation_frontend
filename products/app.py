import json
from pathlib import Path
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
catalog = json.loads(Path(__file__).with_name('products.json').read_text(encoding='utf-8'))
dealers_by_product = {row['product']: row['Dealers'] for row in catalog['products']}


@app.get('/')
@app.get('/products')
def products():
    return {'products': list(dealers_by_product)}


@app.get('/getdealers/<product>')
def dealers(product):
    if product not in dealers_by_product:
        return {'message': 'Product not found.'}, 404
    return {'dealers': dealers_by_product[product]}
