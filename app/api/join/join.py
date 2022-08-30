# pip3 install requests
import requests
import json

API_KEY = "mirotalksfu_default_secret"
MIROTALK_URL = "https://sfu.mirotalk.com/api/v1/join"
# MIROTALK_URL = "http://localhost:3010/api/v1/join"

headers = {
    "authorization": API_KEY,
    "Content-Type": "application/json",
}

data = {
    "room": "test",
    "password": "false",
    "name": "mirotalksfu",
    "audio": "true",
    "video": "true",
    "screen": "true",
    "notify": "true",
}

response = requests.post(
    MIROTALK_URL,
    headers=headers,
    json=data,
)

print("Status code:", response.status_code)
data = json.loads(response.text)
print("join:", data["join"])
