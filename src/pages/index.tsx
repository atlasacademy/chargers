import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { ChangeEvent, useState } from "react";
import { Alert, Form, Tab, Tabs } from "react-bootstrap";

import { ChargerTable } from "../Components/Chargers";
import getChargers, { CategorizedChargeInfo } from "../getters/getChargers";

import "bootstrap/dist/css/bootstrap.min.css";

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            chargers: {
                JP: await getChargers("JP"),
                CN: await getChargers("CN"),
                KR: await getChargers("KR"),
                TW: await getChargers("TW"),
                CN: await getChargers("CN"),
                KR: await getChargers("KR"),
                TW: await getChargers("TW"),
                NA: await getChargers("NA"),
            },
        },
    };
};

const App = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const chargersProps = props.pageProps.chargers;
    const [region, setRegion] = useState<"JP" | "CN" | "TW" | "KR" | "NA">("NA");
    const [tabActiveKey, setKey] = useState<
        "self-charge-aoe" | "self-charge-st" | "self-charge-support" | "targeted-party-chargers" | "notes"
    >("self-charge-aoe");

    const selectTab = (value: number) => {
        const tab = (
            ["self-charge-aoe", "self-charge-st", "self-charge-support", "targeted-party-chargers", "notes"] as const
        )[value];

        setKey(tab);
    };

    const svgFlagJP = (
        <svg xmlns="http://www.w3.org/2000/svg" className="region-icon" viewBox="0 0 640 480" width="33" height="20">
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

    const svgFlagUS = (
        <svg xmlns="http://www.w3.org/2000/svg" className="region-icon" viewBox="0 0 640 480" width="33" height="20">
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

    if (chargersProps === undefined) return null;

    let { chargers, selfChargeAOE, selfChargeST, selfChargeSupport, partyCharge, allyCharge }: CategorizedChargeInfo =
        chargersProps[region];

    if (chargers === undefined) return null;

    return (
        <>
            <Head>
                <link rel="icon" href="/chargers/npbattery.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="NP Gauge Chargers - Fate/Grand Order" />
                <link rel="apple-touch-icon" href="/chargers/npbattery.ico" />
                <link rel="manifest" href="/chargers/manifest.json" />
                <title>FGO NP Chargers</title>
            </Head>
            <div id="region-switch-container" className="d-flex region-switch">
                {svgFlagUS}
                <Form.Check
                    type="switch"
                    id="region-switch"
                    aria-label="region-switch"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRegion(e.target.checked ? "JP" : "NA")}
                ></Form.Check>
                {svgFlagJP}
            </div>
            <Form.Select
                aria-label="Charger tab select menu"
                onChange={(e) => selectTab(+e.target.value)}
                id="charger-select"
            >
                <option value="0">Self Charge AOE</option>
                <option value="1">Self Charge ST</option>
                <option value="2">Self Charge Support NP</option>
                <option value="3">Targeted &amp; Party Chargers</option>
                <option value="4">Notes</option>
            </Form.Select>
            <Tabs
                id="charger-tabs"
                activeKey={tabActiveKey}
                onSelect={(k) =>
                    setKey(
                        k as unknown as
                            | "self-charge-aoe"
                            | "self-charge-st"
                            | "self-charge-support"
                            | "targeted-party-chargers"
                            | "notes"
                    )
                }
            >
                <Tab title="Self Charge AOE" eventKey="self-charge-aoe">
                    <ChargerTable chargeInfos={selfChargeAOE} />
                </Tab>
                <Tab title="Self Charge ST" eventKey="self-charge-st">
                    <ChargerTable chargeInfos={selfChargeST} />
                </Tab>
                <Tab title="Self Charge Support NP" eventKey="self-charge-support">
                    <ChargerTable chargeInfos={selfChargeSupport} />
                </Tab>
                <Tab title="Targeted &amp; Party Chargers" eventKey="targeted-party-chargers">
                    <ChargerTable chargeInfos={partyCharge} />
                    <ChargerTable chargeInfos={allyCharge} />
                </Tab>
                <Tab title="Notes" eventKey="notes">
                    <Alert className="w-100 mt-1 mb-10" variant="dark">
                        <Alert.Heading>On Melusine&apos;s charges</Alert.Heading>
                        <hr />
                        <p>
                            In asc1, Melusine can charge only 30% (since the 100% battery changes her ascension to
                            asc3). If Melusine starts with asc3, her battery is locked and only the npmod skill is
                            available. If starting in asc1, Melusine can use her 100% battery and change ascensions to
                            asc3, which functionally means the 100% charge is on asc3.
                        </p>
                        <Alert.Heading>Super Aoko</Alert.Heading>
                        <hr />
                        <p>
                            Super Aoko has 100% charge. However, she doesn&apos;t have a bordered thumbnail in the game,
                            so normal Aoko&apos;s face is used instead.
                        </p>
                        <Alert.Heading>Charge-per-turn buffs and trait charges</Alert.Heading>
                        <hr />
                        <p>
                            Only on-demand battery are listed, charge-per-turn (like Cleopatra&apos;s) and conditional
                            charges (like Summer Kiara&apos;s or Kingprotea&apos;s) are not included.
                        </p>
                    </Alert>
                </Tab>
            </Tabs>
        </>
    );
};

export default App;
