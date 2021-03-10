import React, { useState,useEffect} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";


const Cart=()=> {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false)
  useEffect(() => {
     
      setProducts(loadCart())
  }, [reload])
    const loadAllProducts=()=>{
        return (<div>
            <h2>This section loads product</h2>
            {products.map((product,index)=>{
                return(
                    <Card
                    key={index}
                    product={product}
                    addtoCart={false}
                    removeFromCart={true}
                    setReload={setReload}
                    reload={reload}
                    />
                );
            })}
        </div>
        );
    }

    const loadCheckout=()=>{
        return (<div>
            <h2>This section product checkout</h2>
        </div>
        );
    }

  return (
    <Base title="Cart Page" description="Welcome to the Cart Page">
      <div className="row text-center">
        <div className="row">
        <div className="col-5">  {loadAllProducts()}</div >
       
        <div className="col-6">
           <StripeCheckout
          products={products}
          setReload={setReload}
        />
         </div >
        </div>
      </div>
    </Base>
  );
}
export default Cart;