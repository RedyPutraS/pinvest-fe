type Props = {
  profilePicture: string;
  name: string;
  time: string;
  subcomment: string;
};

const SubcommentItem = ({ profilePicture, name, time, subcomment }: Props) => {
  return (
    <div className="mt-5 rounded-xl border-l-8 border-pv-blue-light bg-pv-white-light p-2">
      <div className="flex">
        {profilePicture && (
          <img
            src={profilePicture}
            alt={name ?? ""}
            className="h-14 w-14 overflow-hidden rounded-lg object-cover"
          />
        )}
        <div className="ml-2">
          <p className="text-dark3 font-semibold">{name}</p>
          <p className="text-medium3">{time}</p>
        </div>
      </div>
      <p className="mt-4">{subcomment}</p>
    </div>
  );
};

export default SubcommentItem;
