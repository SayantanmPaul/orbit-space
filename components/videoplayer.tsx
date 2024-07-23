import '/app/globals.css';

const Videoplayer = ({
  source,
  className
}: {
  source: string,
  className?: string
}) => {

  return (
    <>
      <video
        key={source}
        autoPlay
        loop
        muted
        playsInline
        className={`lg:w-full w-auto h-screen object-cover transition-transform  duration-500 ease-in-out ${className}`}
      >
        <source src={source} />
      </video>
    </>
  );
}

export default Videoplayer;
