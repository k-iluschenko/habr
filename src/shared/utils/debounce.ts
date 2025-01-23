// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (func: Function, delay = 300) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Array<unknown>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
