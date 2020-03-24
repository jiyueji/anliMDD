import boto3
import subprocess
import json
import sys
import time
import datetime


# Get secrets
secrets_client = boto3.client('secretsmanager', 'us-east-1')
secrets_response = secrets_client.get_secret_value(SecretId="pipeline_git_creds")
secret = json.loads(secrets_response.get('SecretString'))
git_name = secret.get('git_acct_name')
git_pw = secret.get('git_acct_pw')

# Create https string:
git_url = "https://" + git_name + ":" + git_pw + "@github.com/AmwayCorp/eap-bcg.git"
# Clone git repo
subprocess.call(["git", "clone", git_url])