const TrustIcon = ({
  width = 18,
  height = 20,
  fill = '#404040',
  className,
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M0 2.89L9 0V20C2.571 17.333 0 12.222 0 9.334V2.89ZM18 2.89L9 0V20C15.429 17.333 18 12.222 18 9.334V2.89Z"
      fill={fill}
    />
  </svg>
);

export default TrustIcon;
