export default function SocialLink() {
  return (
    <div className="flex gap-1">
      <a
        href="https://www.instagram.com/pinvest_id/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="m-1 rounded-lg ring-gray-100 hover:ring-2"
          src="/assets/icon/instagram.svg"
          alt="instagram"
          width={40}
          height={40}
        />
      </a>
      <a
        href="https://linkedin.com/in/pinvestindonesia"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="m-1 rounded-lg ring-gray-100 hover:ring-2"
          src="/assets/icon/linkedin.svg"
          alt="linkedin"
        />
      </a>
      <a
        href="https://www.facebook.com/pinvest.co.id"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="m-1 rounded-lg ring-gray-100 hover:ring-2"
          src="/assets/icon/facebook.svg"
          alt="facebook"
        />
      </a>
      <a href="https://twitter.com/pinvest_id" target="_blank" rel="noreferrer">
        <img
          className="m-1 h-10 w-10 rounded-lg bg-white ring-gray-100 hover:ring-2"
          src="/assets/icon/twitter.png"
          alt="twitter"
        />
      </a>
      <a
        href="https://www.youtube.com/@PinvestIndonesia"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="m-1 rounded-lg ring-gray-100 hover:ring-2"
          src="/assets/icon/youtube.svg"
          alt="youtube"
        />
      </a>
      <a
        href="https://open.spotify.com/playlist/7nYDx1YE3eAqvZKWXftd9m"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="m-1 rounded-lg ring-gray-100 hover:ring-2"
          src="/assets/icon/spotify.svg"
          alt="spotify"
        />
      </a>
      <a
        href="https://www.threads.net/@pinvest_id"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="m-1 h-10 w-10 rounded-lg bg-white ring-gray-100 hover:ring-2"
          src="/assets/icon/threads.png"
          alt="threads"
        />
      </a>
    </div>
  );
}
