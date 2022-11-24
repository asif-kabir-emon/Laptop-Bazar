import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Laptop Bazar - ${title}`;
  }, [title]);
};

export default useTitle;
