from monster import Monster as monster
class Room:

    def __init__(self, actionType):
        self._actionType = actionType

    def monsterSetter(self, monster):
        if self._actionType == 'shape':
            if monster.shape:
                monster.shapeSetter(shape)
        elif self._actionType == 'color':
            monster._actionType()
        elif self._actionType == 'direction':
            monster.directionSetter()
        return monster 
