import React from 'react';
import { Product_type } from '../App';
import delete_icon from '../assets/icons/delete.svg';
import './Cart_item.css';

type Cart_itemProps = {
  product: Product_type,
  setCart: (cart: any) => void,
};

const Cart_item: React.FC<Cart_itemProps> = ({ product, setCart }: Cart_itemProps) => {

  function handleDelete() {
    setCart((cart: Product_type[]) => {
      return cart.filter((prod: Product_type) => prod.title != product.title);
    })
  }

  function handleAdd() {
    setCart((cart: Product_type[]) => {
      return cart.map((prod: Product_type) => {
        if (product.title === prod.title) {
          return { ...prod, count: prod.count + 1 };
        }
        return prod;
      })
    })
  }

  function handleReduce() {
    setCart((cart: Product_type[]) => {
      return cart.map((prod: Product_type) => {
        if (product.title === prod.title && prod.count > 0) {
          return { ...prod, count: prod.count - 1 };
        }
        return prod;
      })
    })
  }

  return (
    <div className='cart_item'>
      <img src={product.thumbnail} alt={product.title} />
      {product.title}
      <div className='cart_counter'>
        <div className='price_delete'>
          <p>{product.price} $</p>
          <div className='delete_wrap'>
            <img onClick={handleDelete} src={delete_icon} alt="delete" />
          </div>
        </div>
        <div className='buttons_wrap'>
          <button onClick={handleReduce} className={product.count === 0 ? 'disabled' : ""}>-</button>
          {product.count}
          <button onClick={handleAdd}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Cart_item;