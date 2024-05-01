import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface FlagsProps {
    regionSetter: Dispatch<SetStateAction<"JP" | "CN" | "TW" | "KR" | "NA">>;
}

interface FlagProps {
    active: boolean;
    regionSetter: Dispatch<SetStateAction<"JP" | "CN" | "TW" | "KR" | "NA">>;
}

const SvgFlagJP = ({ active, regionSetter }: FlagProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={(_) => regionSetter("JP")}
        className={"region-icon" + (active ? " active-region" : "")}
        id="region-icon-JP"
        viewBox="0 0 600 480"
        width="30"
        height="20"
    >
        <title>JP</title>
        <desc>
            <p className="region-icon-fallback">🇯🇵</p>
        </desc>
        <defs>
            <clipPath id="jp-a">
                <path fillOpacity="0.7" d="M-88 32h640v480H-88z"></path>
            </clipPath>
        </defs>
        <g fillRule="evenodd" strokeWidth="1pt" clipPath="url(#jp-a)" transform="translate(88 -32)">
            <path fill="#fff" d="M-128 32h720v480h-720z"></path>
            <circle
                cx="523.1"
                cy="344.1"
                r="194.9"
                fill="#d30000"
                transform="translate(-168.4 8.6) scale(.76554)"
            ></circle>
        </g>
    </svg>
);

const SvgFlagCN = ({ active, regionSetter }: FlagProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onClick={(_) => regionSetter("CN")}
        className={"region-icon" + (active ? " active-region" : "")}
        id="region-icon-CN"
        viewBox="0 0 30 20"
        width="30"
        height="20"
    >
        <title>CN</title>
        <desc>
            <p className="region-icon-fallback">🇨🇳</p>
        </desc>
        <defs>
            <path
                id="s"
                d="M0,-1 0.587785,0.809017 -0.951057,-0.309017H0.951057L-0.587785,0.809017z"
                fill="#FFFF00"
            ></path>
        </defs>
        <rect width="30" height="20" fill="#EE1C25"></rect>
        <use xlinkHref="#s" transform="translate(5,5) scale(3)"></use>
        <use xlinkHref="#s" transform="translate(10,2) rotate(23.036243)"></use>
        <use xlinkHref="#s" transform="translate(12,4) rotate(45.869898)"></use>
        <use xlinkHref="#s" transform="translate(12,7) rotate(69.945396)"></use>
        <use xlinkHref="#s" transform="translate(10,9) rotate(20.659808)"></use>
    </svg>
);

const SvgFlagKR = ({ active, regionSetter }: FlagProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        onClick={(_) => regionSetter("KR")}
        className={"region-icon" + (active ? " active-region" : "")}
        id="region-icon-KR"
        viewBox="-36 -24 72 48"
        width="30"
        height="20"
    >
        <title>KR</title>
        <desc>
            <p className="region-icon-fallback">🇰🇷</p>
        </desc>
        <path d="M-36-24h72v48h-72z" fill="#fff"></path>
        <g transform="rotate(-56.3099325)">
            <g id="b2">
                <path id="b" d="M-6-26H6v2H-6zm0 3H6v2H-6zm0 3H6v2H-6z"></path>
                <use xlinkHref="#b" y="44"></use>
            </g>
            <path stroke="#fff" d="M0,17v10"></path>
            <path fill="#cd2e3a" d="M0-12A12 12 0 0 1 0 12z"></path>
            <path fill="#0047a0" d="M0-12A12 12 0 0 0 0 12 6 6 0 0 0 0 0z"></path>
            <circle cy="-6" fill="#cd2e3a" r="6"></circle>
        </g>
        <g transform="rotate(-123.6900675)">
            <use xlinkHref="#b2"></use>
            <path stroke="#fff" d="M0-23.5v3M0,17v3.5M0,23.5v3"></path>
        </g>
    </svg>
);

const SvgFlagTW = ({ active, regionSetter }: FlagProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={(_) => regionSetter("TW")}
        className={"region-icon" + (active ? " active-region" : "")}
        id="region-icon-TW"
        viewBox="0 0 900 600"
        width="30"
        height="20"
    >
        <title>TW</title>
        <desc>
            <p className="region-icon-fallback">🇹🇼</p>
        </desc>
        <g fillRule="evenodd">
            <path d="M0 0h900v600H0z" fill="#fe0000"></path>
            <path d="M0 0h450v300H0z" fill="#000095"></path>
        </g>
        <path
            d="M225 37.5l-56.25 209.928L322.428 93.75 112.5 150l209.928 56.25L168.75 52.572 225 262.5l56.25-209.928L127.572 206.25 337.5 150 127.572 93.75 281.25 247.428 225 37.5"
            fill="#fff"
            paintOrder="markers fill stroke"
        ></path>
        <circle cy="150" cx="225" r="60" fill="#fff" stroke="#000095" strokeWidth="7.5"></circle>
    </svg>
);

const SvgFlagUS = ({ active, regionSetter }: FlagProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={(_) => {
            regionSetter("NA");
        }}
        className={"region-icon" + (active ? " active-region" : "")}
        id="region-icon-US"
        viewBox="0 0 640 480"
        width="30"
        height="20"
    >
        <title>US</title>
        <desc>
            <p className="region-icon-fallback">🇺🇸</p>
        </desc>
        <g fillRule="evenodd">
            <g strokeWidth="1pt">
                <path
                    fill="#bd3d44"
                    d="M0 0h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8V197H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8V512H0z"
                    transform="scale(.9375)"
                ></path>
                <path
                    fill="#fff"
                    d="M0 39.4h972.8v39.4H0zm0 78.8h972.8v39.3H0zm0 78.7h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.8h972.8v39.4H0zm0 78.7h972.8v39.4H0z"
                    transform="scale(.9375)"
                ></path>
            </g>
            <path fill="#192f5d" d="M0 0h389.1v275.7H0z" transform="scale(.9375)"></path>
            <path
                fill="#fff"
                d="M32.4 11.8L36 22.7h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 39.4l3.5 10.9h11.5L70.6 57 74 67.9l-9-6.7-9.3 6.7L59 57l-9-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7L124 57l-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5L330 57l3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 66.9L36 78h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zM64.9 94.5l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 122.1L36 133h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.7-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9H177l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 149.7l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 10.9-9.3-6.8-9.3 6.8 3.6-11-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.8-9.2 6.8 3.5-11-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 10.9-9.2-6.8-9.3 6.8 3.5-11-9.2-6.7h11.4zM32.4 177.2l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7H29zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11H177l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.3-6.7h11.5zm64.9 0l3.5 11H242l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.4zm64.8 0l3.6 11h11.4l-9.2 6.7 3.5 10.8-9.3-6.7-9.2 6.7 3.5-10.9-9.2-6.7h11.4zm64.9 0l3.5 11h11.5l-9.3 6.7 3.6 10.8-9.3-6.7-9.3 6.7 3.6-10.9-9.3-6.7h11.5zM64.9 204.8l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.3 6.7 3.6 11-9.3-6.8-9.3 6.7 3.6-10.9-9.3-6.7h11.5zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7H191zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 11-9.3-6.8-9.2 6.7 3.5-10.9-9.3-6.7H256zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.5 11-9.2-6.8-9.3 6.7 3.5-10.9-9.2-6.7h11.4zM32.4 232.4l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.3-6.7H29zm64.9 0l3.5 10.9h11.5L103 250l3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 10.9H177l-9 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.3-6.7h11.5zm64.9 0l3.5 10.9H242l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.4zm64.8 0l3.6 10.9h11.4l-9.2 6.7 3.5 10.9-9.3-6.7-9.2 6.7 3.5-11-9.2-6.7h11.4zm64.9 0l3.5 10.9h11.5l-9.3 6.7 3.6 10.9-9.3-6.7-9.3 6.7 3.6-11-9.3-6.7h11.5z"
                transform="scale(.9375)"
            ></path>
        </g>
    </svg>
);

const SvgFlagsContext = createContext<"JP" | "CN" | "TW" | "KR" | "NA">("NA");

const SvgFlags = ({ regionSetter }: FlagsProps) => {
    const region = useContext(SvgFlagsContext);

    return (
        <>
            <SvgFlagJP active={region === "JP"} regionSetter={regionSetter}></SvgFlagJP>;
            <SvgFlagCN active={region === "CN"} regionSetter={regionSetter}></SvgFlagCN>;
            <SvgFlagKR active={region === "KR"} regionSetter={regionSetter}></SvgFlagKR>;
            <SvgFlagTW active={region === "TW"} regionSetter={regionSetter}></SvgFlagTW>;
            <SvgFlagUS active={region === "NA"} regionSetter={regionSetter}></SvgFlagUS>;
        </>
    );
};
export { SvgFlagsContext, SvgFlags };
