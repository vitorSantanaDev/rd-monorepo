function calculateProductScore({ product, preferences, features }) {
  const preferenceScore = countMatches({
    list: product.preferences,
    selectedItems: preferences,
  });

  const featureScore = countMatches({
    list: product.features,
    selectedItems: features,
  });

  return {
    ...product,
    score: preferenceScore + featureScore,
  };
}

function shouldIncludeProduct({
  product,
  hasPreferences,
  hasFeatures,
  preferences,
  features,
}) {
  const matchesPreferences = hasAnyMatch({
    list: product.preferences,
    selectedItems: preferences,
  });

  const matchesFeatures = hasAnyMatch({
    list: product.features,
    selectedItems: features,
  });

  if (hasPreferences && hasFeatures) {
    return matchesPreferences && matchesFeatures;
  }

  return matchesPreferences || matchesFeatures;
}

function countMatches({ list, selectedItems }) {
  return list.filter((item) => selectedItems.includes(item)).length;
}

function hasAnyMatch({ list, selectedItems }) {
  return list.some((item) => selectedItems.includes(item));
}

function getTopProduct(products) {
  if (products.length === 0) return [];

  const highestScore = products.sort((a, b) => b.score - a.score)[0].score;

  const topProducts = products.filter(
    (product) => product.score === highestScore
  );

  return productMapper([topProducts[topProducts.length - 1]]);
}

function productMapper(products) {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    features: product.features,
    preferences: product.preferences,
    description: product.description,
  }));
}

export default {
  calculateProductScore,
  shouldIncludeProduct,
  getTopProduct,
  productMapper,
  hasAnyMatch,
  countMatches,
};
