import { IsString, IsInt, IsArray, IsOptional } from "class-validator";

export class AddHolidaysDto {
  @IsString()
  countryCode: string;

  @IsInt()
  year: number;

  @IsArray()
  @IsOptional()
  holidays?: string[];
}
