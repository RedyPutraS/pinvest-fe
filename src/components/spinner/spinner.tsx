type Props = {
  center?: boolean;
  classNames?: string;
};

export const Spinner = ({ center }: Props) => {
  const getSpinner = () => {
    return <p>Mohon Tunggu...</p>;
  };
  return center ? (
    <div className="flex justify-center">{getSpinner()}</div>
  ) : (
    getSpinner()
  );
};

export default Spinner;
