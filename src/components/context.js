import React, { Component} from 'react';
import {storeProducts,detailProduct} from '../data';
const ProductContext = React.createContext();
// provider
//comsumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart:storeProducts,
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0
  }
  componentDidMount(){
    this.setProducts();
  }
  setProducts=()=>{
    let tempProducts=[];
    storeProducts.forEach(item=>{
      const singleItem={
        ...item
      }
      tempProducts=[...tempProducts,singleItem];

    });
    this.setState(()=>{
      return {products: tempProducts}
    })
  }

  getItem=id=>{
    const product =this.state.products.find(item=>item.id===id);
    return product;
  }

  handleDetail = id=> {
    const product=this.getItem(id);
    this.setState(()=>{
      return {detailProduct: product}
    })
  }
  addToCart = id => {
    let tempProducts=[...this.state.products];
    const index=tempProducts.indexOf(this.getItem(id));
    const product=tempProducts[index];
    product.inCart=true;
    product.count=1;
    const price=product.price;
    product.total=price;
    this.setState(()=>{
      return {products: tempProducts,
        cart:[...this.state.cart,
          product
        ]
      };
    },()=>{
        this.addTotals();
    });

  }
  tester=()=>{
    console.log("state product "+this.state.products[0].inCart);
    console.log("data product "+storeProducts[0].inCart);

    const tempProducts=[...this.state.products];
    tempProducts[0].inCart=true;
    this.setState(()=>{
      return {products: tempProducts}
    },()=>{
      console.log("state product "+this.state.products[0].inCart);
      console.log("data product "+storeProducts[0].inCart);
    })
  }

  openModal=id=>{
    const product=this.getItem(id);
    this.setState(()=>{
      return{modalProduct: product, modalOpen:true }
    })
  }

  closeModal= () =>{
    this.setState(()=>{
      return {modalOpen:false}
    })
  }

  increment=(id)=>{
    console.log("this is increatement");
  }

  decrement=(id)=>{
    console.log("this is decrement");
  }

  removeItem=(id)=>{
    console.log('item remove '+id);
  }

  clearCart=()=>{
    this.setState(()=>{
      return {
        cart:[]
      }
    },()=>{

    });
  }

  addTotals=()=>{
    let subToTal=0;
    this.state.cart.map(item=>(subToTal +=item.total ));
    const tempTax=subToTal*0.1;
    const tax=parseFloat(tempTax.toFixed(2));
    const total=subToTal+tax;
    this.setState(()=>{
      return {
        cartSubTotal:subToTal,
        cartTax: tax,
        cartTotal: total
      }
    })
  }

  render() {
    return ( <ProductContext.Provider 
      value = {
        {
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal:this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }
      } > 
      
      {
        this.props.children
      } </ProductContext.Provider>)
    }
  }

  const ProductConsumer = ProductContext.Consumer;
  export {
    ProductProvider,
    ProductConsumer
  };