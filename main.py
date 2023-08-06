from flask import Flask, render_template, request
import json
from datetime import datetime
from game import move_marker

app = Flask(__name__)

start_monster_data = [{}]

@app.template_filter('timestamp')
def timestamp():
    # Generate a timestamp as the version
    return int(datetime.now().strftime('%H:%M:%S').replace(':', ''))

@app.route('/', methods=['GET', 'POST'])
def index():
    
    if request.is_json:
       
        if request.method == 'POST':
            monster = json.loads(request.data)
            start_monster_data.append({datetime.now().strftime("%Y-%m-%d %H:%M:%S") : monster})
            print(monster)
            return monster, 201 

        if request.method == 'GET':
            last_monster_entry = start_monster_data[-1]
            monster = list(last_monster_entry.values())[0]
            changed_monster = move_marker(monster)
            #changed_monster, game_steps = move_marker(monster)
            print(changed_monster)
            return json.dumps(changed_monster), 201    

    print(start_monster_data)        
    return render_template('index.html', version=timestamp())   

@app.route('/favicon.ico')
def favicon():
    # Return an empty response to ignore the request for favicon.ico
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)    