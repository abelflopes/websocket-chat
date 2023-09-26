export const getAuth = (authToken: string): Pick<RequestInit, "headers"> => ({
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});
