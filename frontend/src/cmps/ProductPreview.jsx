import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from 'react-icons/fi';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import Carousel from '@bit/react-bootstrap.react-bootstrap.carousel'
// import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';


export function ProductPreview(props) {
  const { user } = props;
  const { product } = user;
  const reducer = (acc, curr) => acc + curr;

  const hasReviews = !(!product.reviews || product.reviews.length === 0);
  let rate;
  if (hasReviews) {
    const rateArr = product.reviews.map((review) => review.rate);
    rate = (rateArr.reduce(reducer) / rateArr.length).toFixed(1);
  }

  return (
    <li className="product-card">
      <Link to={`/user/${user._id}`}>
      {/* <Carousel>
      <Carousel.Item>
					<img
						className="d-block w-100"
						src={`${product.imgUrls[0]}`}
						alt="First slide"
					/>

        </Carousel.Item>
        	</Carousel> */}
        <div
          className="product-card-img"
          style={{ backgroundImage: `url(${product.imgUrls[0]})` }}
        >
          <div className="product-card-price">${product.price}</div>
        </div>
        <div className="product-card-content flex column">
          <div className="product-card-header ">
            <div className="flex space-between ">
              <div className="product-card-title">{product.title}</div>
              <div className="product-card-rate">{hasReviews && <React.Fragment><span>★</span> {rate}</React.Fragment>}</div>
            </div>
            <div className="product-card-city">in {product.city.name}</div>
            {/* </div> */}
          </div>
          <ul className="product-card-tags flex">
            {product.tags &&
              product.tags.slice(0, 3).map((tag, idx) => (
                <li className="tag" key={idx}>
                  {tag}
                </li>
              ))}
          </ul>
          <div className="product-card-footer flex column">
            <div className="product-card-mini-host flex">
              <img src={user.imgUrl} className="product-card-user-img"></img>
              <div>
                <div className="hosted-by">Hosted by</div>
                <div className="host-name">{user.name.first}</div>
              </div>
              <BottomNavigationAction className="heart" label="Favorites" value="favorites" icon={<FavoriteIcon />} />
              <i className="angle double down icon"></i> 
            </div>
          </div>
        </div>
      </Link>
    </li >
  );
}

{
  /* <button onClick={() => props.onRemoveProduct(user)}>Delete Product |</button>
<Link to={`/user/${user._id}`}>Product Details |</Link>
<Link to={`/edit/${user._id}`}>Edit Product</Link> */
}
