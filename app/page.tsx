'use client'
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Landing from "./component/Landing";
import Roasting from "./component/Roasting";
import { useTheme } from "next-themes";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const currentTheme = theme ?? "light";

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Heading
        title="Github Roast"
        description="Hey this is my way of Github roast"
        keywords="github,Roast,profile"
      />
      <div className={`absolute top-0 w-full h-full transition-transform ${open ? 'translate-x-full' : 'translate-x-0'}`}>
        <Landing open={open} setOpen={setOpen} theme={currentTheme} setTheme={setTheme} />
      </div>
      <div className={`absolute top-0 w-full h-full transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <Roasting open={open} setOpen={setOpen} theme={currentTheme} />
      </div>
    </div>
  );
};

export default Page;
