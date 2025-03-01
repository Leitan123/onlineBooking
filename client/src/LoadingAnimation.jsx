const LoadingIcon = () => {
  return (
    <svg
      className="w-12 h-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="translate(50 50)">
        <g transform="translate(-17 -17) scale(0.5)">
          <g transform="rotate(258)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;360"
              keyTimes="0;1"
              dur="4s"
              begin="0s"
              repeatCount="indefinite"
            />
            <path
              d="M37.3496987939662 -7 L47.3496987939662 -7 L47.3496987939662 7..."
              fill="#ff5400"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default LoadingIcon;
