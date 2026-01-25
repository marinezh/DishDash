export async function status() {
  const res = await fetch("http://localhost:8080/health");
  return res.json();
}