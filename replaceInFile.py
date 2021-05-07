import sys

filled_contents = ""
with open(sys.argv[3], "r") as f:
    filled_contents = f.read()

with open(sys.argv[2], "r") as f:
    contents = f.read()
    filled_contents = filled_contents.replace(sys.argv[1], contents)

with open(sys.argv[3], "w") as f:
    f.write(filled_contents)
