import React from "react";
import { Table } from "react-bootstrap";

import { ChargeInfo, Charger } from "../getters/getChargers";

const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>, charger: Charger) => {
    charger.img = charger.img.replace(/(?<=static\.atlasacademy\.io\/)..(?=\/)/, "JP");
    (e.target as HTMLImageElement).src = charger.img;
};

export const ChargerTable = ({ chargeInfos }: { chargeInfos?: ChargeInfo[] }) => {
    if (chargeInfos === undefined) return null;

    return (
        <Table striped bordered hover variant="dark">
            <tbody>
                {chargeInfos.map(({ chargeValue, chargeText, chargers }) => (
                    <tr key={chargeValue} className="border border-white">
                        <td className="text-center">
                            <b className="h1">{chargeText}</b>
                        </td>
                        <td className="p-0">
                            {chargers.map((charger) => (
                                <a
                                    key={charger.id}
                                    href={`https://apps.atlasacademy.io/db/${charger.region}/servant/${charger.id}`}
                                >
                                    <img
                                        src={charger.img}
                                        alt={charger.name}
                                        title={charger.name}
                                        width={142}
                                        height={155}
                                        onError={(e) => handleError(e, charger)}
                                    />
                                </a>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
