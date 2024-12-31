type Props = {
  center?: boolean;
  classNames?: string;
};

export const Spinner = ({ center, classNames }: Props) => {
  return (
    <div className={center ? "flex justify-center" : ""}>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #3498db; /* Blue */
          border-radius: 50%;
          width: 40px; /* Ukuran spinner */
          height: 40px; /* Ukuran spinner */
          animation: spin 1s linear infinite; /* Animasi berputar */
          display: flex; /* Flexbox untuk pusat konten */
          align-items: center; /* Pusat vertikal */
          justify-content: center; /* Pusat horizontal */
          margin: 0 auto; /* Margin auto untuk pusat di dalam div */
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div className={`loader ${classNames}`}>
      </div>
    </div>
  );
};

export default Spinner;
