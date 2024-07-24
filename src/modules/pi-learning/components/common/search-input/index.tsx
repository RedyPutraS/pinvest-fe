import Input, { type InputProps } from "components/input/input";
import useDebounce from "hooks/use-debounce";
import { useEffect, useState } from "react";

type Props = {
  initialValue?: string;
  onChangeText?: (text: string) => void;
} & InputProps;

export const SearchInput = ({
  onChangeText,
  initialValue = "",
  ...props
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const debounceValue = useDebounce(value, 500);

  useEffect(() => onChangeText?.(debounceValue), [debounceValue, onChangeText]);

  return (
    <Input
      placeholder="Cari..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      suffix={
        <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center bg-pv-grey-dark3 pl-3 text-white placeholder:text-xs xl:text-sm">
          <img
            src="/assets/icon/magnify.svg"
            alt="search icon"
            className="mr-3"
          />
        </div>
      }
      {...props}
    />
  );
};

export default SearchInput;
