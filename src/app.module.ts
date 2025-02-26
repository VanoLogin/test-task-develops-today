import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { HolidayModule } from "./holiday/holiday.module";
import { CountriesModule } from "./countries/countries.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
      logging: true,
    }),
    UserModule,
    HolidayModule,
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
