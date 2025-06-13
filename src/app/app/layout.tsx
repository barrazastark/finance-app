
import { Toaster } from "sonner";
import Layout from '../../components/Layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
        <Layout>
          <Toaster position="top-center" />
          {children}
        </Layout>
     
  );
}
