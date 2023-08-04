import random
import json

d = {
  'color': ['red','blue'],
  'shape': ['round','square'],
  'direction': ['left','right'],
  'steps': [6,7,8,9,10,11,12]
}

def random_monster():
    return [random.choice(d[key]) for key in ('color','shape','direction','steps')]

monster = random_monster()

with open('monsters.json', 'w') as file:
    json.dump(monster, file)
    