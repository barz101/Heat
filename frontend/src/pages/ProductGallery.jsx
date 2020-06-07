import React, { Component } from "react";
import { connect } from "react-redux";
import { loadProducts } from "../actions/productActions.js";
import { ProductList } from "../cmps/ProductList.jsx";
import Header from '../cmps/Header';
import { TagSearchBar } from "../cmps/TagSeacrhBar";
import { loadCities } from "../actions/cityActions";


class ProductGallery extends Component {
  state = {
    city: '',
    category: ''
  }

  componentDidMount() {
    this.props.loadCities();
    let filterBy = this.state
    this.props.loadProducts(filterBy);
  }

  getCitiesForDropDown() {
    let options = [{ value: '', text: 'All cities' }]
    return options.concat(this.props.cities.map((city) => {
      return { value: city._id, text: city.name };
    }));
  }

  handleChange = (e, { value, name }) => {
    this.setState({ [name]: value }, () => {
      let filterBy = this.state
      this.props.loadProducts(filterBy);
    });
  };

  render() {

    const categories = [{ value: '', text: 'All Experiences' }, { value: 'Culinary tour', text: 'Culinary Tour' }, { value: 'Cooking workshop', text: 'Cooking Workshop' },
    { value: 'Dining experience', text: 'Dining Experience' }];
    return (
      <div>
        <Header pathname={this.props.location.pathname} />
        <div className="product-gallery-container">
          <h1 className="">Find Culinary Adventures, Meet Amazing Tastes With Our Worldwide Hosts </h1>
          <div className="tag-search container flex">
            <TagSearchBar options={this.getCitiesForDropDown()} name={'city'} handleChange={this.handleChange} placeholder={'Choose city'} />
            <TagSearchBar options={categories} name={'category'} handleChange={this.handleChange} placeholder={'Choose category'} />
          </div>
          <div className="product-gallery-content flex justify-center">
            <ProductList
              users={this.props.products}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    cities: state.city.cities,
  };
};
const mapDispatchToProps = {
  loadProducts,
  loadCities,
  // loadProductsByFilter
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductGallery);