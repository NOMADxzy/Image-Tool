import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Everything from './Everything';
import messages from './components/messages';
// import './styles/App.scss';
import ImageGallery from './ImageGallery';
const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class App extends React.Component{
  constructor() {
    super();
    this.state={
      locale:'en'
    }
    this.images = this.getStaticImages();
  }
  setLocale=(la)=>{
    this.setState({locale:la});
  }

  getStaticImages=()=> {
    let images = [];
    for (let i = 1; i < 12; i++) {
      images.push({
        original: `http://localhost:5000/pics/bus.jpg`,
        thumbnail:`http://localhost:5000/pics/bus.jpg`
      });
    }
    return images;
  }


  render() {
    return (
      <div>
        <IntlProvider locale={this.locale} messages={messages[this.locale]}>
          <Everything setLocale={this.setLocale} />
        </IntlProvider>
        {/*<div id={'fullimg'}><ImageGallery items={this.images}/></div>*/}
      </div>
    );
  }
}

export default App;
