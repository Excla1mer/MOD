import random

N = 10
UE = [[[0 for i in range(100)]for j in range(3)] for l in range(N)]
for i in range(N):
    for j in range(3):
        if j == 0:
            UE[i][j][0] = random.expovariate(0.05)
            for l in range(99):
                UE[i][j][l+1] = random.expovariate(0.05) + UE[i][j][l]
        elif j == 1:
            for l in range(100):
                UE[i][j][l] = False
        else:
            for l in range(100):
                UE[i][j][l] = False


# for i in range(N):
#     for j in range(3):
#         for l in range(100):
#             print(UE[i][j][l])
k = 0
for i in range(2000):

    for l in range(100):
        for j in range(N):
            if UE[j][0][l] < i and UE[j][1][l] == False:
                k += 1
                UE[j][2][l] = True
    if k > 1:
        for l in range(100):
            for j in range(N):
                if UE[j][2][l] == True and UE[j][1][l] == False:
                    UE[j][0][l] = UE[j][0][l] + random.randrange(3, 5)
                    UE[j][2][l] = False
    elif k == 1:
        for l in range(100):
            for j in range(N):
                if UE[j][2][l] == True:
                    UE[j][1][l] = True
    k = 0

for i in range(N):
    for j in range(3):
        print("\n")
        for l in range(100):
            print(UE[i][j][l], end=' ')
