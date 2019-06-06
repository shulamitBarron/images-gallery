import React, { Component } from 'react';
import * as _ from 'lodash';

import config from '../config';
import data from '../assets/data';
import Image from './Image';


class ImageGallery extends Component {
    constructor(props) {
        super(props);
        this.state = { data }
    }

    /**
     * Sets the selected image in the data object, uses the coordinates to find the image path.
     *  
     * @param event The event.
     * @param coordinates The image's path in the data object.
     */
    handleChangePicture = ({ target }, coordinates) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            this.setState(state => (_.set(state.data, coordinates, e.target.result), state));
        };
    };

    isImage = (resource) => {
        return (new RegExp(`.(${config.extensions.join('|')})$`)).test(resource) || resource.startsWith('data:image');
    };

    /**
     * A Recoursive function that goes over all the elements in the resource 
     * and for each element that represents an image - 
     * returns an Image Component with the path of the element in the data object (coordinates).
     * 
     * @param resource The resource to generate images from.
     * @param coordinates The resource's path in the data object.
     * @return Returns array of Image components.
     */
    renderImages = (resource, coordinates) => {
        if (_.isArray(resource)) {
            return _.map(resource, (res, index) => this.renderImages(res, [...coordinates, index]));
        }
        if (_.isObject(resource)) {
            return _.keys(resource).map((objkey) => this.renderImages(resource[objkey], [...coordinates, objkey]));
        }
        if (_.isString(resource) && (this.isImage(resource))) {
            return <Image
                key={coordinates.join()}
                image={resource}
                handleChangePicture={this.handleChangePicture}
                coordinates={coordinates} />;
        }
    };

    render() {
        return <div className="row">
            {this.state.data ? this.renderImages(this.state.data, []) :
                <div className="spiner-wrapper">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>}
        </div>;
    };
}

export default ImageGallery;
