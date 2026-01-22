"""
Vercel serverless function for calculator API.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from calculator import add, subtract, multiply, divide

app = Flask(__name__)
CORS(app)


@app.route('/api/calculate', methods=['POST'])
def calculate():
    """
    Calculate endpoint that performs arithmetic operations.

    Expected JSON body:
    {
        "operation": "add" | "subtract" | "multiply" | "divide",
        "a": number,
        "b": number
    }
    """
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No data provided'}), 400

        operation = data.get('operation')
        a = data.get('a')
        b = data.get('b')

        if operation is None or a is None or b is None:
            return jsonify({'error': 'Missing required fields: operation, a, b'}), 400

        try:
            a = float(a)
            b = float(b)
        except (ValueError, TypeError):
            return jsonify({'error': 'Invalid number format'}), 400

        operations = {
            'add': add,
            'subtract': subtract,
            'multiply': multiply,
            'divide': divide
        }

        if operation not in operations:
            return jsonify({'error': f'Invalid operation: {operation}'}), 400

        result = operations[operation](a, b)

        return jsonify({
            'result': result,
            'operation': operation,
            'a': a,
            'b': b
        })

    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok'})


# For Vercel
app = app
