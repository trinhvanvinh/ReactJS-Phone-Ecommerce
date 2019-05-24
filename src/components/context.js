import React, {
  Component
} from 'react';
import {
  storeProducts,
  detailProduct
} from '../data';
const ProductContext = React.createContext();
// provider

//comsumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct
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

  getItem=(id)=>{
    const product =this.state.products.find(item=>item.id===id);
    return product;
  }

  handleDetail = (id) => {
    const product=this.getItem();
    this.setState(()=>{
      return {detailProduct: product}
    })
  }
  addToCart = (id) => {
    console.log("helo from cart "+id);
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
  render() {
    return ( <ProductContext.Provider value = {
        {
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
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