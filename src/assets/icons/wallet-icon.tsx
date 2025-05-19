const WalletIcon = (props: any) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 1C3.50664 1 2.78887 1.13978 2.1657 1.58847C1.49153 2.07386 1 2.87408 1 4V17.5C1 18.3284 1.67157 19 2.5 19H17.5C18.3284 19 19 18.3284 19 17.5V15H16C15.5066 15 14.7889 14.8602 14.1657 14.4115C13.4915 13.9261 13 13.1259 13 12C13 10.8741 13.4915 10.0739 14.1657 9.58847C14.7889 9.13978 15.5066 9 16 9H19V6.5C19 5.67633 18.335 5 17.5018 5H17V2.5C17 1.67157 16.3284 1 15.5 1H4ZM4 3C3.44772 3 3 3.44772 3 4V5H15V3H4Z"
      fill="url(#paint0_linear_87_30)"
    />
    <path
      d="M16 11H19V13H16C15.8267 13 15.5445 12.9398 15.3343 12.7885C15.1751 12.6739 15 12.4741 15 12C15 11.5259 15.1751 11.3261 15.3343 11.2115C15.5445 11.0602 15.8267 11 16 11Z"
      fill="url(#paint1_linear_87_30)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_87_30"
        x1={10}
        y1={1}
        x2={10}
        y2={19}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#63FBFE" />
        <stop offset={1} stopColor="#0A95EF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_87_30"
        x1={10}
        y1={1}
        x2={10}
        y2={19}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#63FBFE" />
        <stop offset={1} stopColor="#0A95EF" />
      </linearGradient>
    </defs>
  </svg>
);

export default WalletIcon;
