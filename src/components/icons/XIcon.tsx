const XIcon = ({
  width = 22,
  height = 22,
  fill = '#404040',
  className,
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.9408 9.392L20.5353 0.5H18.7353L12.1428 8.2205L6.87481 0.5H0.799805L8.76481 12.176L0.799805 21.5H2.5998L9.56281 13.346L15.1263 21.5H21.2013L12.9408 9.392ZM10.4763 12.278L9.66931 11.1155L3.2478 1.865H6.01231L11.1933 9.3305L12.0003 10.493L18.7368 20.198H15.9723L10.4763 12.278Z"
      fill={fill}
    />
  </svg>
);

export default XIcon;
