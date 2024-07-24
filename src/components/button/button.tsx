import type { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "utils";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: string | "solid" | "outlined";
  color?: string | "blue" | "cyan" | "green" | "red";
  size?: string | "s" | "m" | "lg";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "solid",
  color = "blue",
  size = "s",
  ...rest
}) => {
  const base = `rounded-lg border md:py-4 md:px-10 font-semibold `;
  const colors = {
    solid: {
      blue: `bg-pv-blue-dark hover:text-pv-blue-dark border-pv-blue-dark text-white hover:border-pv-blue-dark hover:bg-white disabled:bg-pv-grey-medium1 `,
      cyan: `bg-pv-cyan hover:text-pv-cyan border-pv-cyan text-white hover:border-pv-cyan hover:bg-white disabled:bg-pv-grey-medium1 `,
      green: `bg-pv-green hover:text-pv-green border-pv-green text-white hover:border-pv-green hover:bg-white disabled:bg-pv-grey-medium1 `,
      red: `bg-pv-red hover:text-pv-red border-pv-red text-white hover:border-pv-red hover:bg-white disabled:bg-pv-grey-medium1 `,
    },
    outlined: {
      blue: `bg-pv-white  border-pv-blue-dark text-pv-blue-dark   hover:border-pv-cyan hover:text-pv-cyan disabled:bg-pv-grey-medium1`,
      cyan: `bg-pv-white  border-pv-cyan text-pv-cyan   hover:border-pv-cyan hover:text-pv-cyan disabled:bg-pv-grey-medium1`,
      green: `bg-pv-white  border-pv-green text-pv-green   hover:border-pv-cyan hover:text-pv-cyan disabled:bg-pv-grey-medium1`,
      red: `bg-pv-white  border-pv-red text-pv-red   hover:border-pv-cyan hover:text-pv-cyan disabled:bg-pv-grey-medium1`,
    },
  };

  function generateColor() {
    if (variant === "solid") {
      switch (color) {
        case "blue":
          return colors.solid.blue;
        case "green":
          return colors.solid.green;
        case "red":
          return colors.solid.red;
        case "cyan":
          return colors.solid.cyan;

        default:
          break;
      }
    } else if (variant === "outlined") {
      switch (color) {
        case "blue":
          return colors.outlined.blue;
        case "green":
          return colors.outlined.green;
        case "red":
          return colors.outlined.red;
        case "cyan":
          return colors.outlined.cyan;

        default:
          break;
      }
    }
  }

  function generateSize() {
    switch (size) {
      case "s":
        return `py-2 px-8 text-[14px] leading-[17px]`;
      case "m":
        return `md:py-4 md:px-10  md:text-[14px] md:leading-[17px] py-2 px-6 text-[12px] leading-[17px]`;
      case "lg":
        return `py-6 px-12  text-[14px] leading-[17px]`;

      default:
        break;
    }
  }

  return (
    <button
      {...rest}
      className={cn(
        `${base} ${generateColor()} ${generateSize()} `,
        rest.className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
