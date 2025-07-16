import { Marquee } from "@/components/ui/marquee";
import { GithubIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const MarqueeComponent = () => {
  const arr = [
    { logo: GithubIcon, name: "LinkedIn" },
    { logo: InstagramIcon, name: "Instagram" },
    { logo: TwitterIcon, name: "X" },
  ];

  return (
    <Marquee>
      {arr.map(({ logo: Logo, name }, index) => (
        <div
          key={index}
          className="relative h-full w-fit mx-12 flex items-center justify-center text-2xl font-bold text-neutral-500 dark:text-neutral-400"
        >
          <Logo />
          <span className="ml-2">{name}</span>
        </div>
      ))}
    </Marquee>
  );
};

export default MarqueeComponent;
