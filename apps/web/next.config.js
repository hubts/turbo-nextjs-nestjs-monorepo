/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    output: "standalone",
    reactStrictMode: true,
    experimental: {
        serverActions: {
            bodySizeLimit: "100mb",
        },
    },
    images: {
        loader: "custom",
        loaderFile: "./src/libs/image-loader.ts",
    },
};
export default nextConfig;
