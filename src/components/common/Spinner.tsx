const Spinner = ({ size = 24 }: { size?: number }) => {
  return (
    <div
      className="inline-block animate-spin rounded-full border-2 border-current border-t-transparent"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  );
};

export default Spinner;
