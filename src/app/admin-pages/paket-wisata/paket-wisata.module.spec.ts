import { PaketWisataModule } from './paket-wisata.module';

describe('PaketWisataModule', () => {
  let paketWisataModule: PaketWisataModule;

  beforeEach(() => {
    paketWisataModule = new PaketWisataModule();
  });

  it('should create an instance', () => {
    expect(paketWisataModule).toBeTruthy();
  });
});
