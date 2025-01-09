// getRecommendations.js
import { RECOMMENDATION_TYPES } from '../constants/recommendationType';
import productUtil from '../components/utils/product.util';

const getRecommendations = (
  formData = {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: undefined,
  },
  products
) => {
  /**
   * Crie aqui a lógica para retornar os produtos recomendados.
   */
  const preferences = formData.selectedPreferences || [];
  const features = formData.selectedFeatures || [];
  const selectedRecommendationType = formData.selectedRecommendationType;

  const hasPreferences = preferences.length > 0;
  const hasFeatures = features.length > 0;

  const filteredProducts = products
    .map((product) =>
      productUtil.calculateProductScore({ product, preferences, features })
    )
    .filter((product) =>
      productUtil.shouldIncludeProduct({
        product,
        hasPreferences,
        hasFeatures,
        preferences,
        features,
      })
    )
    .sort((a, b) => b.score - a.score);

  const result =
    selectedRecommendationType === RECOMMENDATION_TYPES.SingleProduct
      ? productUtil.getTopProduct(filteredProducts)
      : productUtil.productMapper(filteredProducts);

  return result;
};

export default { getRecommendations };
