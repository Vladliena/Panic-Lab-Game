from flask import Flask, request, render_template

class Monster:

    def __init__(self, **kwargs):
        self._color = kwargs['color']
        self._shape = kwargs['shape']
        self._direction = kwargs['direction']
        self._steps = kwargs['steps']
        self._start_room = kwargs['start_room']

    @property
    def shape(self):
        return self._shape  
    
    @shape.setter
    def shape(self, shape):
        self._shape = shape      

    @property
    def color(self):
        return self._color 
    
    @color.setter
    def color(self, color):
        self._color = color   

    @property
    def direction(self):
        return self._direction
    
    @direction.setter
    def direction(self, direction):
        self._direction = direction
    
    @property
    def steps(self):
        return self._steps 

    # @steps.setter
    # def steps(self, steps):
        # self._steps = steps  

    @property
    def start_room(self):
        return self._start_room 