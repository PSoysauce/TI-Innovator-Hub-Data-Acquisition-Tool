#!/usr/bin/zsh

./minify.sh
echo "Cleaning embedded-filled.ino..."
out="embedded/out/out.ino"
cp embedded/embedded.ino $out
for f in min/*.html; do
    basename=$(basename $f)
    templateKey="{$(printf '%s' "$basename" | awk '{ print toupper($0) }')}"
    echo "Combining html/js for $templateKey..."

    # Merge JS and HTML
    filename="${basename%.*}"
    python3 replaceInFile.py '<script src="js/'$filename'.js"></script>' min/js/$filename.js $f true
done

for f in min/dependencies/* min/images/* min/css/*.css min/*.html; do
    basename=$(basename $f)
    templateKey="{$(printf '%s' "$basename" | awk '{ print toupper($0) }')}"
    echo "Filling $templateKey..."
    # Compress
    gzip -9 -c $f > embedded/$basename.gz
    # Convert into byte array
    python3 byteConvert.py embedded/$basename.gz embedded/temp
    # Embed in output file
    python3 replaceInFile.py $templateKey embedded/temp $out
    # Cleanup
    rm embedded/$basename.gz
    rm embedded/temp
done
