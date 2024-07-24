import { cn } from "utils/cn";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: Props) => {
  return (
    <div
      data-testid="card"
      className={cn("overflow-hidden rounded bg-zinc-50", className)}
    >
      {children}
    </div>
  );
};

export default Card;
