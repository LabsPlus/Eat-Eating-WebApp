export const validatePassword = (password: any) => {
  const regex = /^(?=.*[\W_])[\s\S]{8,15}$/;
  return regex.test(password);
};
