import cn from "utils/cn";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export const CardImage = ({ children, className }: Props) => {
  return (
    <div
      data-testid="card-image"
      className={cn("relative aspect-video", className)}
    >
      {children}
    </div>
  );
};

export default CardImage;
