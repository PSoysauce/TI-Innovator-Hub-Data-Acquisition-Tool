import sys

arr = "{"
with open(sys.argv[1], "rb") as f:
    while (byte := f.read(1)):
        arr += "0x" + byte.hex() + ","
arr = arr[:-1] + "}"

if (len(sys.argv) > 2):
    with open(sys.argv[2], "w") as o:
        o.write(arr)
else:
    print(arr)
