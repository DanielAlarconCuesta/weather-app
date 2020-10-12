import { isNull, getFormattedTime, padLeftZeroes } from './utils.js';

test("getFormatedTime", () => {

    let formattedTime;

    formattedTime = getFormattedTime({timestamp: 1602482909, timezone: 7200});
    expect(formattedTime).toBe("08:08");

    formattedTime = getFormattedTime({timestamp: 1602523622, timezone: 7200});
    expect(formattedTime).toBe("19:27");

    formattedTime = getFormattedTime({timestamp: 1602547379, timezone: -18000});
    expect(formattedTime).toBe("19:02");

    formattedTime = getFormattedTime({timestamp: 1602547379});
    expect(formattedTime).toBe("00:02 UTC±00:00");

    formattedTime = getFormattedTime({timestamp: 1602547379, timezone: null});
    expect(formattedTime).toBe("00:02 UTC±00:00");

    formattedTime = getFormattedTime({timestamp: 1602547379, timezone: {}});
    expect(formattedTime).toBe("00:02 UTC±00:00");

    formattedTime = getFormattedTime({});
    expect(formattedTime).toBeInstanceOf(Error);

    formattedTime = getFormattedTime(undefined);
    expect(formattedTime).toBeInstanceOf(Error);

    formattedTime = getFormattedTime(null);
    expect(formattedTime).toBeInstanceOf(Error);

    formattedTime = getFormattedTime({timestamp: undefined, timezone: undefined});
    expect(formattedTime).toBeInstanceOf(Error);

    formattedTime = getFormattedTime({timestamp: null, timezone: null});
    expect(formattedTime).toBeInstanceOf(Error);
    
});

test("testing padLeftZeroes", () => {

    let number;

    number = padLeftZeroes({number: 4, length: 2});
    expect(number).toBe("04");

    number = padLeftZeroes({number: 8, length: 5});
    expect(number).toBe("00008");

    number = padLeftZeroes({number: 4, length: undefined});
    expect(number).toBe("04");

    number = padLeftZeroes({number: 4, length: null});
    expect(number).toBe("04");

    number = padLeftZeroes({number: undefined});
    expect(number).toBeInstanceOf(Error);

    number = padLeftZeroes({number: null});
    expect(number).toBeInstanceOf(Error);

    number = padLeftZeroes(undefined);
    expect(number).toBeInstanceOf(Error);

    number = padLeftZeroes(null);
    expect(number).toBeInstanceOf(Error);

});