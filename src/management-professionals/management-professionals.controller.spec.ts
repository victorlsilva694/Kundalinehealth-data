import { Test, TestingModule } from '@nestjs/testing';
import { ManagementProfessionalsController } from './management-professionals.controller';
import { ManagementProfessionalsService } from './management-professionals.service';

describe('ManagementProfessionalsController', () => {
  let controller: ManagementProfessionalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagementProfessionalsController],
      providers: [ManagementProfessionalsService],
    }).compile();

    controller = module.get<ManagementProfessionalsController>(ManagementProfessionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
