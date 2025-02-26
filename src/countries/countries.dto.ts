import { IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { PopulationDto } from "./population.dto";

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  borders: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PopulationDto)
  population: PopulationDto[];

  @IsString()
  flag: string;
}
