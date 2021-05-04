#!/usr/bin/zsh

./minify.sh
echo "Cleaning embedded-filled.ino..."
out="embedded/out/out.ino"
cp embedded/embedded.ino $out
for f in min/*.html; do
    basename=$(basename $f)
    filename="${basename%.*}"
    js=$(cat min/js/$filename.js)
    js=${js//[&]/\\&}
    js=${js//$'\n'/$'\\\\n'}
    contents=$(cat $f | sed 's|<script src="js/'$filename'.js"></script>|<script>'$js'</script>|g')
    contents=$(printf '%s' "$contents" | sed -e 's|'\"'|\\\\"|g')
    contents=${contents//[&]/\\&}
    contents=${contents//$'\n'/$'\\\\\\\\n'}
    templateKey="{$(printf '%s' "$basename" | awk '{ print toupper($0) }')}"
    echo "Filling $templateKey..."
    sed -i 's|'$templateKey'|'"$contents"'|g' $out
done

templateKey="{STYLE.CSS}"
contents=$(cat min/css/style.css | sed -e 's|'\"'|\\\\"|g')
echo "Filling $templateKey..."
sed -i 's|'$templateKey'|'"$contents"'|g' $out

templateKey="{LOGO.PNG}"
contents=$(python imgConvert.py min/images/logo.png)
echo "Filling $templateKey..."
sed -i 's|'$templateKey'|'"$contents"'|g' $out
