import validator from "validator";
import models from "../models";

import { to } from "../utils";

// eslint-disable-next-line consistent-return
/*
export const createUser = async userInfo => {
  let err;
  let user;

  const authInfo = {};
  authInfo.status = "create";

  const uniqueKey = getUniqueKeyFromBody(userInfo);
  if (!uniqueKey) {
    ThrowError("An email or phone number was not entered.");
  }

  if (validator.isEmail(uniqueKey)) {
    authInfo.method = "email";
    // eslint-disable-next-line no-param-reassign
    userInfo.email = uniqueKey;

    [err, user] = await to(models.User.create(userInfo));
    if (err) ThrowError("user already exists with that email");

    return user;
  }
  if (validator.isMobilePhone(uniqueKey, "any")) {
    // checks if only phone number was sent
    authInfo.method = "phone";
    // eslint-disable-next-line no-param-reassign
    userInfo.phone = uniqueKey;

    [err, user] = await to(models.User.create(userInfo));
    if (err) ThrowError("user already exists with that phone number");

    return user;
  }

  ThrowError("A valid email or phone number was not entered.");
};
*/

export const authUser = async credentials => {
  let err;

  const authInfo = {};
  authInfo.status = "login";

  if (!credentials.email) throw "Please enter an email to login";

  if (!credentials.password) throw "Please enter a password to login";

  let user;
  if (validator.isEmail(credentials.email)) {
    [err, user] = await to(
      models.User.findOne({ where: { email: credentials.email } })
    );

    if (err) throw err.message;
  } else {
    throw "A valid email was not entered";
  }

  if (!user) throw "Not registered";

  [err, user] = await to(user.comparePassword(credentials.password));

  if (err) throw err.message;

  return { user: user.toWeb(), token: user.getJWT() };
};

export const getUser = async id => {
  const [err, user] = await to(models.User.findOne({ where: { id } }));
  if (err) throw err.message;

  return user.toWeb();
};

export const updateUser = async (id, fields) => {
  console.log("FIELDS", fields);
  const [updateErr, result] = await to(
    models.User.update({ fields }, { where: { id } })
  );
  if (updateErr) throw err.message;

  const [err, user] = await to(models.User.findOne({ where: { id } }));
  if (err) throw err.message;

  return user.toWeb();
};
