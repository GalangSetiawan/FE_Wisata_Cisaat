import { WebPreferencesModule } from './web-preferences.module';

describe('WebPreferencesModule', () => {
  let webPreferencesModule: WebPreferencesModule;

  beforeEach(() => {
    webPreferencesModule = new WebPreferencesModule();
  });

  it('should create an instance', () => {
    expect(webPreferencesModule).toBeTruthy();
  });
});
