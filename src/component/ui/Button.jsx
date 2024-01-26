export default function Button({ className, children, ...props }) {
  return (
    <button
      {...props}
      className={`rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold ${className}`}
    >
      {children}
    </button>
  );
}
