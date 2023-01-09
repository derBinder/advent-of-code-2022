if __name__ == '__main__':
    file = open('input.in')
    count = 0

    for line in file:
        x = line.replace('\n', '').split(',')
        first = x[0].split('-')
        second = x[1].split('-')

        range1 = range(int(first[0]), int(first[1]))
        range2 = range(int(second[0]), int(second[1]))

        if range(max(range1.start, range2.start), min(range1.stop, range2.stop) + 1):
            count = count + 1

    print(count)
