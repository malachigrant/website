yarn build
now="$(date +'%Y/%m/%d %r')"
echo "Deploy $now"
cd dist
git add .
git commit -m "$now"
git push origin master
cd ..