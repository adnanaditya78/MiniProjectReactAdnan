import Button from "./Button";

export default function LimitedAccess() {
  return (
    <div className="flex items-center min-h-[60vh]">
      <div className="border rounded-md p-4 flex flex-col justify-center items-center w-full min-h-[500px] bg-white">
        <img
          src="/warning.png"
          alt="warning"
          className="aspect-square w-[120px]"
        />
        <h1 className="text-2xl font-bold text-center mt-8 mb-4">
          You must be logged in to access this page!
        </h1>
        <div className="flex items-center gap-3">
          <Button to="/login">Login</Button>
          <Button to="/register" variant="primary-outlined">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}
