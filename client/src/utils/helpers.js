export const validateResponse = (res) => {
  if (res && res.success) {
    return true;
  } else {
    return false;
  }
};
