import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./user.dto";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { AddHolidaysDto } from "../holiday/holidays.dto";
import { HolidayService } from "../holiday/holiday.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly holidaysService: HolidayService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async addHolidaysToCalendar(userId: number, addHolidaysDto: AddHolidaysDto) {
    const { countryCode, year, holidays } = addHolidaysDto;
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const allHolidays = await this.holidaysService.fetchHolidays(
      countryCode,
      year,
    );
    const selectedHolidays = this.holidaysService.filterHolidays(
      allHolidays,
      holidays,
    );
    user.holidays = selectedHolidays;

    await this.usersRepository.save(user);

    return {
      message: "Holidays added to calendar successfully",
      userId,
      holidays: selectedHolidays,
    };
  }
}
