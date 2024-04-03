// ProductCard.js

import { useState } from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

const InfoContainer = styled.div`
  padding: 20px;
`;

const ProductName = styled.h2`
  margin-top: 0;
`;

const ProductDescription = styled.p`
  color: #666;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const AddToCartButton = styled.button`
  background-color: #ff3e3e;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d62c2c;
  }
`;

const ProductCard = ({ product , addToCart}:any) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e:any) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <CardContainer>
      <ProductImage src={product.image} alt={product.name} />
      <InfoContainer>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <div className="quantity">
          Quantidade: <QuantityInput type="number" min="1" value={quantity} onChange={handleQuantityChange} />
        </div>
        <div className="add-to-cart">
          <AddToCartButton onClick={addToCart(product)}>Adicionar ao Carrinho</AddToCartButton>
        </div>
      </InfoContainer> 
    </CardContainer>
  );
};

export default ProductCard;
