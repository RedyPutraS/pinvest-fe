export function PiLearning() {
  return (
    <img
      src="/assets/img/pilearning.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-12"
      alt=""
    />
  );
}

export function PiCircle() {
  return (
    <img
      src="/assets/img/picircle.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-12"
      alt=""
    />
  );
}

export function PiSpace() {
  return (
    <img
      src="/assets/img/pispace.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-14"
      alt=""
    />
  );
}

export function PiCapital() {
  return (
    <img
      src="/assets/img/_picapital_crop.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-14"
      alt=""
    />
  );
}
export function PiEvent() {
  return (
    <img
      src="/assets/img/pievent.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-12"
      alt=""
    />
  );
}
export function PiNews() {
  return (
    <img
      src="/assets/img/pinews.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-12"
      alt=""
    />
  );
}
export function PiCast() {
  return (
    <img
      src="/assets/img/pinspire.png"
      className="mt-4 mb-2 h-6 object-cover xl:h-12"
      alt=""
    />
  );
}
interface Props {
  app: string;
}
export function ProgramMenuIcon({ app }: Props) {
  let menu;
  switch (app) {
    case "PiLearning":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#3283CA" />
          <g clipPath="url(#clip0_266_1850)">
            <path
              d="M16.75 15.125C16.75 13.4014 18.1402 12 19.85 12H36.9C38.6098 12 40 13.4014 40 15.125V29.1875C40 30.9111 38.6098 32.3125 36.9 32.3125H25.3137C24.7422 31.0674 23.8655 29.9932 22.7756 29.1875H27.6V27.625C27.6 26.7607 28.2927 26.0625 29.15 26.0625H32.25C33.1073 26.0625 33.8 26.7607 33.8 27.625V29.1875H36.9V15.125H19.85V17.5225C18.9394 16.9902 17.8786 16.6875 16.75 16.6875V15.125ZM16.75 27.625C14.1828 27.625 12.1 25.5254 12.1 22.9375C12.1 20.3496 14.1828 18.25 16.75 18.25C19.3172 18.25 21.4 20.3496 21.4 22.9375C21.4 25.5254 19.3172 27.625 16.75 27.625ZM15.4567 29.1875H18.0384C21.6083 29.1875 24.5 32.1025 24.5 35.6963C24.5 36.4141 23.9236 37 23.2067 37H10.2933C9.57641 37 9 36.4189 9 35.6963C9 32.1025 11.8917 29.1875 15.4567 29.1875Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_266_1850">
              <rect
                width="31"
                height="25"
                fill="white"
                transform="translate(9 12)"
              />
            </clipPath>
          </defs>
        </svg>
      );
      break;
    case "PiSpace":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#144E84" />
          <g clipPath="url(#clip0_266_2987)">
            <path
              d="M14.65 19.4375C12.3019 19.4375 10.4 17.5496 10.4 15.2188C10.4 12.8879 12.3019 11 14.65 11C16.9981 11 18.9 12.8879 18.9 15.2188C18.9 17.5496 16.9981 19.4375 14.65 19.4375ZM34.2 19.4375C31.8519 19.4375 29.95 17.5496 29.95 15.2188C29.95 12.8879 31.8519 11 34.2 11C36.5481 11 38.45 12.8879 38.45 15.2188C38.45 17.5496 36.5481 19.4375 34.2 19.4375ZM7 26.7518C7 23.6457 9.53937 21.125 12.6684 21.125H14.9369C15.7816 21.125 16.5838 21.3096 17.3063 21.6365C17.2372 22.0162 17.2053 22.4117 17.2053 22.8125C17.2053 24.827 18.0978 26.6357 19.5056 27.875C19.495 27.875 19.4844 27.875 19.4684 27.875H8.13156C7.51 27.875 7 27.3688 7 26.7518ZM28.5316 27.875C28.5209 27.875 28.5103 27.875 28.4944 27.875C29.9075 26.6357 30.7947 24.827 30.7947 22.8125C30.7947 22.4117 30.7575 22.0215 30.6938 21.6365C31.4163 21.3043 32.2184 21.125 33.0631 21.125H35.3316C38.4606 21.125 41 23.6457 41 26.7518C41 27.374 40.49 27.875 39.8684 27.875H28.5316ZM29.1 22.8125C29.1 25.6074 26.8156 27.875 24 27.875C21.1844 27.875 18.9 25.6074 18.9 22.8125C18.9 20.0176 21.1844 17.75 24 17.75C26.8156 17.75 29.1 20.0176 29.1 22.8125ZM13.8 36.592C13.8 32.7107 16.9716 29.5625 20.8816 29.5625H27.1184C31.0284 29.5625 34.2 32.7107 34.2 36.592C34.2 37.3672 33.5678 38 32.7816 38H15.2184C14.4375 38 13.8 37.3725 13.8 36.592Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_266_2987">
              <rect
                width="34"
                height="27"
                fill="white"
                transform="translate(7 11)"
              />
            </clipPath>
          </defs>
        </svg>
      );
      break;
    case "PiCapital":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#70B268" />
          <path
            d="M14 14C14 11.7938 15.7937 10 18 10H36C38.2062 10 40 11.7938 40 14V34C40 36.2062 38.2062 38 36 38H13C10.2375 38 8 35.7625 8 33V16C8 14.8938 8.89375 14 10 14C11.1063 14 12 14.8938 12 16V33C12 33.55 12.45 34 13 34C13.55 34 14 33.55 14 33V14ZM18 15.5V20.5C18 21.3313 18.6687 22 19.5 22H34.5C35.3312 22 36 21.3313 36 20.5V15.5C36 14.6687 35.3312 14 34.5 14H19.5C18.6687 14 18 14.6687 18 15.5ZM18 27C18 27.55 18.45 28 19 28H25C25.55 28 26 27.55 26 27C26 26.45 25.55 26 25 26H19C18.45 26 18 26.45 18 27ZM28 27C28 27.55 28.45 28 29 28H35C35.55 28 36 27.55 36 27C36 26.45 35.55 26 35 26H29C28.45 26 28 26.45 28 27ZM18 33C18 33.55 18.45 34 19 34H25C25.55 34 26 33.55 26 33C26 32.45 25.55 32 25 32H19C18.45 32 18 32.45 18 33ZM28 33C28 33.55 28.45 34 29 34H35C35.55 34 36 33.55 36 33C36 32.45 35.55 32 35 32H29C28.45 32 28 32.45 28 33Z"
            fill="white"
          />
        </svg>
      );
      break;
    case "PiEvent":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#3283CA" />
          <g clipPath="url(#clip0_266_1850)">
            <path
              d="M16.75 15.125C16.75 13.4014 18.1402 12 19.85 12H36.9C38.6098 12 40 13.4014 40 15.125V29.1875C40 30.9111 38.6098 32.3125 36.9 32.3125H25.3137C24.7422 31.0674 23.8655 29.9932 22.7756 29.1875H27.6V27.625C27.6 26.7607 28.2927 26.0625 29.15 26.0625H32.25C33.1073 26.0625 33.8 26.7607 33.8 27.625V29.1875H36.9V15.125H19.85V17.5225C18.9394 16.9902 17.8786 16.6875 16.75 16.6875V15.125ZM16.75 27.625C14.1828 27.625 12.1 25.5254 12.1 22.9375C12.1 20.3496 14.1828 18.25 16.75 18.25C19.3172 18.25 21.4 20.3496 21.4 22.9375C21.4 25.5254 19.3172 27.625 16.75 27.625ZM15.4567 29.1875H18.0384C21.6083 29.1875 24.5 32.1025 24.5 35.6963C24.5 36.4141 23.9236 37 23.2067 37H10.2933C9.57641 37 9 36.4189 9 35.6963C9 32.1025 11.8917 29.1875 15.4567 29.1875Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_266_1850">
              <rect
                width="31"
                height="25"
                fill="white"
                transform="translate(9 12)"
              />
            </clipPath>
          </defs>
        </svg>
      );
      break;
    case "PiCircle":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#EB4D2D" />
          <g clipPath="url(#clip0_266_3030)">
            <path
              d="M39.4948 23.1212L36.5382 18.036C36.6014 17.9105 36.6488 17.7693 36.6488 17.6123C36.6488 17.1414 36.2536 16.749 35.7792 16.7333L32.5063 11.1146C32.538 11.0204 32.5695 10.9263 32.5695 10.8321C32.5695 10.3299 32.1585 9.9375 31.6683 9.9375C31.3837 9.9375 31.1466 10.0631 30.9726 10.2671H24.6799C24.5217 10.0631 24.2846 9.93756 24 9.93756C23.7154 9.93756 23.4783 10.0631 23.3201 10.2671H17.059C16.885 10.0631 16.6479 9.93756 16.3633 9.93756C15.8732 9.93756 15.462 10.3299 15.462 10.8322C15.462 10.9263 15.4937 11.0362 15.5253 11.1146L12.2208 16.8119C11.9046 16.9531 11.6832 17.2513 11.6832 17.6123C11.6832 17.6437 11.699 17.6751 11.699 17.7065L8.55261 23.1055C8.12572 23.184 7.80945 23.545 7.80945 23.9844C7.80945 24.4082 8.10984 24.7692 8.52097 24.8633L11.7781 30.4507C11.7464 30.5449 11.7306 30.6233 11.7306 30.7332C11.7306 31.1569 12.031 31.5179 12.4421 31.5964L15.4937 36.8541C15.462 36.9483 15.4305 37.0581 15.4305 37.168C15.4305 37.6702 15.8415 38.0626 16.3317 38.0626C16.6163 38.0626 16.8534 37.9371 17.0116 37.7487H23.3202C23.4783 37.937 23.7312 38.0626 24 38.0626C24.2688 38.0626 24.5217 37.937 24.6799 37.7487H31.0043C31.1624 37.9213 31.3995 38.0312 31.6525 38.0312C32.1585 38.0312 32.5538 37.6231 32.5538 37.1365C32.5538 37.0424 32.538 36.9639 32.5064 36.8855L35.5579 31.5963C35.969 31.5179 36.2695 31.1569 36.2695 30.7331C36.2695 30.639 36.2536 30.5448 36.222 30.4506L39.4633 24.8633C39.8743 24.7848 40.1906 24.4238 40.1906 23.9844C40.1905 23.5606 39.89 23.1996 39.4948 23.1212ZM16.0628 35.4101L13.4857 30.9686H16.0628V35.4101ZM16.0628 30.4977H13.4857C13.4699 30.4349 13.4382 30.3722 13.4066 30.3094L16.0628 27.5314V30.4977ZM16.0628 26.8408L13.0904 29.9641C13.0113 29.9327 12.9322 29.8856 12.8532 29.8699L9.56458 24.2198C9.59616 24.1413 9.59616 24.0628 9.59616 23.9844C9.59616 23.9059 9.59616 23.8431 9.58034 23.7803L12.6477 18.5069C12.8059 18.4912 12.9639 18.4441 13.1062 18.3499L16.0629 21.3947V26.8408H16.0628ZM16.0628 20.8454L13.3592 18.0674C13.4382 17.9419 13.4857 17.785 13.4857 17.6123C13.4857 17.5966 13.4699 17.5652 13.4699 17.5495L16.0628 16.6235V20.8454ZM16.0628 16.1213L13.4857 17.0473L16.0628 12.6213V16.1213ZM35.3365 18.4127L35.384 18.4912L33.2969 28.2847L29.5339 24.3454L35.3207 18.397L35.3365 18.4127ZM24.2214 29.8071L24.9012 30.4977H23.5573L24.2214 29.8071ZM24.2055 29.1479L19.2883 24.1413L23.9842 19.1975L28.8856 24.3296L24.2055 29.1479ZM24.5217 29.4932L29.2018 24.6749L33.1862 28.8497L32.8384 30.4977H25.5178L24.5217 29.4932ZM31.2257 11.6012C31.2889 11.6326 31.3521 11.664 31.4312 11.6797L34.8464 17.5809V17.6123C34.8464 17.785 34.8938 17.9419 34.9729 18.0674L29.2176 24.0001L24.3163 18.8679L31.2257 11.6012ZM30.6881 11.4756L23.9842 18.5226L20.6164 14.9913L30.435 11.4756H30.6881ZM23.3992 11.4756C23.5572 11.6326 23.7628 11.7267 24 11.7267C24.2372 11.7267 24.4427 11.6326 24.6008 11.4756H29.0279L20.2686 14.6146L17.2645 11.4756H23.3992ZM16.5372 11.8052L16.6005 11.6797C16.6538 11.6662 16.7066 11.6505 16.7586 11.6326L19.7785 14.7873L16.5372 15.9487V11.8052ZM16.5372 16.4509L20.1263 15.1639L23.6521 18.8679L18.9563 23.796L16.5372 21.332V16.4509ZM16.5372 21.8813L18.6875 24.0942L16.5372 26.3386V21.8813ZM16.5372 27.0292L19.0195 24.4239L23.9051 29.4619L22.8932 30.4977H16.5372V27.0292ZM16.9483 36.5245C16.8534 36.4303 16.7428 36.3676 16.6005 36.3204L16.5372 36.2263V30.9686H22.4347L17.0273 36.5245H16.9483ZM24.6167 36.5245C24.4585 36.3833 24.2372 36.2734 24 36.2734C23.7628 36.2734 23.5415 36.3833 23.3833 36.5245H17.6913L23.0987 30.9686H25.3597L30.7671 36.5245H24.6167ZM31.7 35.8339L31.447 36.2733C31.368 36.289 31.3047 36.3204 31.2415 36.3518L25.9764 30.9685H32.7278L31.7 35.8339ZM32.4589 34.5312L33.2178 30.9686H34.5143L32.4589 34.5312ZM34.5143 30.4977H33.3127L33.5814 29.2579L34.5934 30.3251C34.5618 30.3721 34.5301 30.4349 34.5143 30.4977ZM38.4197 24.2041L35.1467 29.8699C35.0677 29.9013 34.9886 29.9327 34.9096 29.9797L33.6921 28.6928L35.7318 19.0876L38.4354 23.7333C38.4197 23.8117 38.388 23.8902 38.388 23.9844C38.388 24.0628 38.4038 24.1256 38.4197 24.2041Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_266_3030">
              <rect
                width="34"
                height="30"
                fill="white"
                transform="translate(7 9)"
              />
            </clipPath>
          </defs>
        </svg>
      );
      break;
    case "PiNews":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#3283CA" />
          <g clipPath="url(#clip0_266_1850)">
            <path
              d="M16.75 15.125C16.75 13.4014 18.1402 12 19.85 12H36.9C38.6098 12 40 13.4014 40 15.125V29.1875C40 30.9111 38.6098 32.3125 36.9 32.3125H25.3137C24.7422 31.0674 23.8655 29.9932 22.7756 29.1875H27.6V27.625C27.6 26.7607 28.2927 26.0625 29.15 26.0625H32.25C33.1073 26.0625 33.8 26.7607 33.8 27.625V29.1875H36.9V15.125H19.85V17.5225C18.9394 16.9902 17.8786 16.6875 16.75 16.6875V15.125ZM16.75 27.625C14.1828 27.625 12.1 25.5254 12.1 22.9375C12.1 20.3496 14.1828 18.25 16.75 18.25C19.3172 18.25 21.4 20.3496 21.4 22.9375C21.4 25.5254 19.3172 27.625 16.75 27.625ZM15.4567 29.1875H18.0384C21.6083 29.1875 24.5 32.1025 24.5 35.6963C24.5 36.4141 23.9236 37 23.2067 37H10.2933C9.57641 37 9 36.4189 9 35.6963C9 32.1025 11.8917 29.1875 15.4567 29.1875Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_266_1850">
              <rect
                width="31"
                height="25"
                fill="white"
                transform="translate(9 12)"
              />
            </clipPath>
          </defs>
        </svg>
      );
      break;
    case "PiCast":
      menu = (
        <svg
          className="h-4 w-4 md:h-12 md:w-12"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" rx="8" fill="#3283CA" />
          <g clipPath="url(#clip0_266_1850)">
            <path
              d="M16.75 15.125C16.75 13.4014 18.1402 12 19.85 12H36.9C38.6098 12 40 13.4014 40 15.125V29.1875C40 30.9111 38.6098 32.3125 36.9 32.3125H25.3137C24.7422 31.0674 23.8655 29.9932 22.7756 29.1875H27.6V27.625C27.6 26.7607 28.2927 26.0625 29.15 26.0625H32.25C33.1073 26.0625 33.8 26.7607 33.8 27.625V29.1875H36.9V15.125H19.85V17.5225C18.9394 16.9902 17.8786 16.6875 16.75 16.6875V15.125ZM16.75 27.625C14.1828 27.625 12.1 25.5254 12.1 22.9375C12.1 20.3496 14.1828 18.25 16.75 18.25C19.3172 18.25 21.4 20.3496 21.4 22.9375C21.4 25.5254 19.3172 27.625 16.75 27.625ZM15.4567 29.1875H18.0384C21.6083 29.1875 24.5 32.1025 24.5 35.6963C24.5 36.4141 23.9236 37 23.2067 37H10.2933C9.57641 37 9 36.4189 9 35.6963C9 32.1025 11.8917 29.1875 15.4567 29.1875Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_266_1850">
              <rect
                width="31"
                height="25"
                fill="white"
                transform="translate(9 12)"
              />
            </clipPath>
          </defs>
        </svg>
      );
      break;
    default:
      menu = <></>;
  }
  return menu;
}
