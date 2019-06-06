import React, { Component } from 'react';

import ImageGallery from './components/ImageGallery';

class App extends Component {
    render() {
        return <div className="container">
            <h2 className="row pb-5 pt-5">Image Gallery</h2>           
            <ImageGallery />
        </div>;
    };
}

export default App;
