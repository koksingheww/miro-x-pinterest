import React, { PropsWithChildren } from "react";
import Script from "next/script";
import { MiroSDKInit } from "../components/SDKInit";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body>
        <Script
          src="https://miro.com/app/static/sdk/v2/miro.js"
          strategy="beforeInteractive"
        />
        <MiroSDKInit />
        <div className="cs1 ce12">{children}</div>
      </body>
    </html>
  );
}
