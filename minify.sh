read -p "./min/ will be cleaned, continue? (y/n) " choice
echo
case "$choice" in 
  y|Y )
    mkdir -p min/js
    mkdir -p min/css
    mkdir -p min/images
    rm min/js/*.js
    rm min/css/*.css
    rm min/*.html
    rm min/images/*
    for file in `pwd`/src/js/*.js; do terser $file -c -m -o `pwd`/min/js/`basename $file` && echo "$file successfully processed"; done
    for file in `pwd`/src/css/*.css; do cleancss $file -o `pwd`/min/css/`basename $file` && echo "$file successfully processed"; done
    mkdir -p src/html
    cp src/*.html src/html
    html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css false --minify-js false --input-dir ./src/html --output-dir ./min
    rm -rf src/html
    cp src/images/* min/images/
    ;;
  n|N ) exit 1;;
  * ) echo "invalid";;
esac
