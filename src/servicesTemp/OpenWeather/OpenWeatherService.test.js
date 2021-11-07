import OpenWeatherService from "./OpenWeatherService.js";
import { dublin } from "./mockWeather.js";

test("testing getWeatherByCoordinates", async () => {

    let openWeatherService = new OpenWeatherService();
    let weather;

    weather = await openWeatherService.getWeatherByCoordinates({lat: 53.34912956, lon: -6.23038262});
    expect(weather).toHaveProperty("main");
    expect(weather.main).toHaveProperty("temp");

    weather = await openWeatherService.getWeatherByCoordinates({lat: "53.34912956", lon: "-6.23038262"});
    expect(weather).toHaveProperty("main");
    expect(weather.main).toHaveProperty("temp");

    weather = await openWeatherService.getWeatherByCoordinates({});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates(undefined);
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates(null);
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: 53.34912956});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: undefined, lon: undefined});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: null, lon: null});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: null, lon: undefined});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: undefined, lon: null});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: 5467546725463463475, lon: 444355555555555552323232323232323232323});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: "fdhjhfg", lon: "dhdf"});
    expect(weather).toBeInstanceOf(Error);

    weather = await openWeatherService.getWeatherByCoordinates({lat: {}, lon: {}});
    expect(weather).toBeInstanceOf(Error);
});

test("testing handleGetWeather", () => {

    let openWeatherService = new OpenWeatherService();
    let weather;

    weather = openWeatherService.handleGetWeather({status: true, weather: dublin});
    expect(weather).toHaveProperty("main");
    expect(weather.main).toHaveProperty("temp");

    weather = openWeatherService.handleGetWeather({status: false, weather: dublin});
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather(undefined);
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather(null);
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather({});
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather({status: undefined, weather: undefined});
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather({status: null, weather: null});
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather({status: true, weather: undefined});
    expect(weather).toBeInstanceOf(Error);

    weather = openWeatherService.handleGetWeather({status: {}, weather: {}});
    expect(weather).toBeInstanceOf(Error);
    


});