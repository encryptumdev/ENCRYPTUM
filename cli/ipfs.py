import os
import requests

class IpfsClient:
    def __init__(self):
        self.token = os.getenv("WEB3_STORAGE_TOKEN")
        self.api_url = "https://api.web3.storage/upload"

    def upload(self, data):
        headers = {"Authorization": f"Bearer {self.token}"}
        files = {"file": ("memory.txt", data)}
        response = requests.post(self.api_url, headers=headers, files=files)
        if response.status_code == 200 or response.status_code == 202:
            cid = response.json()['cid']
            return cid
        else:
            raise Exception(f"IPFS upload failed: {response.text}")
