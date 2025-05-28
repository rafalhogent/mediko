import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { dataSourceOptions } from 'db/config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { LogbookModule } from './modules/logbook/logbook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    LogbookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
