export const validatePassword = (password: any) => {
  //   const regex = /^[\s\S]{8,10}$/;
  const regex = /^(?=.*[\W_])[\s\S]{8,10}$/;
  return regex.test(password);
};
