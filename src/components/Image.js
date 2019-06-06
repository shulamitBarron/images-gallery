import React, { Component } from 'react';

class Image extends Component {
    render() {
        const { image, handleChangePicture, coordinates } = this.props;

        return (<div className="border col-lg-4 col-md-6 col-sm-6 col-xs-6">
            <div className="container image-container">
                <img src={image} alt={image} className="img-thumbnail" />
                <div className="custom-file">
                    <input 
                        type="file" 
                        id={coordinates.join()} 
                        accept="image/*" 
                        className="custom-file-input"
                        onChange={e => handleChangePicture(e, coordinates)} />
                    <label className="custom-file-label" htmlFor={coordinates.join()} />
                </div>
            </div>
        </div>
        );
    };
}

export default Image;
