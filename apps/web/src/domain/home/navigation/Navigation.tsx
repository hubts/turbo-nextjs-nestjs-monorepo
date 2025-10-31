import { FaExternalLinkAlt } from "react-icons/fa";
import { NavigationStyle } from "./Navigation.Style";

interface Props {
    version: string;
}

export default function Navigation(input: Props) {
    return (
        <div css={NavigationStyle.Container}>
            <div css={NavigationStyle.NavigationContent}>
                <div css={NavigationStyle.LinkSection}>
                    <div css={NavigationStyle.LinkGroup}>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            css={NavigationStyle.NavigationLink}
                        >
                            <div css={NavigationStyle.LinkIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    css={NavigationStyle.IconSvg}
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <span css={NavigationStyle.LinkText}>GitHub</span>
                            <FaExternalLinkAlt
                                css={NavigationStyle.ExternalIcon}
                            />
                        </a>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            css={NavigationStyle.NavigationLink}
                        >
                            <div css={NavigationStyle.LinkIcon}>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    css={NavigationStyle.IconSvg}
                                >
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                </svg>
                            </div>
                            <span css={NavigationStyle.LinkText}>GitHub</span>
                            <FaExternalLinkAlt
                                css={NavigationStyle.ExternalIcon}
                            />
                        </a>
                    </div>
                </div>
                <div css={NavigationStyle.VersionSection}>
                    <div css={NavigationStyle.VersionBadge}>
                        <div css={NavigationStyle.VersionIcon}>
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                css={NavigationStyle.VersionIconSvg}
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <span css={NavigationStyle.VersionText}>
                            GitHub Version {input.version}
                        </span>
                        <div css={NavigationStyle.VersionIndicator} />
                    </div>
                </div>
            </div>
        </div>
    );
}
