import { INestApplication, ValidationPipe, VersioningType } from "@nestjs/common";
import { AppModule } from "./app.module";
import { EnviromentService } from "@common/enviroment";
import { LoggerService } from "@common/logger";
import { NestFactory, Reflector } from "@nestjs/core";
import { JwtGuard, JwtService } from "@common/jwt";
import { ErrorFilterFilter } from "@infrastructure/filters";
import { ResponseInterceptor } from "@infrastructure/interceptors";

export class Application {
  private server: INestApplication<AppModule>;
  private enviromentService: EnviromentService;
  private loggerService: LoggerService;
  private readonly prefix: string = "api";

  async startup(): Promise<void> {
    await this.setupApplication();
    await this.setGlobalScopes();

    const port = this.enviromentService.get("APP_PORT") || 3000;

    await this.server.listen(port).catch((error) => {
      this.loggerService.error(`Failed to start server on port ${port} - ${error.message}`);
      process.exit(1);
    });

    this.loggerService.log(`Server is running on port ${port}`);
  }

  async setupApplication(): Promise<void> {
    this.server = await NestFactory.create(AppModule);
    this.enviromentService = this.server.get(EnviromentService);
    this.loggerService = this.server.get(LoggerService);

    this.loggerService.context = Application.name;
  }

  async setGlobalScopes(): Promise<void> {
    this.server.setGlobalPrefix(this.prefix);

    this.server.enableCors({
      origin: this.enviromentService.get("CORS_ORIGIN"),
      credentials: true,
    });

    this.server.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    });

    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        disableErrorMessages: this.enviromentService.get("NODE_ENV") === "production",
      })
    );

    this.server.useLogger(this.loggerService);

    const jwtService = this.server.get(JwtService);
    const reflector = this.server.get(Reflector);

    this.server.useGlobalGuards(new JwtGuard(jwtService, this.enviromentService, reflector));
    
    this.server.useGlobalFilters(new ErrorFilterFilter());
    this.server.useGlobalInterceptors(new ResponseInterceptor());
  }
}