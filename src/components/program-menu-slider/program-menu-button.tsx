interface Props {
  title: string;
  image: JSX.Element;
  onClick?: () => void;
}
export default function ProgramMenuButton(props: Props) {
  return (
    <div className="mx-1 cursor-pointer md:my-6" onClick={props.onClick}>
      <div className="rounded-sm bg-white  ring-[#D9D9D9] hover:bg-gray-100 hover:shadow-md md:rounded-lg xl:w-[306px]">
        <div className="flex h-10 items-center font-bold md:w-full md:gap-4 md:p-6 xl:h-20 xl:p-2">
          <div className="mx-auto">{props.image}</div>
        </div>
      </div>
    </div>
  );
}
