import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import { loadCart,cartEmpty } from './helper/cartHelper'
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';

const StripeCheckout = ({products, reload=undefined, setReload =  r => r }) => {
const [data, setData] = useState({
    loading:false,
    success:false,
    error:"",
    address:""
});
const token=isAuthenticated() && isAuthenticated().token;
const userId=isAuthenticated() && isAuthenticated().user_id;



const getFinalPrice=() =>{
   let amount =0;
   products.map(prod=>{
       amount=amount+prod.price;
   })
   return amount;

}

const makePayment=(token)=>{
    const body={
        token,products
    }
    const headers={
        "Content-Type":"application/json"
    }
    return fetch(`${API}/stripepayment`,{
    method:"POST",
    headers,
    body:JSON.stringify(body)
    }).
    then(response=>{
        console.log(response)
        //checking payment status and empty cart
        const {Status}=response;
        console.log("Status",Status);
        cartEmpty(()=>{
                console.log("did we craach some where");
        });
        setReload(!reload);
    
    })
    .catch(error=>{
        console.log(error)
    })
}

const showStripeButton=()=>{
    
    return isAuthenticated()  ? (
        getFinalPrice()>0 ?(
        <StripeCheckoutButton
        stripeKey="pk_test_51HRuBQKO6itYopLng1vBN9lgOnAOdSWrtVcdf8Oa4diI0celWTUA0oAh0Yss2vYBm37hSrBfu9I09i1oWEggpaX800MTfYIXTp"
        token={makePayment}
        amount={getFinalPrice()*100}
        name="Buy shirt"
        shippingAddress
        billingAddress
        allowRememberMe>
            <h3 className="text-success">we are ready to go.......</h3>
         <button className ="btn btn-success">pay with stripe</button>

       </StripeCheckoutButton>):(
           <h3 className="text-danger">your cart is empty now,please add product in your cart.......</h3>
       )

    ): (<Link to="/signin" 
     > <h3 className="text-danger">You are not Signin,please Signin first.......</h3>
          <button className ="btn btn-warning">SignIn</button>
     </Link>)

    /*
        return isAuthenticated()  ? (
            <StripeCheckoutButton
            stripeKey=""
            token={makePayment}
            amount={getFinalPrice()*100}
            name="Buy shirt"
            shippingAddress
            billingAddress
            allowRememberMe>
                <h3 className="text-success">we are ready to go.......</h3>
             <button className ="btn btn-success">pay with stripe</button>
    
           </StripeCheckoutButton>
        ): (<Link to="/signin" 
         > <h3 className="text-danger">You are not Signin,please Signin first.......</h3>
              <button className ="btn btn-warning">SignIn</button>
         </Link>)
 */
    }
 

    return (
        <div>
            
            <h3 className="text-white">Stripe Checkout  =  <span className="text-success"> ${getFinalPrice()}</span></h3>
           
            {showStripeButton()}
                
        </div>
    )                                                   
}

export default StripeCheckout
