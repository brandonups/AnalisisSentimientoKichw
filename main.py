from flask import Flask, render_template,request,redirect,url_for
import metodos as m
app = Flask(__name__)

@app.route('/')
def _(): 
  return render_template('home.html')

@app.route('/cj', methods = ['GET'])
def _cj():
  return m.metodo(request.values.get('frase')),200,{'Content-Type': 'application/json'}

if __name__ == '__main__':
  app.run(host='0.0.0.0',debug=True) 