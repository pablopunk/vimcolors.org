export const Line = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <pre className={className}>
      <code>{children ? children : <br />}</code>
    </pre>
  );
};
