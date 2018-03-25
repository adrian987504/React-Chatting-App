const _ = require('lodash');
const mongoose = require('mongoose');
const { catchErrors } = require('../../utils/error');

const { existsObject, deleteObjects } = require('./../../common/handlers/spacesHandler');

const { getUniqueImageKeys } = require('./../../common/handlers/imageHandler');
const { invalidIdError } = require('./../..//common/errors/generalErrors');
const {
  profilePermissionError,
  imageNotFoundError
} = require('./../../common/errors/profileErrors');

const castProfileId = (req, res, next) => {
  try {
    req.params.profileId = mongoose.Types.ObjectId(req.params.profileId);
    return next();
  } catch (err) {
    return next(invalidIdError);
  }
};

const checkProfileOwner = (req, res, next) => {
  const { isProfileOwner } = res.locals;

  if (!isProfileOwner) {
    return next(profilePermissionError);
  }

  return next();
};

const checkProfileOwnerOrPublic = (req, res, next) => {
  const { profile, isProfileOwner } = res.locals;

  const profileOwnerOrPublic = (
    isProfileOwner ||
    profile.isPublic()
  );

  if (!profileOwnerOrPublic) {
    return next(profilePermissionError);
  }

  return next();
};

const updateMatchQuestions = async (req, res, next) => {
  const { profile } = res.locals;

  profile.matchQuestions.set(req.body);
  res.locals.profile = await profile.save();

  return next();
};

const updateSettings = async (req, res, next) => {
  const { profile } = res.locals;

  profile.settings.set(req.body);
  res.locals.profile = await profile.save();

  return next();
};

const updateImages = async (req, res, next) => {
  const userId = res.locals.user.id;
  const { profile } = res.locals;
  const newImages = _.assign({}, profile.images.toObject(), req.body);

  const existingImageKeys = getUniqueImageKeys(profile.images);
  const newImageKeys = getUniqueImageKeys(newImages);

  const removedImageKeys = _.difference(existingImageKeys, newImageKeys);
  const addedImageKeys = _.difference(newImageKeys, existingImageKeys);

  const existPromises = _.map(addedImageKeys,
    imageKey => existsObject(`${userId}/${imageKey}`)
  );
  const existResults = await Promise.all(existPromises);
  if (!_.every(existResults)) {
    return next(imageNotFoundError);
  }

  const deletePromise = deleteObjects(
    _.map(removedImageKeys,
      imageKey => `${userId}/${imageKey}`
    )
  );
  await deletePromise;

  profile.images.set(req.body);
  res.locals.profile = await profile.save();

  return next();
};

const returnMatchQuestions = (req, res) =>
  res.jsonSuccess(res.locals.profile.matchQuestions);

const returnSettings = (req, res) =>
  res.jsonSuccess(res.locals.profile.settings);

const returnImages = (req, res) => {
  const { profile } = res.locals;
  return res.jsonSuccess({ folder: profile.owner, ...profile.images });
};

module.exports = {
  castProfileId,
  checkProfileOwner,
  checkProfileOwnerOrPublic,
  updateMatchQuestions: catchErrors(updateMatchQuestions),
  updateSettings: catchErrors(updateSettings),
  updateImages: catchErrors(updateImages),
  returnMatchQuestions,
  returnSettings,
  returnImages
};
