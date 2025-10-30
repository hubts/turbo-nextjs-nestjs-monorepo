/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import { css } from "@emotion/react";

const mainTitle = "원랜디 데이터베이스";
// const menus: {
//     link: string;
//     title: string;
// }[] = [];

export default function Layout(input: { children: any; pageTitle?: string }) {
    const { children, pageTitle } = input;

    return (
        <>
            <Head>
                <meta property="og:description" content="ORDB" />
                <meta property="og:type" content="website" />
                <link rel="icon" href="/logo/favicon.ico" type="image/x-icon" />
                <title>{pageTitle ?? mainTitle}</title>
            </Head>
            <div css={layoutWrapper}>
                {/* Navigation Bar */}
                {/* <Header menus={menus} /> */}
                {/* <Header menus={menus} /> */}
                {/* Main Content */}
                <section>{children}</section>
                {/* Footer */}
                {/* <Footer /> */}
            </div>
        </>
    );
}

const layoutWrapper = css({
    width: "100%",
    minHeight: "100vh",
    position: "relative",
});
