#import matplotlib.pyplot as plt
import random


class UE:
    packets = None
    packet_status = None
    packet_ready = None

    def __init__(self):
        UE.packets = []
        UE.packet_status = [False] * 100
        UE.packet_ready = [False] * 100
        UE.packets.append(random.expovariate(0.05))
        for i in range(99):
            UE.packets.append(UE.packets[i] + random.expovariate(0.05))

# UE.packets = []
# UE.packet_status = [False]*100
# UE.packets.append(random.expovariate(0.05))
# for i in range(99):
#     UE.packets.append(UE.packets[i] + random.expovariate(0.05))
#     # print("||", UE.packets[i-1], "||", UE.packets[i], "||", i)


UE1 = UE()

for v in range(100):
    print(UE1.packets[v], "\t", UE1.packet_status[v], "\t", UE1.packet_ready[v], "\t", v)

k = 0

for i in range(1000):
    for j in range(100):
        if UE1.packets[j] < i and UE1.packet_status[j] == False:
            k += 1
            UE1.packet_ready[j] = True
    if k > 1:
        for j in range(100):
            if UE1.packet_ready[j] == True and UE1.packet_status[j] == False:
                UE1.packets[j] = UE1.packets[j] + random.randrange(3, 5)
                UE1.packet_ready[j] = False
    elif k == 1:
        for j in range(100):
            if UE1.packet_ready[j] == True:
                UE1.packet_status[j] = True
    k = 0

for v in range(100):
    print(UE1.packets[v], "\t", UE1.packet_status[v], "\t", UE1.packet_ready[v], "\t", v)


