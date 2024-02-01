export function Footer() {
  const year = new Date().getFullYear();

  return (
    <small style={{ padding: "10px 0", textAlign: "center" }}>
      Dots &copy; {year}, All Rights Reserved
    </small>
  );
}
