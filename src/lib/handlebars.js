const timeago = require('timeago.js');
const timeagInstance = timeago;

const helpers = {};

helpers.timeago = function (timestramp) {
    return timeagInstance.format(timestramp);
};

module.exports = helpers;