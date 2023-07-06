import { Test, TestingModule } from '@nestjs/testing';
import { ManagementProfessionalsService } from './management-professionals.service';

describe('ManagementProfessionalsService', () => {
  let service: ManagementProfessionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagementProfessionalsService],
    }).compile();

    service = module.get<ManagementProfessionalsService>(ManagementProfessionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
