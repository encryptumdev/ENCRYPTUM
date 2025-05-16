import os
from web3 import Web3
import json

class EthClient:
    def __init__(self):
        self.rpc = os.getenv("ETH_RPC")
        self.private_key = os.getenv("PRIVATE_KEY")
        self.contract_address = os.getenv("CONTRACT_ADDRESS")

        self.web3 = Web3(Web3.HTTPProvider(self.rpc))
        self.account = self.web3.eth.account.privateKeyToAccount(self.private_key)

        with open("artifacts/contracts/MCP.sol/MCP.json") as f:
            abi = json.load(f)["abi"]
        self.contract = self.web3.eth.contract(address=self.contract_address, abi=abi)

    def update_memory(self, agent_id, memory_cid):
        nonce = self.web3.eth.get_transaction_count(self.account.address)
        txn = self.contract.functions.updateMemory(agent_id, memory_cid).buildTransaction({
            'nonce': nonce,
            'from': self.account.address,
            'gas': 200000,
            'gasPrice': self.web3.toWei('20', 'gwei'),
        })
        signed_txn = self.account.sign_transaction(txn)
        tx_hash = self.web3.eth.send_raw_transaction(signed_txn.rawTransaction)
        return tx_hash.hex()

    def get_memory(self, agent_id):
        return self.contract.functions.getMemory(agent_id).call()
