import "@/styles/globals.css";
import AppLayout from "@/layout/AppLayout";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ConfigProvider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </RecoilRoot>
  );
}
