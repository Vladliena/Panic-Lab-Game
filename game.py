def move_marker(monster):    
    start_color = monster['color']
    start_shape = monster['shape'] 
    start_direction = monster['direction']
    starting_room = monster['startcell'] 
    steps = monster['steps']
    total_rooms = 12
    reversed_rooms = [2, 6, 10]
    reversed_color = [5, 9, 12]
    reversed_shape = [1, 4, 8]
    
    def get_next_room(room, current_direction):
        return (room + current_direction + total_rooms - 1) % total_rooms + 1

    direction = 1 if start_direction == 'righ' else -1
    color = 1 if start_color == 'red' else -1
    shape = 1 if start_shape == 'round' else -1

    current_room = starting_room
    if current_room in reversed_rooms:
        direction *= -1

    if current_room-1 in reversed_color:
        color *= -1    

    if current_room-1 in reversed_shape:
        shape *= -1

    game_steps = []
    only_steps = []

    for i in range(steps):
        current_room = get_next_room(current_room, direction)
        if current_room in reversed_rooms:
            direction *= -1

        if current_room in reversed_color:
            color *= -1

        if current_room in reversed_shape:        
            shape *= -1

        step_direction = 'clockwise' if direction == 1 else 'counterclock-wise' 
        step_color = 'red' if color == 1 else 'blue' 
        step_shape = 'round' if shape == 1 else 'square'  
        print(step_color, step_shape, step_direction)
        
        game_steps.append({'color': step_color, 'shape': step_shape, 'direction': start_direction, 'steps': i + 1, 'cell': current_room})
        only_steps.append(current_room)

    end_monster = {'color': step_color, 'shape': step_shape, 'endcell': current_room, 'steps': only_steps}

    return end_monster   