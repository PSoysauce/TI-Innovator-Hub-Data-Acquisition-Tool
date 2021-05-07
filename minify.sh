read -p "./min/ will be cleaned, continue? (y/n) " choice
echo
case "$choice" in 
  y|Y )
    mkdir -p min/js
    mkdir -p min/css
    mkdir -p min/images
    mkdir -p min/dependencies
    rm min/js/*.js
    rm min/css/*.css
    rm min/*.html
    rm min/images/*
    rm min/dependencies/*
    for file in src/js/*.js; do terser $file -c -m -o min/js/`basename $file` && echo "$file successfully processed"; done
    for file in src/dependencies/*.js; do terser $file -c -m -o min/dependencies/`basename $file` && echo "$file successfully processed"; done
    for file in src/css/*.css; do cleancss $file -o min/css/`basename $file` && echo "$file successfully processed"; done
    for file in src/dependencies/*.css; do cleancss $file -o min/dependencies/`basename $file` && echo "$file successfully processed"; done
    #for file in src/dependencies/*.css; do purifycss $file min/*.html min/js/*.js min/css/*.css --out min/dependencies/`basename $file` && echo "$file successfully processed"; done
    mkdir -p src/html
    cp src/*.html src/html
    html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css false --minify-js false --input-dir ./src/html --output-dir ./min
    rm -rf src/html
    cp src/images/* min/images/
    
    echo "Stripping comments..."
    stripcomments -w min/js/*.js min/dependencies/*.css min/css/*.css min/*.html --confirm-overwrite > /dev/null
    echo "Done."
    ;;
  n|N ) exit 1;;
  * ) echo "invalid";;
esac
