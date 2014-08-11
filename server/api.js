_ = require('underscore');

var Collection, type, err, result,
    _params, _handleError, _getById, _getAll, _create, _updateById, _deleteById,
    urlMap = {
      bugs:   'bugs',
      scores: 'scores'
    },
    collectionMap = {
      bugs:   [],
      scores: []
    };

_handleError = function(err, res) {
  return res.send(500, {
    name:    err.name,
    message: err.message
  });
};

// Read the parameters send with the request.
_params = function(params, cb) {
  err   = null;
  type  = urlMap[params.model];
  Collection = collectionMap[type];

  if (typeof Collection === 'undefined' || Collection === null) {
    err = new Error('Collection of type ' + params.Collection + ' not allowed.');
    return cb(err, null);
  }

  result = {
    model: params.model,
    type:  type,
    id:    params.id,
    Collection: Collection
  };
  return cb(err, result);
};

_getById = function(req, res) {
  _params(req.params, function(err, params) {
    if (err) {
      return _handleError(err, res);
    }

    Collection = params.Collection;
    res.json(_.where(Collection, {id: params.id}));

  });
};

_updateById = function(req, res) {
  _params(req.params, function(err, params) {
    if (err) {
      return _handleError(err, res);
    }

    model = _.findWhere(params.Collection, {id: params.id});

    if (model === undefined) {
      // Add a model to the array.
      params.Collection.push(req.body);
    } else {
      // TODO: Update existing model.
      _.each(req.body, function(value, key) {
        if (_.has(model, key)) {
          model[key] = value;
        }
      });
    }
    res.json(Collection);
  });
};

_deleteById = function(req, res) {
  _params(req.params, function(err, params) {
    if (err) {
      return _handleError(err, res);
    }

    Collection = params.Collection;
    idToDelete = params.id;

    // Filter out the object and return the modified collection.
    for (var i = 0; i < Collection.length; i++) {
      var obj = Collection[i];
      if (idToDelete.indexOf(obj.id) !== -1) {
        Collection.splice(i,1);
      }
    }

    res.json(Collection);
  });
};

_getAll = function(req, res) {
  _params(req.params, function(err, params) {
    if (err) {
      return _handleError(err, res);
    }

    // Send back the entire array of objects.
    res.json(params.Collection);
  });
};

_create = function(req, res) {
  _params(req.params, function(err, params) {
    if (err) {
      return _handleError(err, res);
    }

    // Add a model to the array.
    Collection = params.Collection;
    Collection.push(req.body);

    res.json(Collection);
  });
};

// Public API
module.exports = function(router) {
  router.route('/:model/:id')
  .get(_getById)
  .put(_updateById)
  .delete(_deleteById);

  router.route('/:model')
  .get(_getAll)
  .post(_create);
};
