import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Alert, Col, Container, Nav, Navbar, Row, Tab, Tabs } from "react-bootstrap";

import { ChargerTable } from "../Components/Chargers";
import getChargers, { CategorizedChargeInfo } from "../getters/getChargers";

import "bootstrap/dist/css/bootstrap.min.css";

export const getStaticProps: GetStaticProps = async (context) => {
    return { props:
        { chargers: 
            {
                JP: await getChargers("JP"),
                NA: await getChargers("NA"),
            }
        }
    };
};

const App = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [region, setRegion] = useState<"JP"|"CN"|"TW"|"KR"|"NA">("JP");

    const chargersProps = props.pageProps.chargers;
    const [tabActiveKey, setKey] = useState<"self-charge-aoe"|"self-charge-st"|"self-charge-support"|"targeted-party-chargers"|"notes"|"region-NA"|"region-JP">("self-charge-aoe");

    if (chargersProps === undefined) return null;

    let { chargers, selfChargeAOE, selfChargeST, selfChargeSupport, partyCharge, allyCharge }: CategorizedChargeInfo =
        chargersProps[region];
    
    if (chargers === undefined) return null;

    const tabSelector = (selectedKey: "self-charge-aoe"|"self-charge-st"|"self-charge-support"|"targeted-party-chargers"|"notes"|"NA"|"JP") => {
        if (selectedKey === "NA" || selectedKey === "JP") {
            setRegion(selectedKey);
        } else {
            setKey(selectedKey)
        }
    };

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
            <Tabs id="charger-tabs" activeKey={tabActiveKey} onSelect={(k) => tabSelector(k as unknown as "self-charge-aoe" | "self-charge-st" | "self-charge-support" | "targeted-party-chargers" | "notes" | "NA" | "JP")}>
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
                        <Alert.Heading>Charge-per-turn buffs and trait charges</Alert.Heading>
                        <hr />
                        <p>
                            Only on-demand battery are listed, charge-per-turn (like Cleopatra&apos;s) and conditional
                            charges (like Summer Kiara&apos;s or Kingprotea&apos;s) are not included.
                        </p>
                    </Alert>
                </Tab>
                <Tab title="🇯🇵" eventKey="JP" tabClassName={(region === "JP" ? "active-region" : "")} />
                <Tab title="🇺🇸" eventKey="NA" tabClassName={(region === "NA" ? "active-region" : "")} />
            </Tabs>
        </>
    );
};

export default App;
