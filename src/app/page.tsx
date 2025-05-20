import HomeScreen from "@/screens/home.screen";
import FileProvider from "@/utilities/file_context/file.context";
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
