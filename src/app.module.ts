import { Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import validationSchema from 'config/index.config';
import { MailModule } from './lib/vendor/mail/mail.module';
import { DiskModule } from './lib/vendor/disk/disk.module';
import appConfig from 'config/registers/app.config';
import mailConfig from 'config/registers/mail.config';
import filesystemsConfig from 'config/registers/filesystems.config';
import { ResizeImagesModule } from './lib/vendor/resize-images/resize-images.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'config/filesystem/multer.service';
import { DatabaseModule } from './modules/database/database.module';
import { TodosModule } from './modules/todos/todos.module';
import { BasicModule } from './lib/examples/basic.module';
import { MainModule } from './lib/main/main.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './lib/vendor/logger/logger.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import jwtConfig from 'config/registers/jwt.config';
import appleConfig from 'config/registers/apple.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, mailConfig, filesystemsConfig, jwtConfig, appleConfig],
      validationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
      exclude: ['/*'],
    }),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    DiskModule,
    ResizeImagesModule,
    MailModule,
    MainModule,
    BasicModule,
    DatabaseModule,
    TodosModule,
    UsersModule,
    AuthModule,
    LoggerModule,
    CatalogModule,
  ],
})
export class AppModule {
  static appName: string;

  static appPort: number | string;

  static appUrl: string;

  constructor(
    @Inject(appConfig.KEY)
    private readonly bsConfig: ConfigType<typeof appConfig>,
  ) {
    AppModule.appName = this.bsConfig.appName;
    AppModule.appPort = this.bsConfig.appPort;
    AppModule.appUrl = this.bsConfig.appUrl;
  }
}
