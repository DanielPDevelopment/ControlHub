/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    label, id, onChange, extra, placeholder, cols, rows, variant, state, disabled, height,
  } = props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-gray-400 dark:text-white ${variant === 'auth' ? 'ml-1.5 font-medium' : 'ml-3 font-bold'
        }`}
      >
        {label}
      </label>

      <textarea
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-400 bg-white/0 p-3 text-sm outline-none text-white !min-h-[${height}] min-h-[200px] ${disabled === true
          ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
          : state === 'error'
            ? '!border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
            : state === 'success'
              ? '!border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
              : disabled === true
                ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
                : 'border-gray-200 dark:!border-white/10 dark:text-white'
        }`}
        name={id}
        id={id}
        onChange={onChange}
      />

    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  extra: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  cols: PropTypes.number,
  rows: PropTypes.number,
  variant: PropTypes.string.isRequired,
  state: PropTypes.object,
  disabled: PropTypes.bool,
  height: PropTypes.string.isRequired,
};

TextField.defaultProps = {
  disabled: false,
  state: {},
  rows: 0,
  cols: 0,
};

export default TextField;
