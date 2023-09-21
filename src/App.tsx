import { useQuery } from "react-query";
import { useState } from "react";
import './null_styles.css';

import TextField from '@mui/material/TextField';
import loader from './assets/Eclipse-1s-200px.svg';
import close_icon from './assets/icons/delete.svg';
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

  function handleSearch(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const elem = document.querySelector('#input_field') as HTMLInputElement;
    setParamsUrl(`/search?q=${elem.value}`);
    elem.value = "";
    elem.blur();
  }

  function getQueryKeyFromSearchParams(endpoint: string) {
    if (endpoint.includes("/search?q=")) return [endpoint.slice(9)];
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
          <div id="header_wrap">
            <div id="logo">Web store</div>
            <div id="header_cont">
              <div id="cart_logo" onClick={handleOpenCartMenu}>
                <img src={cart_icon} alt="cart" />
                <div id="cart_menu_logo_counter">{total_count}</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div id="cart_cont" className={isCartActive ? "active" : "unactive"}>
          <div id="cart_wrap">
            <div id="menu_head">
              <div id="cart_menu_logo">
                <img src={cart_icon} alt="cart" />
                <div id="cart_menu_logo_counter">{total_count}</div>
              </div>
              <img id="close_menu"
                onClick={() => setIsCartActive(false)}
                src={close_icon} alt="close"
              />
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
          <section id="info_panel">
            <form onSubmit={handleSearch}>
              <TextField id="input_field" label="Search" variant="standard" />
            </form>
          </section>
          <section id="main_cont">
            <aside id="categories_cont">
              <p>Categories:</p>
              <Categorie
                name={"All"}
                paramsUrl={paramsUrl}
                setParamsUrl={() => setParamsUrl('')}
              />
              {categories?.map((categorie: string, index: number) => {
                return <Categorie
                  paramsUrl={paramsUrl}
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
                data?.products?.length === 0 ?
                  <p>Nothing was found.</p>
                  :
                  data?.products?.map((product: Product_type, index: number) => {
                    return <Product
                      cart={cart}
                      setCart={setCart}
                      product={product}
                      key={index}
                    />
                  })
              }
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
