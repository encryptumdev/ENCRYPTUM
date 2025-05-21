import FileProvider from "@/libs/file/file.context";
import HomeScreen from "@/screens/home.screen";
import Layout from "@/widgets/layout";

export default function Home() {
  return (
    <Layout>
      <FileProvider>
        <HomeScreen />
      </FileProvider>
    </Layout>
  );
}
