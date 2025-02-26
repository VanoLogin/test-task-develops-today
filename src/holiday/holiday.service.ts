import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class HolidayService {
  private readonly BASE_URL = "https://date.nager.at/api/v3";

  async fetchHolidays(countryCode: string, year: number) {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/PublicHolidays/${year}/${countryCode}`,
      );
      return response.data;
    } catch {
      throw new HttpException(
        "Failed to fetch holidays",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  filterHolidays(holidays: any[], filterList?: string[]) {
    if (!filterList || filterList.length === 0) {
      return holidays;
    }
    return holidays.filter((holiday) => filterList.includes(holiday.localName));
  }
}
