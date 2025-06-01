const CoinIcon = ({
  width = 51,
  height = 52,
  stroke = '#404040',
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 51 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5 31.3334C17.5 35.752 24.6627 39.3334 33.5 39.3334C42.3373 39.3334 49.5 35.752 49.5 31.3334C49.5 26.9147 42.3373 23.3334 33.5 23.3334C24.6627 23.3334 17.5 26.9147 17.5 31.3334Z"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 31.3333V42C17.5 46.416 24.6627 50 33.5 50C42.3373 50 49.5 46.416 49.5 42V31.3333M1.5 10C1.5 12.8587 4.55067 15.4987 9.5 16.928C14.4493 18.3573 20.5507 18.3573 25.5 16.928C30.4493 15.4987 33.5 12.8587 33.5 10C33.5 7.14133 30.4493 4.50133 25.5 3.072C20.5507 1.64267 14.4493 1.64267 9.5 3.072C4.55067 4.50133 1.5 7.14133 1.5 10Z"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 10V36.6667C1.5 39.0347 3.55867 40.5333 6.83333 42"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 23.3334C1.5 25.7014 3.55867 27.2 6.83333 28.6667"
      stroke={stroke}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CoinIcon;
