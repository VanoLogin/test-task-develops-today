import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";
import { ConfigService } from "@nestjs/config";
import { CountryDto } from "./countries.dto";
// import getCountryISO2 from "country-iso-3-to-2";
import { whereAlpha3 } from "iso-3166-1";
@Injectable()
export class CountriesService {
  private readonly BASE_URL: string;
  private readonly POPULATION_URL: string;
  private readonly FLAG_URL: string;

  constructor(private readonly configService: ConfigService) {
    this.BASE_URL = this.configService.get<string>("BASE_URL");
    this.POPULATION_URL = this.configService.get<string>("POPULATION_URL");
    this.FLAG_URL = this.configService.get<string>("FLAG_URL");
  }

  async getAvailableCountries(): Promise<
    { countryCode: string; name: string }[]
  > {
    try {
      const response = await axios.get(`${this.BASE_URL}/AvailableCountries`);
      return response.data;
    } catch {
      throw new HttpException(
        "Failed to fetch available countries",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryDto> {
    try {
      const iso2CodeCountry = whereAlpha3(`${countryCode}`);
      const results = await Promise.allSettled([
        axios.get(`${this.BASE_URL}/CountryInfo/${countryCode}`),
        axios.post(this.POPULATION_URL, { iso3: countryCode }),
        axios.post(this.FLAG_URL, { iso2: iso2CodeCountry.alpha2 }),
      ]);
      const countryData =
        results[0].status === "fulfilled" ? results[0].value.data : null;
      const populationData =
        results[1].status === "fulfilled"
          ? results[1].value.data.data.populationCounts
          : [];
      const flagData =
        results[2].status === "fulfilled"
          ? results[2].value.data.data.flag
          : "";

      if (!countryData) {
        throw new HttpException("Country data not found", HttpStatus.NOT_FOUND);
      }

      return {
        name: countryData.commonName,
        borders: countryData.borders || [],
        population: populationData,
        flag: flagData,
      };
    } catch {
      throw new HttpException(
        "Failed to fetch country info",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
