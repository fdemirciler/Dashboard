from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    # Simulate data for the dashboard
    data = {
        'sales': [random.randint(100, 1000) for _ in range(12)],
        'revenue': [random.randint(1000, 10000) for _ in range(12)],
        'customers': [random.randint(50, 500) for _ in range(12)]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)