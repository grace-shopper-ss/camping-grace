import React, { useEffect, useState } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";

const LocalCart = () => {
  let [localCart, setLocalCart] = useState([]);
  let storedCart = localStorage.getItem("storedCart");
  const handleAddItem = (item) => {
    console.log('adding item')
    setLocalCart(item)
  }
  const addItem = (item) => {
    let copiedLocalCart = localCart.splice(0);
    // let { Id } = item;
    // let existingItem = copiedLocalCart.find(cartItem => cartItem.Id === Id);
    // if (existingItem) {
    //   existingItem.quantity += item.quantity
    // } else {
    //   copiedLocalCart.push(item)
    // }
    copiedLocalCart.push(item);

    handleAddItem(item);

    let stringCart = JSON.stringify(copiedLocalCart);
    localStorage.setItem("storedCart", stringCart);
  }
  

  // const calcTotal = () => {
  //   // const { total } = this.state;
  //   const { cart, products } = props;
  //   const { loadHeroText } = props;
  //   // const storedCart = useSelector((state) => state.storedCart) || [];
  //   // const localProducts = useSelector((state) => state.localProducts) || [];

  //   const productCount = cart.reduce((acc, val) => {
  //     acc[val.productId] = acc[val.productId] || 0;
  //     acc[val.productId]++;
  //     return acc;
  //   }, {});

  //   let cost = 0;

  //   Object.keys(productCount).map((id) => {
  //     const product = products.find((product) => product.id === parseInt(id));
  //     const quantity = productCount[id];
  //     cost = cost + product.price * quantity;
  //   });
    
  //   setTotal(total + cost);
  // }
  // useEffect( () => {
  //   storedCart = JSON.parse(storedCart);
  //   if (storedCart) setLocalCart(storedCart);
  // },[]);

  // useEffect( () => {
  //   calcTotal();
  // })

  let cap = [{
    Id: 1,
    name: 'Ball Cap'
  }]
  return(
    <div>
      <h1>Local Cart</h1>
      {
        (!!storedCart) ? 
          <p>{storedCart}</p>
            :
            <div>Empty Cart</div>
      }
      Add to cart:<br />
      <a href="#" onClick={() => addItem(cap)}>Add Ball Cap</a>
    </div>
  )

}

export default LocalCart;
