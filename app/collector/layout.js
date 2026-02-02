import { RouteProvider } from "../context/RouteContext";

export default function CollectorLayout({ children }) {
  return <RouteProvider>{children}</RouteProvider>;
}
