import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegisterModule } from './register/register.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [
    RegisterModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'kundalineHealthData1',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
