import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import "dotenv/config";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  const logger = new Logger("Bootstrap");
  logger.log(`Application is running on: http://localhost:${process.env.PORT}`);
}
bootstrap();
