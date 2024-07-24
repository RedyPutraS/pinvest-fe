export function PiLearning() {
  return (
    <img
      src="/assets/img/_pilearning.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-full"
      alt=""
    />
  );
}

export function PiCircle() {
  return (
    <img
      src="/assets/img/_picircle.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-32"
      alt=""
    />
  );
}

export function PiSpace() {
  return (
    <img
      src="/assets/img/_pispace.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-32"
      alt=""
    />
  );
}

export function PiCapital() {
  return (
    <img
      src="/assets/img/_picapital.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-32"
      alt=""
    />
  );
}
export function PiEvent() {
  return (
    <img
      src="/assets/img/_pievent.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-32"
      alt=""
    />
  );
}
export function PiNews() {
  return (
    <img
      src="/assets/img/_pinews.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-32"
      alt=""
    />
  );
}
export function PiCast() {
  return (
    <img
      src="/assets/img/_pinspire.png"
      className="h-16 object-cover xl:mb-2 xl:mt-4 xl:h-32"
      alt=""
    />
  );
}
interface Props {
  app: string;
}
export function ProgramMenuLogo({ app }: Props) {
  let menu;
  switch (app) {
    case "PiLearning":
      menu = (
        <img
          src="/assets/img/_pilearning.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "PiSpace":
      menu = (
        <img
          src="/assets/img/_pispace.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "PiCapital":
      menu = (
        <img
          src="/assets/img/_picapital.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "PiEvent":
      menu = (
        <img
          src="/assets/img/_pievent.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "PiCircle":
      menu = (
        <img
          src="/assets/img/_picircle.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "PiNews":
      menu = (
        <img
          src="/assets/img/_pinews.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "PiCast":
      menu = (
        <img
          src="/assets/img/_pinspire.png"
          className="h-16 w-fit object-contain hover:scale-125 xl:mb-2 xl:mt-4 xl:h-32"
          alt=""
        />
      );
      break;
    case "Collabs With Us":
      menu = (
        <p className="flex  text-sm font-bold text-blue-800 xl:text-2xl xl:font-bold">
          Kolaborasi Bersama Kami
        </p>
      );
      break;
    default:
      menu = <></>;
  }
  return menu;
}
