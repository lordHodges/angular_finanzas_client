import { TestBed } from '@angular/core/testing';

import { FileServerService } from './file-server.service';

describe('FileServerService', () => {
  let service: FileServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
