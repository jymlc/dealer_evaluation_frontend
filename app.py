import os
from flask import Flask, render_template

app = Flask(__name__, template_folder='html')


@app.get('/')
def home():
    return render_template(
        'index.html',
        product_api_url=os.environ.get('PRODUCT_API_URL', 'http://127.0.0.1:5000'),
        dealer_api_url=os.environ.get('DEALER_API_URL', 'http://127.0.0.1:8080'),
    )
