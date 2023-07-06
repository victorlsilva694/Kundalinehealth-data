import { Module } from '@nestjs/common';
import { ManagementProfessionalsService } from './management-professionals.service';
import { ManagementProfessionalsController } from './management-professionals.controller';
import { Professionals } from 'src/models/ProfessionalsModel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from 'src/guards/jwt.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Professionals])],
  controllers: [ManagementProfessionalsController],
  providers: [ManagementProfessionalsService, JwtGuard, JwtService]
})
export class ManagementProfessionalsModule {}
