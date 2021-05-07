#!/usr/bin/zsh

./minify.sh
echo "Cleaning embedded-filled.ino..."
out="embedded/out/out.ino"
cp embedded/embedded.ino $out
for f in min/*.html; do
    basename=$(basename $f)
    templateKey="{$(printf '%s' "$basename" | awk '{ print toupper($0) }')}"
    echo "Filling $templateKey..."
    filename="${basename%.*}"
    js=$(cat min/js/$filename.js)
    js=${js//[&]/\\&}
    js=${js//$'\n'/$'\\\\n'}
    contents=$(cat $f | sed 's|<script src="js/'$filename'.js"></script>|<script>'$js'</script>|g')
    contents=$(printf '%s' "$contents" | sed -e 's|'\"'|\\\\"|g')
    contents=${contents//[&]/\\&}
    contents=${contents//$'\n'/$'\\\\\\\\n'}
    sed -i 's|'$templateKey'|'"$contents"'|g' $out
done

templateKey="{STYLE.CSS}"
echo "Filling $templateKey..."
contents=$(cat min/css/style.css | sed -e 's|'\"'|\\\\"|g')
sed -i 's|'$templateKey'|'"$contents"'|g' $out

for f in min/dependencies/* min/images/*; do
    basename=$(basename $f)
    templateKey="{$(printf '%s' "$basename" | awk '{ print toupper($0) }')}"
    echo "Filling $templateKey..."
    # Compress
    gzip -9 -c $f > embedded/$basename.gz
    # Convert into byte array
    python byteConvert.py embedded/$basename.gz embedded/temp
    # Embed in output file
    python replaceInFile.py $templateKey embedded/temp $out
    # Cleanup
    rm embedded/$basename.gz
    rm embedded/temp
done
