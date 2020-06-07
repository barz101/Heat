import { loadCities } from "../actions/cityActions";
import { connect } from "react-redux";
import React, { Component } from "react";
import CityList from "../cmps/CityList";
import { ProductList } from "../cmps/ProductList";
import CitySearchBar from "../cmps/CitySearchBar";
import productService from "../services/productService";
import Header from '../cmps/Header';
import { Link } from "react-router-dom";


document.body.classList.add('home');

class Home extends Component {
  state = {
    favUsers: null,
    chefUsers: null,
    workshopUsers: null,
    tourUsers: null,
    isDown: false
  };
  componentDidMount() {
    this.props.loadCities();
    window.addEventListener("scroll", this.handleScroll);

    const favIds = [
      "5ed2d2e871d6da0d6fe1eb02",
      "5ecbb83a0c2535f563044b9f",
      "5ed26763757ca025f58f39de",
      "5ecbb83a0c2535f563044b9d"
    ];
    const chefIds = [
      "5ecfc4f7d44f5a6943bfa99e",
      "5ed2d2e871d6da0d6fe1eb02",
      "5ecbb83a0c2535f563044ba3",
      "5ed2d2dc71d6da0d6fe1e768",
    ];
    const wShopIds = [
      "5ecbb83a0c2535f563044b9c",
      "5ed2d2f771d6da0d6fe1ee2b",
      "5ed2d2d171d6da0d6fe1e105",
      "5ecbb83a0c2535f563044ba2",
    ];
    const tourIds = [
      "5ed2d2ac71d6da0d6fe1da9f",
      "5ed26763757ca025f58f39de",
      "5ecbb83a0c2535f563044ba1",
      "5ed2d2b971d6da0d6fe1dd24",
    ];
    this.getFavUsers(favIds);
    this.getChefUsers(chefIds);
    this.getWShopUsers(wShopIds);
    this.getTourUsers(tourIds);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (
      document.body.scrollTop > 350 ||
      document.documentElement.scrollTop > 350
      ) {
      this.setState({ isDown: true })
    }
    else {
      this.setState({ isDown: false })
    }
  }
  getFavUsers = (favIds) => {
    productService
      .getFav(favIds)
      .then((users) => this.setState({ favUsers: users }));
  };
  getChefUsers = (chefIds) => {
    productService
      .getFav(chefIds)
      .then((users) => this.setState({ chefUsers: users }));
  };
  getWShopUsers = (wShopIds) => {
    productService
      .getFav(wShopIds)
      .then((users) => this.setState({ workshopUsers: users }));
  };
  getTourUsers = (tourIds) => {
    productService
      .getFav(tourIds)
      .then((users) => this.setState({ tourUsers: users }));
  };

  render() {

    return (
      <div className="home-page container">
        <Header pathname={this.props.location.pathname} />
        <div className="hero">
          <div className="hero-text">
            <h1 >Taste The World.</h1>
            <span>Find Exceptional Culinary Experiences Worldwide By Our Unique Hosts</span>
          </div>
          {!this.state.isDown && <CitySearchBar />}
        </div>
        <main className="content-container">
          <section className="top-rated products-container">
            <h1 className="title flex justify-center">
              <span>★</span>
               Top Rated  </h1>
            <div className="underline">&nbsp; &nbsp;</div>

            <ul>
              <ProductList users={this.state.favUsers} />
            </ul>
          </section>
          <section className="testimonials">
            <h2>why they love it</h2>
            <div className="row row2">
              <section className="col span-1-of-3">
                <blockquote> Alexandra was an excellent host. We were lucky in that it was only my husband and I on our hike so she catered the walk based on our preferences. The location was secluded and just perfect for a great view of the sunset over Old Town.
                  {/* <img src="https://www.pinclipart.com/picdir/middle/107-1073416_left-quote-quote-white-icon-png-clipart.png"></img> */}
                  <cite><img src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70" alt="Customer 1 photo"></img> Alberto Duncan </cite>
                </blockquote>
              </section>
              <section className="col span-1-of-3">
                <blockquote>  We spent a couple of weeks bouncing around Italy and, by far, our dinner with Debora and Fiamma was the highlight! The dinner party was like nothing we'd experienced, Debora and Fiamma provided a fantastic meal and an atmosphere of openness and community that encouraged discussion amongst the travelers gathered.
                  <cite><img src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="Customer 1 photo"></img> Joana Silva </cite>
                </blockquote>
              </section>
              <section className="col span-1-of-3">
                <blockquote>  Can’t say enough about how amazing our experience at Laura’s was!!! The food, the atmosphere, the view, the drinks and most importantly, the people! Laura and her friends made our time in Barcelona a million times better and we HIGHLY recommend her to everyone.
                  <cite><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQhhklLpQnJpmdcRWm07dxiiIp22D9ZaFlhzNF5S7EMPxEinocq&usqp=CAU" alt="Customer 1 photo"></img> Milton Chapman </cite>
                </blockquote>
              </section>
            </div>
          </section>
          <section className="cities-container">
            <h1>Top Destinations</h1>
            <div className="underline1">&nbsp; &nbsp;</div>
            <ul>
              <CityList cities={this.props.cities} />
            </ul>
          </section>
          <section className="top-chefs products-container">
            <div className="see-more flex justify-center space-between">
              <h1>Dining Experiences</h1>
              <div className="underline1">&nbsp; &nbsp;</div>
              <Link to={`/gallery`}>See More >></Link>
            </div>
            <ul>
              <ProductList users={this.state.chefUsers} />
            </ul>
          </section>
          <section className="top-workshops products-container">
            <div className="see-more flex justify-center space-between">
              <h1>Cooking Workshops</h1>
              <div className="underline1">&nbsp; &nbsp;</div>
              <Link to={`/gallery`}>See More >></Link>
            </div>
            <ul>
              <ProductList users={this.state.workshopUsers} />
            </ul>
          </section>
          <section className="top-tours products-container">
            <div className="see-more flex justify-center space-between">
              <h1>Culinary Tours</h1>
              <Link to={`/gallery`}>See More >></Link>
            </div>
            <ul>
              <ProductList users={this.state.tourUsers} />
            </ul>
          </section>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.city.cities,
    loggedInUser: state.user.loggedInUser,
  };
};

const mapDispatchToProps = {
  loadCities,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
