/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import { css } from "@emotion/react";

const mainTitle = "Website";

export default function Layout(input: { children: any; pageTitle?: string }) {
    const { children, pageTitle } = input;

    return (
        <>
            <Head>
                <meta property="og:description" content="DESCRIPTION" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/logo/favicon.ico" type="image/x-icon" />
                <title>{pageTitle ?? mainTitle}</title>
            </Head>
            <div css={layoutWrapper}>
                <section>{children}</section>
            </div>
        </>
    );
}

const layoutWrapper = css({
    width: "100%",
    minHeight: "100vh",
    position: "relative",
});
