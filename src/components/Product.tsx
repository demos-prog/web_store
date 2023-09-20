import React from "react"
import { Product_type } from '../App'
import './Product.css'

type Tproduct = {
  product: Product_type,
  cart: Product_type[],
  setCart: (cart: any) => void,
}

const Product: React.FC<Tproduct> = ({ product, setCart, cart }: Tproduct) => {
  const isSelected: boolean = cart.some((p: Product_type) => p.title === product.title);

  function handleAddToCart() {
    if (!isSelected) {
      setCart((prev: Product_type[]) => [...prev, { ...product, count: 1 }])
    }
  }

  return (
    <div className="product_item">
      <h3>{product.brand}</h3>
      <p>{product.title}</p>
      {isSelected ?
        <div className="selected">Added</div>
        :
        <button onClick={handleAddToCart} className='add_btn'>Add to cart</button>}
      <img src={product.thumbnail} alt={product.title} />
      <p>{product.price} $</p>
      <p>{product.description}</p>
    </div>
  );
};

export default Product;