import { MainTitleStyle } from "./MainTitle.Style";

export default function MainTitle() {
    return (
        <div css={MainTitleStyle.Container}>
            <div css={MainTitleStyle.GlowEffect} />
            <div css={MainTitleStyle.WaveEffect} />
            <div css={MainTitleStyle.WaveEffect2} />
            <div css={MainTitleStyle.Content}>
                <div css={MainTitleStyle.IconContainer}>
                    <div css={MainTitleStyle.GameIcon}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            css={MainTitleStyle.IconSvg}
                        >
                            <path d="M17 15l1.55 1.55c-.96 1.69-3.33 3.04-5.55 3.37V11h3V9h-3V7.82C14.16 7.4 15 6.3 15 5c0-1.65-1.35-3-3-3S9 3.35 9 5c0 1.3.84 2.4 2 2.82V9H8v2h3v8.92c-2.22-.33-4.59-1.68-5.55-3.37L7 15H3l6 7 6-7h-4z" />
                        </svg>
                    </div>
                </div>
                <div css={MainTitleStyle.TextContainer}>
                    <h1 css={MainTitleStyle.MainTitle}>
                        <span css={MainTitleStyle.TitleGlow} data-text="ORDB">
                            ORDB
                        </span>
                    </h1>
                    <div css={MainTitleStyle.SubtitleContainer}>
                        <p css={MainTitleStyle.Subtitle}>
                            One Piece Random Defense
                        </p>
                        <p css={MainTitleStyle.SubtitleAccent}>
                            Data Analytics Platform
                        </p>
                    </div>
                </div>
            </div>
            <div css={MainTitleStyle.DecorativeLine} />
        </div>
    );
}
