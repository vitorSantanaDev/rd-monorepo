import productUtil from './product.util';

describe('calculateProductScore', () => {
  it('should calculate the correct score for a product', () => {
    const product = { preferences: ['A', 'B'], features: ['X'] };
    const preferences = ['A', 'C'];
    const features = ['X', 'Z'];

    const result = productUtil.calculateProductScore({
      product,
      preferences,
      features,
    });
    expect(result.score).toBe(2);
  });
});

describe('shouldIncludeProduct', () => {
  it('should include a product matching both preferences and features', () => {
    const product = { preferences: ['A'], features: ['X'] };
    const preferences = ['A'];
    const features = ['X'];

    const result = productUtil.shouldIncludeProduct({
      product,
      hasFeatures: true,
      hasPreferences: true,
      preferences,
      features,
    });
    expect(result).toBe(true);
  });

  it('should exclude a product if no matches are found', () => {
    const product = { preferences: ['B'], features: ['Y'] };
    const preferences = ['A'];
    const features = ['X'];

    const result = productUtil.shouldIncludeProduct({
      product,
      hasPreferences: true,
      hasFeatures: true,
      preferences,
      features,
    });
    expect(result).toBe(false);
  });
});

describe('getTopProduct', () => {
  it('should return the product with the highest score', () => {
    const products = [
      {
        id: 1,
        score: 2,
        description: 'teste 1',
        name: 'teste 1',
        preferences: [],
        features: [],
      },
      {
        id: 2,
        score: 5,
        description: 'teste 2',
        name: 'teste 2',
        preferences: [],
        features: [],
      },
      {
        id: 3,
        score: 5,
        description: 'teste 3',
        name: 'teste 3',
        preferences: [],
        features: [],
      },
    ];

    const result = productUtil.getTopProduct(products);
    expect(result).toEqual([
      {
        id: 3,
        description: 'teste 3',
        name: 'teste 3',
        preferences: [],
        features: [],
      },
    ]);
  });

  it('should return an empty array if no products are available', () => {
    const result = productUtil.getTopProduct([]);
    expect(result).toEqual([]);
  });
});

describe('countMatches', () => {
  it('should count the number of matches between two arrays', () => {
    const list = ['A', 'B', 'C'];
    const selectedItems = ['A', 'C', 'D'];

    const result = productUtil.countMatches({ list, selectedItems });
    expect(result).toBe(2);
  });

  it('should return 0 if no matches are found', () => {
    const list = ['A', 'B', 'C'];
    const selectedItems = ['D', 'E', 'F'];

    const result = productUtil.countMatches({ list, selectedItems });
    expect(result).toBe(0);
  });
});

describe('hasAnyMatch', () => {
  it('should return true if there is at least one match between two arrays', () => {
    const list = ['A', 'B', 'C'];
    const selectedItems = ['B', 'D'];

    const result = productUtil.hasAnyMatch({ list, selectedItems });
    expect(result).toBe(true);
  });

  it('should return false if there are no matches', () => {
    const list = ['A', 'B', 'C'];
    const selectedItems = ['D', 'E'];

    const result = productUtil.hasAnyMatch({ list, selectedItems });
    expect(result).toBe(false);
  });
});
