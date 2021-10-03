function Button({
  widthXS,
  heightXS,
  width,
  height,
  rounded,
  textSizeXS,
  textSizeSM,
  textSizeLG,
  bgColor,
  textColor,
  fontfamily,
  disabled = false,
  children,
  ...rest
}) {
  return (
    <button
      className={`w-${widthXS} h-${heightXS} bg-${bgColor} text-${textColor} font-${fontfamily} p-2 border-0 ${
        rounded && 'rounded'
      } uppercase cursor-pointer outline-none text-${textSizeXS} sm:w-${width} sm:h-${height} sm:text-sm sm:text-${textSizeSM} lg:text-${textSizeLG} ${
        disabled && 'opacity-30 cursor-not-allowed'
      }`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  widthXS: 16,
  heightXS: 8,
  width: 20,
  height: 12,
  rounded: false,
  textSizeXS: 'xs',
  textSizeSM: 'sm',
  textSizeLG: 'lg',
  bgColor: 'primary',
  textColor: 'white',
  fontfamily: 'lato',
};

export default Button;
