import { FasilitasModule } from './fasilitas.module';

describe('FasilitasModule', () => {
  let fasilitasModule: FasilitasModule;

  beforeEach(() => {
    fasilitasModule = new FasilitasModule();
  });

  it('should create an instance', () => {
    expect(fasilitasModule).toBeTruthy();
  });
});
