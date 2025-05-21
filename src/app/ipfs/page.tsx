import IPFSProvider from "@/libs/ipfs/ipfs.context";
import IpfsScreen from "@/screens/ipfs.screen";
import Layout from "@/widgets/layout";

export default function IPFS() {
  return (
    <Layout>
      <IPFSProvider>
        <IpfsScreen />
      </IPFSProvider>
    </Layout>
  );
}
