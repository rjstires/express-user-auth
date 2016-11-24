const User = require('./user.schema');

const list = function(req, res) {
    User.fetchAll()
        .then(function(results) {
            if (results.length > 0) {
                return res.status(200).send({users: results});
            }
            return res.status(204).send();
        })
        .catch(standardError(req, res));
};

const create = function(req, res) {
    const body = req.body;
    new User({email: body.email, password: body.password})
        .save()
        .then(function(user) {
            res.status(201).send(user.toJSON());
        })
        .catch(standardError(req, res));
};

const read = function(req, res) {
    User
        .where({id: req.params.id})
        .fetch()
        .then(function(results) {
            if (results) {
                return res.status(200).send(results);
            }
            return res.status(204).send();
        }, standardError(req, res));
};

const update = function(req, res) {
    res.status(200).send({message: 'update'});
};

const destroy = function(req, res) {
    new User({id: req.params.id})
        .destroy()
        .then(function() {
            res.status(204).send();
        })
        .catch(standardError(req, res));
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Function} - Express response function.
 */
function standardError(req, res) {
    return function(error) {
        return res.status(400).send({error: error});
    };
}

module.exports = {
    list: list,
    create: create,
    read: read,
    update: update,
    destroy: destroy,
};
