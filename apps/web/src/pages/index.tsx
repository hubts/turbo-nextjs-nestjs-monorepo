import { getSdk } from "../api";
import MainTitle from "../domain/home/main-title/MainTitle";
import Navigation from "../domain/home/navigation/Navigation";
import { mainDiv } from "../styles/index.style";

export const getServerSideProps = async () => {
    const sdk = getSdk();
    const connected = await sdk.app.api.connection();
    return {
        props: { connected },
    };
};

export default function Home(input: { connected: boolean }) {
    const { connected } = input;

    return (
        <div css={mainDiv}>
            <MainTitle />
            <Navigation version="0.0.1" />
            <div> {connected ? "Connected" : "Not connected"} </div>
        </div>
    );
}
