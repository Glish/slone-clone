import validator from "validator";
import models from "../models";
import { to } from "../utils";

// eslint-disable-next-line consistent-return
export const createUser = async credentials => {
  if (!validator.isEmail(credentials.email))
    throw new Error("A valid email was not entered");

  const [err, user] = await to(models.User.create(credentials));
  if (err) throw new Error("user already exists with that email");

  return { user: user.toWeb(), token: user.getJWT() };
};

export const authUser = async credentials => {
  let err, user;

  if (!credentials.email) throw new Error("Please enter an email to login");

  if (!credentials.password)
    throw new Error("Please enter a password to login");

  if (!validator.isEmail(credentials.email))
    throw new Error("A valid email was not entered");

  [err, user] = await to(
    models.User.findOne({ where: { email: credentials.email } })
  );

  if (err) throw new Error(err.message);

  if (!user) throw new Error("Not registered");

  [err, user] = await to(user.comparePassword(credentials.password));

  if (err) throw new Error(err.message);

  return { user: user.toWeb(), token: user.getJWT() };
};

export const getUser = async id => {
  const [err, user] = await to(models.User.findOne({ where: { id } }));
  if (err) throw new Error(err.message);

  return user.toWeb();
};

export const updateUser = async (id, fields) => {
  const [updateErr, result] = await to(
    models.User.update(fields, { where: { id } })
  );

  if (updateErr) throw new Error("nick name already taken");
  if (result[0] === 0) throw new Error("No rows modified");

  const [err, user] = await to(models.User.findOne({ where: { id } }));
  if (err) throw new Error(err.message);

  return user.toWeb();
};
