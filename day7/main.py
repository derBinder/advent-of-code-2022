from anytree import Node


def calc_size(root, sizes):
    for child in root.children:
        if child.children:
            if child.path not in sizes:
                sizes[child.path] = 0
            calc_size(child, sizes)
            sizes[root.path] = sizes[root.path] + sizes[child.path]
            child.calc = True
            child.size = sizes[child.path]
            root.size = sizes[root.path]
        else:
            if hasattr(child, 'size'):
                if root.path not in sizes:
                    sizes[root.path] = 0
                sizes[root.path] = sizes[root.path] + int(child.size)
                child.calc = True


if __name__ == '__main__':
    file = open('input.in').read().split('\n')
    root = None
    currentNode = None
    sizes = {'/': 0}

    for line in file:
        if line.startswith('$'):
            command = line.split()[1]
            if command == 'cd':
                attribute = line.split()[2]
                if attribute != '..':
                    if attribute == '/':
                        root = Node(attribute, calc=False)
                        currentNode = root
                    else:
                        currentNode = Node(attribute, parent=currentNode, calc=False)
                else:
                    if currentNode.name != '/':
                        currentNode = currentNode.parent
        if str.isnumeric(line.split()[0]):
            node = Node(line.split()[1], parent=currentNode, size=line.split()[0], calc=False)

    calc_size(root, sizes)

    result = 0
    for key, value in sizes.items():
        if value <= 100000:
            # print(key, value)
            result = result + value

    print('Part 1: ', result)

    unused_space = 70000000 - root.size
    space_needed = 30000000 - unused_space

    passed = [value for key, value in sizes.items() if value >= space_needed]
    print('Part 2: ', min(passed))
