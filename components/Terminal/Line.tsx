export const Line = ({ children }: { children?: React.ReactNode }) => {
  return (
    <pre>
      <code>{children ? children : <br />}</code>
    </pre>
  );
};
