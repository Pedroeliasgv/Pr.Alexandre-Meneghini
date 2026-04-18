import { useEffect } from "react";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor") as HTMLElement;
    const cursorDot = document.querySelector(".custom-cursor-dot") as HTMLElement;

    const move = (e: MouseEvent) => {
      if (cursor && cursorDot) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        cursorDot.style.left = e.clientX + "px";
        cursorDot.style.top = e.clientY + "px";
      }
    };

    const addActive = () => cursor?.classList.add("active");
    const removeActive = () => cursor?.classList.remove("active");

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", addActive);
    window.addEventListener("mouseup", removeActive);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", addActive);
      window.removeEventListener("mouseup", removeActive);
    };
  }, []);

  return (
    <>
      <div className="custom-cursor" />
      <div className="custom-cursor-dot" />
    </>
  );
};

export default Cursor;