import React, { Component } from "react";
import { Flex, Box } from "@rebass/grid";

import data from "../data/data";
import ImageCard from "./ImageCard";
import isImageFile from "../utils/images";
import { Card } from "@shopify/polaris";

let images = {};
data.imageFiles.forEach(imageFile => {
  images[imageFile] = {
    imageFile,
    labels: [],
  };
});

class ImageList extends Component {
  state = {
    images,
  };

  handleUpdateImages = (imageFile, imageLabels) => {
    // console.log("handleUpdateImages - imageLabels:", imageLabels);
    const { images } = this.state;
    this.setState({
      images: {
        ...images,
        [imageFile]: {
          imageFile,
          labels: imageLabels,
        },
      },
    });
  };

  render() {
    const { images } = this.state;
    const { activeFilters, handleUpdateAllLabels } = this.props;

    if (images) {
      const isFilterMatch = label => {
        if (activeFilters && label) {
          return activeFilters.includes(label);
        }
        return false;
      };

      return (
        <Card>
          <Flex flexWrap="wrap" flexDirection="row">
            {Object.keys(images).map(image => {
              let shouldShowImage = true;

              if (activeFilters.length > 0) {
                shouldShowImage =
                  isImageFile(images[image].imageFile) &&
                  images[image].labels.some(isFilterMatch);
              } else {
                shouldShowImage = isImageFile(images[image].imageFile);
              }

              return (
                shouldShowImage && (
                  <Box width={[1 / 3]} key={images[image].imageFile}>
                    <ImageCard
                      imageFile={images[image].imageFile}
                      handleUpdateAllLabels={handleUpdateAllLabels}
                      handleUpdateImages={this.handleUpdateImages}
                      activeFilters={activeFilters}
                      images={images}
                    />
                  </Box>
                )
              );
            })}
          </Flex>
        </Card>
      );
    }
    return <Card>No images found</Card>;
  }
}

export default ImageList;
