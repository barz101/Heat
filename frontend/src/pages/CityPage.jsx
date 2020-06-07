import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCity } from "../actions/cityActions.js";
import { loadProducts, updateProduct } from "../actions/productActions.js";
import { ProductList } from "../cmps/ProductList.jsx";
import { TagSearchBar } from "../cmps/TagSeacrhBar";
import { Link } from "react-router-dom";
import Header from "../cmps/Header";
import { Spinner } from 'react-bootstrap'

class CityPage extends Component {
  state = {
    city: '',
    category: ''
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.loadCity(id);
    this.props.loadProducts({ city: id, category: '' });
    this.setState({ city: id });
  }

  handleChange = (e, { value, name }) => {

    // console.log(value, name);

    // let { name, value } = e.target;
    // value = e.target.type === 'number' ? parseInt(value) : value;
    this.setState({ [name]: value }, () => {
      let filterBy = this.state
      this.props.loadProducts(filterBy);
    });
  };


  // onRemoveProduct = (user) => {
  //   const editedUser = { ...user };
  //   editedUser.product = null;
  //   this.props.removeProduct(editedUser);
  //   const { id } = this.props.match.params;
  //   this.props.loadProducts(id);
  // };

  render() {
    const { city } = this.props;
    const categories = [{ value: '', text: 'All experiences' }, { value: 'Culinary tour', text: 'Culinary tour' }, { value: 'Cooking workshop', text: 'Cooking workshop' },
    { value: 'Dining experience', text: 'Dining experience' }];
    // if (!city || !(this.props.products)) return "Loading";
    if (!city || !(this.props.products)) return <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>;
    return (
      <div className="city-page container">
        <Header pathname={this.props.location.pathname} city={city._id} />

        <div
          className="hero hero-city-page"
          style={{ backgroundImage: `url(${city.thumbnailUrl})` }}
        >
          <p>{`${city.name}`}</p>
        </div>
        {/* <section className="search-bar"> */}
        <TagSearchBar className="city-filter" options={categories} name={'category'} handleChange={this.handleChange} placeholder={'Choose category'} />
        {/* </section> */}

        <ProductList
          users={this.props.products}
        // onRemoveProduct={this.onRemoveProduct}
        />
        <section className="city-info">
          <div className="city-txt">
            <p className="city-about">About {`${city.name}`}</p>
            <p className="city-info-txt">{city.info}</p>
          </div>
          <div className="city-imgs-container">
            <div className="img-1" style={{ backgroundImage: `url(${city.imgUrls[0]})` }} />
            <div className="img-2" style={{ backgroundImage: `url(${city.imgUrls[1]})` }} />
            <div className="img-3" style={{ backgroundImage: `url(${city.imgUrls[2]})` }} />
            <div className="img-4" style={{ backgroundImage: `url(${city.imgUrls[3]})` }} />
          </div>
        </section>
        <section className="city-attraction-wrapper">
          <p className="top-attraction-header">Top Attractions in {`${city.name}`}</p>
          <section className="city-attractions">
            <div className="attraction-card card-1">
              <img src={city.attractions[0].imgUrl} />
              <p className="attraction-name">{`${city.attractions[0].name}`}</p>
              <p className="attraction-description">{`${city.attractions[0].description}`}</p>
            </div>
            <div className="attraction-card card-2">
              <img src={city.attractions[1].imgUrl} />
              <p className="attraction-name">{`${city.attractions[1].name}`}</p>
              <p className="attraction-description">{`${city.attractions[1].description}`}</p>
            </div>
            <div className="attraction-card card-3">
              <img src={city.attractions[2].imgUrl} />
              <p className="attraction-name">{`${city.attractions[2].name}`}</p>
              <p className="attraction-description">{`${city.attractions[2].description}`}</p>
            </div>
            <div className="attraction-card card-4">
              <img src={city.attractions[3].imgUrl} />
              <p className="attraction-name">{`${city.attractions[3].name}`}</p>
              <p className="attraction-description">{`${city.attractions[3].description}`}</p>
            </div>
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.city.currCity,
    products: state.product.products,
  };
};
const mapDispatchToProps = {
  loadCity,
  loadProducts,
  updateProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CityPage);
