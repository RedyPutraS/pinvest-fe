import { cn } from "utils/cn";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const CardBody = ({ children, className }: Props) => {
  return (
    <div data-testid="card-body" className={cn("p-4", className)}>
      {children}
    </div>
  );
};

export default CardBody;
