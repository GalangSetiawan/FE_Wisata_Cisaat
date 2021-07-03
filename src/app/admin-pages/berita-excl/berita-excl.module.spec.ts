import { BeritaExclModule } from './berita-excl.module';

describe('BeritaExclModule', () => {
  let beritaExclModule: BeritaExclModule;

  beforeEach(() => {
    beritaExclModule = new BeritaExclModule();
  });

  it('should create an instance', () => {
    expect(beritaExclModule).toBeTruthy();
  });
});
