import React from 'react';
import Checkbox from '../../shared/Checkbox';
import { RECOMMENDATION_TYPES } from '../../../constants/recommendationType';

function RecommendationType({ onRecommendationTypeChange }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value={RECOMMENDATION_TYPES.SingleProduct}
          onChange={() =>
            onRecommendationTypeChange(RECOMMENDATION_TYPES.SingleProduct)
          }
          className="mr-2"
        />
        <label htmlFor={RECOMMENDATION_TYPES.SingleProduct} className="mr-4">
          Produto Único
        </label>
        <Checkbox
          type="radio"
          name="recommendationType"
          value={RECOMMENDATION_TYPES.MultipleProducts}
          onChange={() =>
            onRecommendationTypeChange(RECOMMENDATION_TYPES.MultipleProducts)
          }
          className="mr-2"
        />
        <label htmlFor={RECOMMENDATION_TYPES.MultipleProducts}>
          Múltiplos Produtos
        </label>
      </div>
    </div>
  );
}

export default RecommendationType;
