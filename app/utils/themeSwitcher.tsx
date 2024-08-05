"use client";
import { FC, useState, useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

type ThemeSwitcherProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon
          className="cursor-pointer"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className="cursor-pointer"
          size={25}
          fill="white"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};
