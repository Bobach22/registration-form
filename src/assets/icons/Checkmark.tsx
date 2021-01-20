type Props = {
  size?: number;
  color?: string;
};

export const Checkmark: React.FC<Props> = ({
  size = 18,
  color = "currentColor",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${24} ${24}`}
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z" />
    </svg>
  );
};
