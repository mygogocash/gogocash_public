const ProfileIcon = ({
  width = 18,
  height = 22,
  stroke = '#404040',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 18 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
      stroke={stroke}
      strokeWidth="2"
    />
    <path
      d="M17 16.5C17 18.985 17 21 9 21C1 21 1 18.985 1 16.5C1 14.015 4.582 12 9 12C13.418 12 17 14.015 17 16.5Z"
      stroke={stroke}
      strokeWidth="2"
    />
  </svg>
);

export default ProfileIcon;
