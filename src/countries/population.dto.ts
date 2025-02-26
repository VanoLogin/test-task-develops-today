import { IsInt, IsPositive } from "class-validator";

export class PopulationDto {
  @IsInt()
  @IsPositive()
  year: number;

  @IsInt()
  @IsPositive()
  value: number;
}
