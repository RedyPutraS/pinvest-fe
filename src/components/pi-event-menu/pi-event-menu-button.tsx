import Typo from "components/typo/typo";
type Props = {
  category: {
    id: number;
    alias: string;
    category_name: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (category: any) => void;
};
export default function PiEventMenuButton({ category, onClick }: Props) {
  return (
    <div
      onClick={() => {
        onClick(category);
      }}
    >
      <div className="flex items-center rounded bg-pv-white-light p-3 lg:hidden md:p-5 ">
        <img
          src={`/assets/icon/${category.alias}.png`}
          className="!w-8"
          alt=""
        />
        <Typo.Caption className="ml-2 font-semibold md:ml-4 md:text-[18px]">
          {category.category_name}
        </Typo.Caption>
      </div>
      <div className="hidden cursor-pointer items-center rounded bg-pv-white-light p-3 ring-gray-200 hover:bg-pv-white-pure hover:ring-1 md:p-5 lg:flex ">
        <img
          src={`/assets/icon/${category.alias}.png`}
          className=" w-16"
          alt=""
        />
        <Typo.Caption className="ml-2 font-semibold md:ml-4 md:text-[20px]">
          {category.category_name}
        </Typo.Caption>
      </div>
    </div>
  );
}
