import sys

arr = "{"
with open(sys.argv[1], "rb") as f:
    val = 0
    i = 1
    while (byte := f.read(1)):
        arr += f"{int.from_bytes(byte, 'little')},"
        #val = (val << 8) | int.from_bytes(byte, "little")
        #if (i == 4):
        #    arr += f"{val},"
        #    val = 0
        #i %= 4
        #i += 1
    #arr += f"{val},"
arr = arr[:-1] + "}"

if (len(sys.argv) > 2):
    with open(sys.argv[2], "w") as o:
        o.write(arr)
else:
    print(arr)
