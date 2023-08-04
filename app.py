from flask import Flask, request, render_template
# from monster import Monster
#
app = Flask(__name__)

my_color = 'red'

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404
quit
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_form', methods=['POST'])
def process_form():
    selected_color = request.form.get('color')

    if selected_color == my_color:
        return "yes"
    else:
        return 'no'   

if __name__ == '__main__':
    app.run()  
