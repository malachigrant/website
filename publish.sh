yarn build
now="$(date +'%Y/%m/%d %r')"
echo "Publish $now"
cd dist
git add .
git commit -m "$now"
git push
cd ..