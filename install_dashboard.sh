# Ubuntu LTS 18.04
# User running script must have sudo priveleges, so typically run as ubuntu
# Expects the following files to be in the same directory 
# as this file and where these commands or this script is run from
# 1. clone_repo.py
# 2. dashboard.service
# 3. nginx.conf
# All these files can be found under eap-bcg/dashboard_v1

if [[ "$#"  != "1" ]]; then
	echo "Usage: <public ip address>"
	exit 1
fi

ip=$1

echo "Using ip address: $ip"

# The branch to be use for building the UI and codebase for backend server.
branch='origin/dashboard_v1'

# internal to script
user=`whoami`
currdir=`pwd`


sudo apt-get update

# pip is missing and python is called python3
sudo apt-get install -y python3-pip python3-venv npm nginx

# establish a virtual environment
pip3 install boto3 

# clone repository
python3 clone_repo.py
cd eap-bcg
git checkout $branch

#pip3 install -r requirements.txt 

# BUILD UI
cd dashboard_v1/client
echo 'REACT_APP_BABEL_STAGE_0=true' > .env
echo 'REACT_APP_DECORATORS=true' >> .env
npm install
# Manual Step: BEFORE YOU BUILD, make sure to update the 'localhost' to the ip of the server in 
# src/services/ApiService.js
sed -i "s/localhost/$ip/g" src/services/ApiService.js
npm run build

# copy over the files to /var/www
sudo mkdir /var/www
sudo mkdir /var/www/dashboard
sudo chown -R $user /var/www/dashboard
cp -R build/* /var/www/dashboard

cd $currdir

# updated nginx.conf and restart nginx
sudo cp nginx.conf /etc/nginx

# now lets setup the backend server service
sudo mkdir /app
sudo chown -R $user /app
cd eap-bcg/dashboard_v1/server
pip3 install -r requirements.txt
cp -R . /app

cd $currdir
chmod 664 dashboard.service
sudo cp dashboard.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable dashboard
sudo systemctl enable nginx
sudo systemctl restart dashboard
sudo systemctl restart nginx



