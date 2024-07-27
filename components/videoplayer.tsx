import '/app/globals.css';

const Videoplayer = ({
  source,
  className,
  onLoading,
  onLoaded
}: {
  source: string,
  className?: string,
  onLoading?: () => void,
  onLoaded?: () => void
}) => {

  return (
    <>
      <video
        key={source}
        autoPlay
        loop
        muted
        playsInline
        onWaiting={onLoading}
        onLoadedData={onLoaded}
        className={`lg:w-full w-auto h-screen object-cover transition-transform  duration-500 ease-in-out ${className}`}
        
        >
        <source src={source} />
      </video>
    </>
  );
}

export default Videoplayer;
