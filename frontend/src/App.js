import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import './assets/styles/global.scss';
import Home from './pages/Home.jsx';
import CityPage from './pages/CityPage.jsx';
import ProductDetails from './pages/ProductDetails';
import Footer from './cmps/Footer.jsx';
import EditProduct from './pages/EditProduct.jsx';
import ProductGallery from './pages/ProductGallery.jsx';
import AuthPage from './pages/AuthPage';
import UserProfile from './pages/UserProfile';
import SocketService from "./services/SocketService";

const history = createBrowserHistory();
history.listen((location, action) => {
  window.scrollTo(0, 0)
})
class App extends React.Component {
  componentDidMount(){
    // SocketService.setup();
  }
  render() {
    return (
      <div className="App">
        <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>

          {/* <Header /> */}
          <Switch>
            <Route path="/auth" component={AuthPage} exact />
            <Route path="/gallery" component={ProductGallery} exact />
            <Route path="/auth/signup" component={AuthPage} exact />
            <Route path="/profile" component={UserProfile} exact />
            {/* <Route path='/order/:id?' component={UserOrders} exact /> */}
            <Route path='/edit/:id?' component={EditProduct} exact />
            <Route path="/:id" component={CityPage} exact />
            <Route path="/" component={Home} exact />
            <Route path='/user/:id' component={ProductDetails} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
