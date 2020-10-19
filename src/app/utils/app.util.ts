export const getTime = (date: string) => {
  if (!!date) {
    return `${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
  }
};
