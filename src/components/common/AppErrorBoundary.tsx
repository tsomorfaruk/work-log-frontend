import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/button";

function FallbackUI({ resetErrorBoundary }: any) {
  const navigate = useNavigate();

  return (
    <div className="p-10">
      <h2 className="text-2xl xl:text-3xl font-bold text-red-600 text-center mb-12">
        There's an error occurred 🙁
      </h2>

      <div className="flex gap-6 items-center justify-center">
        <Button variant="primary" onClick={resetErrorBoundary}>
          Try again
        </Button>

        <Button
          variant="neutral"
          onClick={() => {
            resetErrorBoundary(); // 🔑 important
            navigate("/");
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}

export default function AppErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={FallbackUI}
      resetKeys={[location.pathname]} // 🔥 auto reset on route change
      onError={(error, info) => {
        console.error("Error caught:", error, info);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
