def is_unique(x):
    seen = set()
    return not any(i in seen or seen.add(i) for i in x)


if __name__ == '__main__':
    file = open('input.in').read()
    chars = list(file)

    for i in range(14, len(chars)):
        charsToLookAt = chars[i - 14:i]
        if is_unique(charsToLookAt):
            print(i)
            break
