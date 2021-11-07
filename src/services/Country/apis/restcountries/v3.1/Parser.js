import Country from '../../../Country';

export function restCountryToCountry(restCountry) {

    if (!restCountry) {
        console.log("country info could not be parsed");
        return new Country();
    }

    let name = "",
        nativeName = "",
        alpha2Code = restCountry.cca2 ? restCountry.cca2 : "",
        alpha3Code = restCountry.cca3 ? restCountry.cca3 : "", 
        flag = "",
        iconFlag = restCountry.flags.svg;
    
    if (restCountry.name) {
        if (restCountry.name.common) name = restCountry.name.common;
        else if (restCountry.name.official) name = restCountry.name.official;
    }

    if (restCountry.name && restCountry.name.nativeName) {
        let key = Object.keys(restCountry.name.nativeName)[0];

        if (key) {
            let common = restCountry.name.nativeName[key].common;
            let official = restCountry.name.nativeName[key].official;
            if (common) nativeName = common;
            else if (official) nativeName = official;
        }
    }

    if (restCountry.flags) {
        if (restCountry.flags.png) flag = restCountry.flags.png;
        else if (restCountry.flags.svg) iconFlag = restCountry.flags.svg;
    }

    return new Country({
        name,
        nativeName,
        alpha2Code,
        alpha3Code, 
        flag,
        iconFlag
    });
}

const Parser = {
    restCountryToCountry
}

export default Parser;
