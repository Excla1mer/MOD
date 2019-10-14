import matplotlib.pyplot as plt
import random


N = int(input("Введите N\n"))

# T_rand = [[0, 0],    # A(x, y) 00 01
#      [1, 2],    # B(x, y) 10 11
#      [2, 0]]    # C(x, y) 20 21
k = 0
T_rand = []
for i in range(3):
    T_rand.append([])
    for j in range(2):
        random.seed()
        T_rand[i].append(random.randrange(0, 2000, 1) / 1000)


# plt.plot([0, 1, 2, 0], [0, 2, 0, 0])
plt.plot([T_rand[0][0], T_rand[1][0], T_rand[2][0], T_rand[0][0]],
         [T_rand[0][1], T_rand[1][1], T_rand[2][1], T_rand[0][1]])

for i in range(N):
    t_x = random.randrange(0, 2000, 1) / 1000
    t_y = random.randrange(0, 2000, 1) / 1000
#   print(str(t_x) + " | " + str(t_y) + "\n")
    plt.plot([t_x], [t_y], 'ro')
    test1 = (T_rand[0][0] - t_x) * (T_rand[1][1] - T_rand[0][1]) - (T_rand[1][0] - T_rand[0][0]) * (T_rand[0][1] - t_y)
    test2 = (T_rand[1][0] - t_x) * (T_rand[2][1] - T_rand[1][1]) - (T_rand[2][0] - T_rand[1][0]) * (T_rand[1][1] - t_y)
    test3 = (T_rand[2][0] - t_x) * (T_rand[0][1] - T_rand[2][1]) - (T_rand[0][0] - T_rand[2][0]) * (T_rand[2][1] - t_y)
#    print(str(test1) + " " + str(test2) + " " + str(test3))
    if (test1 >= 0 and test2 >= 0 and test3 >= 0) or (test1 < 0 and test2 < 0 and test3 < 0):
        k = k + 1

print(k)
S1 = 4 * (k/N)
S = abs((T_rand[0][0] - T_rand[2][0]) * (T_rand[1][1] - T_rand[2][1]) -
        (T_rand[1][0] - T_rand[2][0]) * (T_rand[0][1] - T_rand[2][1])) / 2
print("Площадь фигуры ~= " + str(S1))
print("Точная прощадь =" + str(S))
plt.show()


