const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async function (password, savedPassword) {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e);
    }
};

// export module to external
module.exports = helpers;