import numpy as np
import re

if __name__ == '__main__':
    file = open('input.in').read()
    crates, instructions = file.split('\n\n')
    crates = [x for x in crates.split('\n')]
    instructions = [x.split(' ') for x in instructions.split('\n')]
    instructions = np.array([np.delete(x, [0, 2, 4]) for x in instructions])
    crates = crates[:-1]
    matrix = []
    for c in crates:
        c = c + ' '
        matrix.append(re.findall('....', c))

    matrix = np.array(matrix)
    print(matrix[:, 0])

    # m = np.array([[1, 2, 3],
    #               [2, 3, 3],
    #               [5, 4, 3]])
    # print(np.rot90(matrix))

    # crates = np.flip(crates, 0)
    # print(crates)
    # print(instructions)
