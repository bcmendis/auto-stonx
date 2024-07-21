import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin stroke-orange-500" />
    </div>
  );
};

export default Loader;
