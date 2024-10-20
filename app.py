from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__, static_folder='build', template_folder='build')

# Маршрут для главной страницы
@app.route('/')
def serve_index():
    return render_template('index.html')

# Маршрут для обслуживания статических файлов (JS, CSS, и т.д.)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    # Запуск на 0.0.0.0 для развертывания на PythonAnywhere
    app.run(host='0.0.0.0', port=5000)
