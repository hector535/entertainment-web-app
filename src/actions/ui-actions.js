export const idle = () => {
  return { type: "IDLE" };
};

export const loading = () => {
  return { type: "LOADING" };
};

export const succeeded = (from) => {
  return { type: "SUCCEEDED", payload: from };
};

export const failed = (error) => {
  return { type: "FAILED", payload: error };
};
