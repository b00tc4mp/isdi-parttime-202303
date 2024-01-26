cd "${0%/*}"

git checkout feature/fullstack
git pull
cd "./api"
npm i 

cd "../app"
npm i 