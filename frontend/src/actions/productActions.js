import productService from '../services/productService.js'


export function loadProduct(userId) {
    return async dispatch => {
      try {
        const user = await productService.get(userId);
        dispatch(setProduct(user));
      } catch (err) {
        console.log('ProductActions: err in loadProduct', err);
      }
    };
  }
  // export function loadProducts(cityId) {
  //   return async dispatch => {
  //     try {
  //       const users = await productService.query(cityId);
  //       const products = users;
  //       // const products = _makeProductFromUsers(users);
  //       dispatch(setProducts(products));
  //     } catch (err) {
  //       console.log('ProductActions: err in loadProducts', err);
  //     }
  //   };
  // }
  export function loadProducts(filterBy) {
    return async dispatch => {
      try {
        const users = await productService.query(filterBy);
        const products = users;
        dispatch(setProducts(products));
      } catch (err) {
        console.log('ProductActions: err in loadProducts', err);
      }
    };
  }
  // export function loadAllProducts() {
  //   return async dispatch => {
  //     try {
  //       const users = await productService.queryAll();
  //       const products = users;
  //       dispatch(setAllProducts(products));
  //     } catch (err) {
  //       console.log('ProductActions: err in loadProducts', err);
  //     }
  //   };
  // }

  export function updateProduct(user) {
    return async dispatch => {
      try {
        await productService.update(user);
        dispatch(_updateProduct(user));
      } catch (err) {
        console.log('ProductActions: err in updateProduct', err);
      }
    };
  }

  function setProducts(products) {
    return {
      type: 'SET_PRODUCTS',
      products
    };
  }
  
  // function setAllProducts(products) {
  //   return {
  //     type: 'SET_ALL_PRODUCTS',
  //     products
  //   };
  // }
  function setProduct(product) {
    return {
      type: 'SET_PRODUCT',
      product
    };
  }

 
  function _updateProduct(userId) {
    return {
      type: 'PRODUCT_UPDATE',
      userId
    };
  }

 function _makeProductFromUsers(users){
    const products = users.map(user => user.product);
    return products;
 }