import { SejarahModule } from './sejarah.module';

describe('SejarahModule', () => {
  let sejarahModule: SejarahModule;

  beforeEach(() => {
    sejarahModule = new SejarahModule();
  });

  it('should create an instance', () => {
    expect(sejarahModule).toBeTruthy();
  });
});
