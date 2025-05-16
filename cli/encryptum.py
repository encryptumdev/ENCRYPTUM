import argparse
from cli.eth import EthClient
from cli.ipfs import IpfsClient

def main():
    parser = argparse.ArgumentParser(description="Encryptum CLI")
    parser.add_argument("--agent", type=str, required=True, help="Agent ID")
    parser.add_argument("--memory", type=str, help="Memory data to store")
    parser.add_argument("--get-memory", action="store_true", help="Get memory CID")
    args = parser.parse_args()

    eth = EthClient()
    ipfs = IpfsClient()

    if args.memory:
        # Upload memory to IPFS
        cid = ipfs.upload(args.memory)
        # Update on Ethereum
        tx_hash = eth.update_memory(args.agent, cid)
        print(f"Memory stored with CID: {cid}, tx: {tx_hash}")
    elif args.get_memory:
        cid = eth.get_memory(args.agent)
        print(f"Memory CID for agent {args.agent}: {cid}")
    else:
        print("Provide --memory to store or --get-memory to fetch")

if __name__ == "__main__":
    main()
