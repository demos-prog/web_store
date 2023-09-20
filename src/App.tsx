import { useQuery } from "react-query";
import { useState } from "react";
import './null_styles.css';

import loader from './assets/Eclipse-1s-200px.svg';
import Categorie from "./components/Categorie";
import Product from "./components/Product";
import Cart_item from "./components/Cart_item";
import cart_icon from './assets/icons/shopping-cart.svg'

import './App.css';

export type Product_type = {
  brand: string,
  description: string,
  price: number,
  title: string,
  thumbnail: string,
  count: number
}

function App() {
  const [paramsUrl, setParamsUrl] = useState<string>('/categories');
  const [categories, setCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<Product_type[]>([]);
  const [isCartActive, setIsCartActive] = useState<boolean>(false);

  const { isLoading, isError, data } = useQuery(getQueryKeyFromSearchParams(paramsUrl), async () => {
    const response = await fetch(`https://dummyjson.com/products${paramsUrl}`);
    const newData = await response.json();
    if (categories.length === 0) {
      setCategories(newData);
      setTimeout(() => {
        setParamsUrl('');
      }, 0)
    }
    return newData;
  });

  function handleOpenCartMenu() {
    setIsCartActive(prev => !prev);
  }

  function handleOrder() {
    alert(`You've ordered ${total_count} item(s) for total cost ${total_cost} $ !`)
  }

  function handleClear() {
    setCart([]);
  }

  function getQueryKeyFromSearchParams(endpoint: string) {
    const parts = endpoint.split('?');
    const resultKey: string[] = [];
    const paths = parts[0].split('/');
    paths.forEach(path => {
      if (path != '') resultKey.push(path);
    });
    if (parts[1]) {
      const params = parts[1].split("&");
      params.forEach(param => {
        resultKey.push(param.split("=")[0])
      })
    }
    return resultKey;
  }

  if (isError) return <div>Error</div>;

  const total_count = cart.reduce((summ, product) => summ + product.count, 0);
  const total_cost = cart.reduce((summ, product) => summ + product.price * product.count, 0);

  return (
    <>
      <div id="background" className={isCartActive ? "" : "unactiveBg"} onClick={handleOpenCartMenu} />
      <header>
        <div className="container">
          <div id="header_cont">
            <div id="cart_logo" onClick={handleOpenCartMenu}>
              <img src={cart_icon} alt="cart" />
              <div id="cart_menu_logo_counter">{total_count}</div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div id="cart_cont" className={isCartActive ? "active" : "unactive"}>
          <div id="cart_wrap">
            <div id="cart_menu_logo">
              <img src={cart_icon} alt="cart" />
              <div id="cart_menu_logo_counter">{total_count}</div>
            </div>
            {cart.length < 1 ? <p>Pleas chose something :)</p>
              :
              <>
                <p>Total cost: <b>{total_cost}</b> $</p>
                {cart.map((product, index) => {
                  return (
                    <Cart_item
                      setCart={setCart}
                      product={product}
                      key={index}
                    />
                  )
                })}
                <div id="order_btns">
                  <button id="order" onClick={handleOrder}>Make an order</button>
                  <button id="clear" onClick={handleClear}>Clear the cart</button>
                </div>
              </>
            }


          </div>
        </div>
        <div className="container">
          <section id="main_cont">
            <aside id="categories_cont">
              <Categorie
                name={"All"}
                setParamsUrl={() => setParamsUrl('')}
              />
              {categories?.map((categorie: string, index: number) => {
                return <Categorie
                  name={categorie}
                  setParamsUrl={setParamsUrl}
                  key={index}
                />
              })}
            </aside>
            <div id="content_wrap">
              {isLoading ?
                <div id="loader">
                  <img src={loader} alt="Loading..." />
                </div>
                :
                data?.products?.map((product: Product_type, index: number) => {
                  return <Product
                    cart={cart}
                    setCart={setCart}
                    product={product}
                    key={index}
                  />
                })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;