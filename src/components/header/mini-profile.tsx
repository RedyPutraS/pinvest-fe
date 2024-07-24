type Props = {
  profilePicture: string;
  name: string;
};

const MiniProfile: React.FC<Props> = ({ profilePicture, name }) => {
  return (
    (profilePicture && name && (
      <div className="flex items-center">
        <img
          src={profilePicture ?? ""}
          alt="Profile picture"
          className="aspect-square h-[40px] rounded-md object-cover"
        />
        <p className="ml-2">{name}</p>

        <img
          src="/assets/icon/chevron-bottom.svg"
          alt="icon"
          className="ml-2 hidden xl:block"
        />
      </div>
    )) || <></>
  );
};

export default MiniProfile;
