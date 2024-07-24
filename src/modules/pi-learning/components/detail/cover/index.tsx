type Props = {
  title?: string;
  coverUrl?: string;
};

const Cover = ({ title, coverUrl }: Props) => {
  return (
    <div>
      <h1 className="z-10 w-full text-center text-5xl text-white">{title}</h1>
      <img src={coverUrl} alt="Article cover" className="object-contain" />
    </div>
  );
};

export default Cover;
