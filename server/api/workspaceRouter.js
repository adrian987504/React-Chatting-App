const express = require('express');

const workspaceController = require('./../controllers/workspace/workspaceController');

const workspaceRouter = express.Router();

/**
  Publicly available user routes
**/

workspaceRouter.route('/create')
  .post(
    workspaceController.createWorkspace
  );

workspaceRouter.route('/list')
  .get(
    workspaceController.listWorkspace
  );
workspaceRouter.route('/search')
  .post(
    workspaceController.searchWorkspace
  );
module.exports = workspaceRouter;
