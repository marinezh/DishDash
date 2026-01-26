import { useEffect, useState } from "react";
import { status } from "./api/api";

export default function App() {
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    status().then((data) => setStatusMsg(data.status));
  }, []);

  return <div>{statusMsg || "Loading..."}</div>;
}
