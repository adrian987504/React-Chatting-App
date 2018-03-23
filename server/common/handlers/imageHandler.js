const _ = require('lodash');

const getUniqueImageKeys = (images) => {
  if (!images) {
    return [];
  }

  const profileImageIds = _.map(images.profileImages, image => `${image.imageId}.${image.extension}`);
  const backgroundImageId = (
    images.backgroundImage &&
    images.backgroundImage.imageId &&
    images.backgroundImage.extension &&
    !images.backgroundImage.isFromDefaultLibrary
  )
    ? [`${images.backgroundImage.imageId}.${images.backgroundImage.extension}`]
    : [];
  const pinboardImageIds = _.map(images.pinboardImages, image => `${image.imageId}.${image.extension}`);

  const imageIds = _.uniq(_.concat(profileImageIds, backgroundImageId, pinboardImageIds));

  return imageIds;
};

module.exports = {
  getUniqueImageKeys
};
