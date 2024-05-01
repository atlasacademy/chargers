import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { Alert, Form, Tab, Tabs } from "react-bootstrap";

import { ChargerTable } from "../Components/Chargers";
import { SvgFlags, SvgFlagsContext } from "../Components/SvgFlags";
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
            <div id="region-flags-container" className="region-flags-container">
                <SvgFlagsContext.Provider value={region}>
                    <SvgFlags regionSetter={setRegion}></SvgFlags>
                </SvgFlagsContext.Provider>
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
