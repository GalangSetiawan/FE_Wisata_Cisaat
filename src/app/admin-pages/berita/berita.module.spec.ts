import { BeritaModule } from './berita.module';

describe('BeritaModule', () => {
  let beritaModule: BeritaModule;

  beforeEach(() => {
    beritaModule = new BeritaModule();
  });

  it('should create an instance', () => {
    expect(beritaModule).toBeTruthy();
  });
});
