def log(matrix):
    for line in matrix:
        print(line)


def check_tail(head_y, head_x, tail_y, tail_x):
    # überlappen
    if head_y == tail_y and head_x == tail_x:
        return False

    # links oben
    if head_y == tail_y - 1 and head_x == tail_x + 1:
        return False

    # links unten
    if head_y == tail_y - 1 and head_x == tail_x - 1:
        return False

    # rechts oben
    if head_y == tail_y + 1 and head_x == tail_x + 1:
        return False

    # rechts unten
    if head_y == tail_y - 1 and head_x == tail_x - 1:
        return False

    # links rechts
    if abs(head_x - tail_x) > 1:
        return True
    # oben unten
    if abs(head_y - tail_y) > 1:
        return True

    return False


if __name__ == '__main__':
    file = open('input.in').read().split('\n')
    lines = [x.split(' ') for x in file]

    matrix = [['.'] * 1000 for i in range(1000)]
    head_x = 0
    head_y = 499

    tail_x = 0
    tail_y = 499

    matrix[499][0] = 's'

    for cmd in lines:
        print(cmd)
        # matrix[head_y][head_x] = '#'

        if cmd[0] == 'R':
            for i in range(int(cmd[1])):
                head_x += 1
                move = check_tail(head_y, head_x, tail_y, tail_x)

                if move:
                    print('Moving right')
                    tail_y = head_y
                    tail_x += 1
                    matrix[tail_y][tail_x] = '#'
                else:
                    print('Waiting for head to move out of reach')

        if cmd[0] == 'L':
            for i in range(int(cmd[1])):
                head_x -= 1
                move = check_tail(head_y, head_x, tail_y, tail_x)

                if move:
                    print('Moving left')
                    tail_y = head_y
                    tail_x -= 1
                    matrix[tail_y][tail_x] = '#'
                else:
                    print('Waiting for head to move out of reach')

        if cmd[0] == 'U':
            for i in range(int(cmd[1])):
                head_y -= 1
                move = check_tail(head_y, head_x, tail_y, tail_x)

                if move:
                    print('Moving up')
                    tail_x = head_x
                    tail_y -= 1
                    matrix[tail_y][tail_x] = '#'
                else:
                    print('Waiting for head to move out of reach')

        if cmd[0] == 'D':
            for i in range(int(cmd[1])):
                head_y += 1
                move = check_tail(head_y, head_x, tail_y, tail_x)

                if move:
                    print('Moving down')
                    tail_x = head_x
                    tail_y += 1
                    matrix[tail_y][tail_x] = '#'
                else:
                    print('Waiting for head to move out of reach')

    matrix[head_y][head_x] = 'H'

    print(sum(x.count('#') for x in matrix))
