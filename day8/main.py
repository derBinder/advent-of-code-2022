def check_down(lines, y, x):
    tree_size = lines[y][x]
    is_tree_visible = False
    for i in range(y + 1, len(lines[y][:])):
        if tree_size > lines[i][x]:
            is_tree_visible = True
        else:
            is_tree_visible = False
            break
    return is_tree_visible


def score_down(lines, y, x):
    score = 0
    tree_size = lines[y][x]
    for i in range(y + 1, len(lines[y][:])):
        if tree_size > lines[i][x]:
            score += 1
        elif tree_size <= lines[i][x]:
            score += 1
            break
    return score


def check_up(lines, y, x):
    tree_size = lines[y][x]
    is_tree_visible = False
    for i in range(0, y):
        if tree_size > lines[i][x]:
            is_tree_visible = True
        else:
            is_tree_visible = False
            break
    return is_tree_visible


def score_up(lines, y, x):
    score = 0
    tree_size = lines[y][x]
    for i in range(y - 1, -1, -1):
        if tree_size > lines[i][x]:
            score += 1
        elif tree_size <= lines[i][x]:
            score += 1
            break
    return score


def check_left(lines, y, x):
    tree_size = lines[y][x]
    is_tree_visible = False
    for i in range(0, x):
        if tree_size > lines[y][i]:
            is_tree_visible = True
        else:
            is_tree_visible = False
            break
    return is_tree_visible


def score_left(lines, y, x):
    score = 0
    tree_size = lines[y][x]
    for i in range(x - 1, -1, -1):
        if tree_size > lines[y][i]:
            score += 1
        elif tree_size <= lines[y][i]:
            score += 1
            break
    return score


def check_right(lines, y, x):
    tree_size = lines[y][x]
    is_tree_visible = False
    for i in range(x + 1, len(lines[y])):
        if tree_size > lines[y][i]:
            is_tree_visible = True
        else:
            is_tree_visible = False
            break
    return is_tree_visible


def score_right(lines, y, x):
    score = 0
    tree_size = lines[y][x]
    for i in range(x + 1, len(lines[y])):
        if tree_size > lines[y][i]:
            score += 1
        elif tree_size <= lines[y][i]:
            score += 1
            break
    return score


if __name__ == '__main__':
    file = open('input.in').read().split('\n')
    lines = [list(x) for x in file]
    score = []
    count = 2 * len(lines[0]) + 2 * len(lines[:][0]) - 4

    for y in range(1, len(lines) - 1):
        for x in range(1, len(lines[y]) - 1):
            if check_down(lines, y, x):
                count += 1
            elif check_up(lines, y, x):
                count += 1
            elif check_left(lines, y, x):
                count += 1
            elif check_right(lines, y, x):
                count += 1

    print('Part 1: ', count)

    for y in range(0, len(lines)):
        for x in range(0, len(lines[y])):
            score.append(score_down(lines, y, x) *
                         score_up(lines, y, x) *
                         score_left(lines, y, x) *
                         score_right(lines, y, x))

    print('Part 2: ', max(score))
