import Typewriter from "typewriter-effect";
import { HTMLAttributes } from "react";

const Typing = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Typewriter
      options={{
        strings: [
          "denial management.",
          "finding lost revenue.",
          "appeals.",
          "calling insurance.",
          "everything else.",
        ],

        autoStart: true,
        loop: true,
        delay: 20,
        deleteSpeed: 10,
      }}
      {...props}
    />
  );
};

export default Typing;
