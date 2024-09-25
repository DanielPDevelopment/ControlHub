// for handling onKeyDown
// jsx-a11y/click-events-have-key-events
// source: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/65c9338c62c558d3c1c2dbf5ecc55cf04dbfe80c/docs/rules/click-events-have-key-events.md
const useKeyDown = (event, key, fns) => {
  if (event.key === key) {
    fns.forEach((fn) => {
      if (typeof fn === 'function') {
        fn();
      }
    });
  }
};

export default useKeyDown;
