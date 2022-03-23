import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { Alert, Tab, Tabs } from "react-bootstrap";

import { ChargerTable } from "../Components/Chargers";
import getChargers, { CategorizedChargeInfo } from "../getters/getChargers";

import "bootstrap/dist/css/bootstrap.min.css";

export const getStaticProps: GetStaticProps = async (context) => {
    return { props: await getChargers() };
};

const App = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { chargers, selfChargeAOE, selfChargeST, selfChargeSupport, partyCharge, allyCharge }: CategorizedChargeInfo =
        props.pageProps;
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
            <Tabs id="charger-tabs">
                <Tab title="Self Charge AOE" eventKey="self-charge-aoe">
                    <ChargerTable chargeInfos={selfChargeAOE} />
                    <Alert className="w-100 mt-1 mb-10" variant="dark">
                        <Alert.Heading>On Melusine&apos;s charges</Alert.Heading>
                        <hr />
                        <p>
                            In asc1, Melusine can charge only 30% (since the 100% battery changes her ascension to
                            asc3). If Melusine starts with asc3, her battery is locked and only the npmod skill is
                            available. If starting in asc1, Melusine can use her 100% battery and change ascensions to
                            asc3, which functionally means the 100% charge is on asc3.
                        </p>
                    </Alert>
                </Tab>
                <Tab title="Self Charge ST" eventKey="self-charge-st">
                    <ChargerTable chargeInfos={selfChargeST} />
                    <Alert className="w-100 mt-1 mb-10" variant="dark">
                        <Alert.Heading>On Melusine&apos;s charges</Alert.Heading>
                        <hr />
                        <p>
                            In asc1, Melusine can charge only 30% (since the 100% battery changes her ascension to
                            asc3). If Melusine starts with asc3, her battery is locked and only the npmod skill is
                            available. If starting in asc1, Melusine can use her 100% battery and change ascensions to
                            asc3, which functionally means the 100% charge is on asc3.
                        </p>
                    </Alert>
                </Tab>
                <Tab title="Self Charge Support NP" eventKey="self-charge-support">
                    <ChargerTable chargeInfos={selfChargeSupport} />
                </Tab>
                <Tab title="Targeted &amp; Party Chargers" eventKey="targeted-party-chargers">
                    <ChargerTable chargeInfos={partyCharge} />
                    <ChargerTable chargeInfos={allyCharge} />
                </Tab>
            </Tabs>
        </>
    );
};

export default App;
