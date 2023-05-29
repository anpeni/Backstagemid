import { plugin1Plugin } from './plugin';

describe('plugin1', () => {
  it('should export plugin', () => {
    expect(plugin1Plugin).toBeDefined();
  });
});
