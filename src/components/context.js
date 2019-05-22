import React, { Component } from 'react';
import {storeProducts, datailProduct} from '../data';
const ProductContext= React.createContext();
// provider

//comsumer

 class ProductProvider extends Component {
   state={
     products: storeProducts,
     detailProduct: datailProduct
   }
   handleDetail = ()=>{
     console.log("helo from detail")
   }
   addToCart=()=>{
    console.log("helo from cart")
   }
  render() {
    return (
     <ProductContext.Provider value={{
       ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart
     }} >
         {this.props.children}
     </ProductContext.Provider>
    )
  }
}

const ProductConsumer= ProductContext.Consumer;
export {ProductProvider, ProductConsumer};
