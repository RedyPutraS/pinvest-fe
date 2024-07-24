import { cn } from "utils";
import { transactionFilter } from "utils/constants";

type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const filter = transactionFilter();
  return (
    <div
      className={cn(
        "rounded px-4 py-1 text-xs font-medium",
        `text-[${filter.getColor(status)}] bg-[${filter.getColor(
          status
        )}] bg-opacity-25`
      )}
    >
      {transactionFilter().getName(status)}
    </div>
  );
};

export default StatusBadge;
