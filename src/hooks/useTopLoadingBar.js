import { useRef } from "react";

export default function useTopLoadingBar() {
  const ref = useRef(null);

  const start = () => ref.current?.continuousStart();
  const complete = () => ref.current?.complete();

  return {
    ref,
    start,
    complete,
  };
}
