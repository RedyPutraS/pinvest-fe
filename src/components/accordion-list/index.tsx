import { useDisclosure } from "hooks/use-disclosure";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Accordion = ({ title, children }: Props) => {
  const { onToggle, isOpen } = useDisclosure();
  return (
    <div>
      <p
        className="flex justify-between text-[16px] font-bold"
        onClick={onToggle}
      >
        {title} <span>{!isOpen ? <ChevronDown /> : <ChevronUp />}</span>
      </p>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default Accordion;
