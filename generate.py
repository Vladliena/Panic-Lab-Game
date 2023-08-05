import json
from random import choice
from monster import Monster

class Generate:
    def monster_arg() -> list:
        d = {
          'color': ['red','blue'],
          'shape': ['round','square'],
          'direction': ['left','right'],
          'steps': [4,5,6,7,8,9,10,11,12],
          'start_room': list(range(1,13))
        }
        return list(choice(d[key]) for key in list(k for k in d))   
    
    def monster_dict(arg) -> dict:
        d = {
          'color': arg[0],
          'shape': arg[1],
          'direction': arg[2],
          'steps': arg[3],
          'start_room': arg[4]
        }
        return d
    
    def monster(arg):
        return Monster(color = arg[0], shape = arg[1], direction = arg[2], steps = arg[3], start_room = arg[4])
    
    def generate_json_file(arg, name):
        with open(name+'.json', 'w') as file:
            json.dump(arg, file)  
    
    def generate_json(arg):
        return json.dumps(arg, indent=4, sort_keys=True)