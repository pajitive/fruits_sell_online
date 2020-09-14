const user = require('./user.model');
const bcrypt = require('bcrypt');


module.exports = {
    signup: async (req, res, next) => {
        try {
          let user_result = req.body;
          let result = await user.findOne({ email: user_result.email });
          if (result)
            res.status(208).send({ result: false, message: "user is already registered..." });
          else {
            let salt = await bcrypt.genSalt(10);
            user_result.password = await bcrypt.hash(user_result.password, salt);
            let new_user = await user.create(user_result);
            const token = new_user.generateAuthToken();
            let userData = {};
              userData.email = new_user.email,
              userData._id = new_user._id,
              userData.role = new_user.role,
              userData.fullName = new_user.fullName,
              userData.token = token
            res.status(200).send({
              result: true,
              data: userData,
            });
          }
        } catch (e) {
          next(e);
        }
      },
      login: async (req, res, next) => {
        let user_req = req.body;
        try {
          let result = await user.findOne({ email: user_req.email });
          if (result) {
            let isValidPassword = await bcrypt.compare(user_req.password, result.password);
            if (!isValidPassword)
              res.status(400).send({ result: false, message: "Invalid Password..." });
            else {
              const token = result.generateAuthToken();
              let data = {}
                data.email = result.email,
                data._id = result._id,
                data.role = result.role,
                data.fullName = result.fullName,
                data.token = token
              res.status(200).send({ result: true, data: data });
            }
          } else {
            res.status(208).send({ result: false, message: "Invalid user Id..." });
          }
        } catch (e) {
          next(e);
        }
      },
}