import { Skill, Servant } from "@atlasacademy/api-connector";

interface Charge {
    value: number;
    type: string;
}

export interface Charger {
    charges: Charge[];
    id: number;
    img: string;
    name: string;
    np: string;
    region: "JP" | "CN" | "TW" | "KR" | "NA";
}

type ChargeInfoMap = Map<number, Charger[]>;

export interface ChargeInfo {
    chargeText: string;
    chargeValue: number;
    chargers: Charger[];
}

export interface CategorizedChargeInfo {
    chargers: Charger[];
    selfChargeAOE: ChargeInfo[];
    selfChargeST: ChargeInfo[];
    selfChargeSupport: ChargeInfo[];
    partyCharge: ChargeInfo[];
    allyCharge: ChargeInfo[];
}

const chargeSum = (charges: Charge[], chargeType: "self" | "ptAll" | "ptOne") => {
    return charges.reduce(
        (acc, charge) => (acc += (charge.type === "ptOther" ? "ptAll" : charge.type) === chargeType ? charge.value : 0),
        0
    );
};

const getChargeGroup = (chargeValue: number): number => {
    if (chargeValue >= 79 && chargeValue <= 80) return 79.5;
    return chargeValue;
};

const chargeGroupText = new Map([[79.5, "79~80"]]);

const mapToChargeInfo = (chargeMap: ChargeInfoMap): ChargeInfo[] => {
    return Array.from(chargeMap.entries())
        .map(([chargeValue, chargers]) => {
            return { chargeValue, chargeText: chargeGroupText.get(chargeValue) ?? chargeValue.toString(), chargers };
        })
        .sort((a, b) => a.chargeValue - b.chargeValue);
};

const getCharges = (_skills: Skill.Skill[]): Charge[] => {
    const skills = _skills.slice();
    skills.forEach((skill) => {
        skills[skill.num! - 1] = skill;
    });
    const skillFuncs = skills
        .slice(0, 3)
        .flatMap((skill) => skill.functions.filter((func) => func.funcType === "gainNp"));
    const charges = skillFuncs.map((func) => {
        let value = func && func.functvals.length === 0 ? func.svals[9].Value! / 100 : 0;
        let type = func?.funcTargetType && value ? func.funcTargetType : "";
        return { value, type };
    });

    return charges;
};

const getServants = async (region: "JP" | "CN" | "TW" | "KR" | "NA" = "JP"): Promise<Servant.Servant[]> => {
    const servants: Servant.Servant[] = await (
        await fetch(
            `https://api.atlasacademy.io/export/${region}/${
                region === "JP" ? "nice_servant_lang_en" : "nice_servant"
            }.json`
        )
    ).json();

    servants.find((serv) => serv.id === 1000900)!.noblePhantasms = []; // Kingprotea

    const superAoko = servants.find((serv) => serv.id === 2501500);

    if (superAoko !== undefined) {
        superAoko.extraAssets = {
            ...(superAoko.extraAssets ?? {}),
            faces: { ascension: { 1: "https://static.atlasacademy.io/JP/Faces/f_25014000.png" } },
        };
    }

    const melu = { ...servants.find((serv) => serv.id === 304800)! };
    const [meluNpST, meluNpAOE] = melu.noblePhantasms;
    const [meluSkill1, meluSkill2, meluBattery100, meluBattery30] = melu.skills;
    const [melu1, melu2, melu3] = [
        {
            /* In asc1, Melusine can charge only 30% (since the 100% battery changes her ascension to asc3) */
            ...melu,
            noblePhantasms: [meluNpST],
            skills: [meluSkill1, meluSkill2, meluBattery30],
        },
        {
            /* If Melusine starts with asc3, the battery is locked to her and she can only use ...skills[3] */
            ...melu,
            noblePhantasms: [meluNpAOE],
            skills: [meluSkill1, meluSkill2, meluBattery30],
            extraAssets: { ...melu.extraAssets, faces: { ascension: { 1: melu.extraAssets.faces.ascension!["3"] } } },
        },
        {
            /* If starting in asc1, Melusine can use her 100% battery and change ascensions to asc3, which functionally means the 100% charge is on asc3 */
            ...melu,
            noblePhantasms: [meluNpAOE],
            skills: [meluSkill1, meluSkill2, meluBattery100],
            extraAssets: { ...melu.extraAssets, faces: { ascension: { 1: melu.extraAssets.faces.ascension!["3"] } } },
        },
    ];

    servants.splice(servants.indexOf(servants.find((serv) => serv.id === melu.id)!), 1, melu1, melu2, melu3);

    const mash = { ...servants.find((serv) => serv.id === 800100)! };

    const [mashOG, mashOrtenaus] = [
        {
            ...mash,
            skills: [mash.skills[0], mash.skills[1], mash.skills[2]],
            extraAssets: { ...mash.extraAssets, faces: { ascension: { 1: mash.extraAssets.faces.ascension!["4"] } } },
        },
        {
            ...mash,
            extraAssets: {
                ...mash.extraAssets,
                faces: { ascension: { 1: mash.extraAssets.faces.costume!["800140"] } },
            },
        },
    ];

    servants.splice(servants.indexOf(servants.find((serv) => serv.id === mash.id)!), 1, mashOG, mashOrtenaus);

    const iori = { ...servants.find((serv) => serv.id === 106000)! };

    if ("noblePhantasms" in iori) {
        iori.noblePhantasms = iori.noblePhantasms?.filter?.((np) => np.id === 106001) ?? iori.noblePhantasms;

        servants.splice(servants.indexOf(servants.find((serv) => serv.id === iori.id)!), 1, iori);
    }

    return servants;
};

const getSelfChargers = (chargers: Charger[]) => {
    const selfChargeAOE: ChargeInfoMap = new Map();
    const selfChargeST: ChargeInfoMap = new Map();
    const selfChargeSupport: ChargeInfoMap = new Map();
    chargers
        .filter((charger) => charger.charges.some((charge) => charge.type === "self"))
        .forEach((charger) => {
            const chargeGroup = getChargeGroup(chargeSum(charger.charges, "self"));
            if (charger.np === "enemyAll") {
                const mapValue = selfChargeAOE.get(chargeGroup);
                if (mapValue !== undefined) {
                    mapValue.push(charger);
                } else {
                    selfChargeAOE.set(chargeGroup, [charger]);
                }
            } else if (charger.np === "enemy") {
                const mapValue = selfChargeST.get(chargeGroup);
                if (mapValue !== undefined) {
                    mapValue.push(charger);
                } else {
                    selfChargeST.set(chargeGroup, [charger]);
                }
            } else {
                const mapValue = selfChargeSupport.get(chargeGroup);
                if (mapValue !== undefined) {
                    mapValue.push(charger);
                } else {
                    selfChargeSupport.set(chargeGroup, [charger]);
                }
            }
        });
    return {
        selfChargeAOE: mapToChargeInfo(selfChargeAOE),
        selfChargeST: mapToChargeInfo(selfChargeST),
        selfChargeSupport: mapToChargeInfo(selfChargeSupport),
    };
};

const getSupportChargers = (chargers: Charger[]) => {
    const partyCharge: ChargeInfoMap = new Map();
    chargers
        .filter((charger) => charger.charges.some((charge) => ["ptAll", "ptOther"].includes(charge.type)))
        .forEach((charger) => {
            const chargeGroup = getChargeGroup(chargeSum(charger.charges, "ptAll"));
            const mapValue = partyCharge.get(chargeGroup);
            if (mapValue !== undefined) {
                mapValue.push(charger);
            } else {
                partyCharge.set(chargeGroup, [charger]);
            }
        });

    const allyCharge: ChargeInfoMap = new Map();
    chargers
        .filter((charger) => charger.charges.some((charge) => charge.type === "ptOne"))
        .forEach((charger) => {
            const chargeGroup = getChargeGroup(chargeSum(charger.charges, "ptOne"));
            const mapValue = allyCharge.get(chargeGroup);
            if (mapValue !== undefined) {
                mapValue.push(charger);
            } else {
                allyCharge.set(chargeGroup, [charger]);
            }
        });

    return { partyCharge: mapToChargeInfo(partyCharge), allyCharge: mapToChargeInfo(allyCharge) };
};

const getChargers: (region?: "JP" | "CN" | "TW" | "KR" | "NA") => Promise<CategorizedChargeInfo> = async (
    region: "JP" | "CN" | "TW" | "KR" | "NA" = "JP"
) => {
    const servants = await getServants(region);
    const chargers = servants.map((servant) => {
        return {
            charges: getCharges(servant.skills),
            id: servant.id,
            img: servant.extraAssets.faces.ascension?.[1]
                ? `${servant.extraAssets.faces.ascension?.[1].split(".png")[0]}_bordered.png`
                : "",
            name: `${servant.name ?? ""} (${
                servant.className ? `${servant.className[0].toUpperCase()}${servant.className.slice(1)}` : ""
            })`,
            np: servant.noblePhantasms[servant.noblePhantasms.length - 1]?.functions.some((func) =>
                func.funcType.includes("damageNp")
            )
                ? servant.noblePhantasms[servant.noblePhantasms.length - 1]?.functions.filter((func) =>
                      func.funcType.includes("damageNp")
                  )[0].funcTargetType
                : "",
            region,
        };
    });
    const { selfChargeAOE, selfChargeST, selfChargeSupport } = getSelfChargers(chargers);
    const { partyCharge, allyCharge } = getSupportChargers(chargers);
    return { chargers, selfChargeAOE, selfChargeST, selfChargeSupport, partyCharge, allyCharge };
};

export default getChargers;
