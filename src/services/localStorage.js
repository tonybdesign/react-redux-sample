export const getLocalStorageAuth = () => {
  const loggedUser = localStorage.getItem('loggedUser');
  if (!loggedUser || loggedUser === null || loggedUser === '') {
    return null;
  }
  return { ...JSON.parse(loggedUser), readyState: undefined };
};
export const setLocalStorageAuth = (data) => {
  localStorage.setItem('loggedUser', JSON.stringify(data));
  return getLocalStorageAuth();
};
