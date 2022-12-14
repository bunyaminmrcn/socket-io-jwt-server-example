const bcrypt = require('bcryptjs');
const saltRounds = 10;

const hash_password = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) reject(err)
            bcrypt.hash(password, salt, function (err_, hash) {
                // Store hash in your password DB.
                if (err_) reject(err_)
                else resolve(hash)
            });
        });
    })
}

const check_passpord = async (password, hash) => {

    return new Promise((resolve, reject) => {
        const isEqual = bcrypt.compareSync(password, hash)
        resolve(isEqual)
    })
}


const makeId = async (length) => {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


module.exports = {
    hash_password,
    check_passpord,
    makeId
}