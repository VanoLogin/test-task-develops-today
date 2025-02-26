import { Controller, Get, Param } from "@nestjs/common";
import { CountriesService } from "./countries.service";
import { CountryDto } from "./countries.dto";

@Controller("countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async getAvailableCountries(): Promise<
    { countryCode: string; name: string }[]
  > {
    return this.countriesService.getAvailableCountries();
  }

  @Get(":countryCode")
  async getCountryInfo(
    @Param("countryCode") countryCode: string,
  ): Promise<CountryDto> {
    return this.countriesService.getCountryInfo(countryCode);
  }
}
