import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  UseFilters,
} from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "./user.dto";

import { User } from "./user.entity";
import { ResponseInterceptor } from "src/interceptors/response.interceptor";
import { AllExceptionsFilter } from "src/filters/all-exceptions.filter";
import { AddHolidaysDto } from "../holiday/holidays.dto";

@UseFilters(AllExceptionsFilter)
@UseInterceptors(ResponseInterceptor)
@Controller("users")
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(":id")
  async getUserById(@Param("id") id: number): Promise<User | null> {
    return this.usersService.getUserById(id);
  }
  @Post(":userId/calendar/holidays")
  async addHolidaysToCalendar(
    @Param("userId") userId: number,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.usersService.addHolidaysToCalendar(userId, addHolidaysDto);
  }
}
