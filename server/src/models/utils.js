export const to = async promise => {
  const [err, res] = await awaitTo(promise);
  if (err) return [parseError(err)];

  return [null, res];
};
