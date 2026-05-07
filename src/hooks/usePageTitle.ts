import { useEffect } from "react";

import { useLayoutStore } from "@/store/layoutStore";

export function usePageTitle(title: string) {
  const setPageTitle = useLayoutStore((state) => state.setPageTitle);

  useEffect(() => {
    setPageTitle(title);

    return () => {
      setPageTitle("");
    };
  }, [title, setPageTitle]);
}
