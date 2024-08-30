"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import { TbCreditCard } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";

const steps = [
  { label: "Detail", icon: "/img/seperatorBtn1.png", path: "/checkout" },
  { label: "Payment Method", icon: "/img/seperatorBtn4.png", path: "/payment" },
  { label: "Review", icon: LuClipboardList, path: "/review" },
];

const Steper = () => {
  const path = usePathname();
  const [active, setActive] = React.useState("");

  React.useEffect(() => {
    if (path === "/checkout" || path === "/payment") {
      setActive(path);
    }
  }, [path]);

  return (
    <div className="flex justify-between w-full ml-[10vw] gap-5 md:gap-[150px] md:max-w-[90%] lg:max-w-[70%] relative overflow-hidden">
      <span className="border-gray-200 border-dashed border-t absolute w-[90vw] z-[0] top-5 right-[6px]"></span>
      {steps.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-2 z-10">
          <span
            className={`p-2 rounded-full ${
              active === "/checkout" || active === "/payment"
                ? "bg-white text-[#171717]"
                : "bg-white text-[#171717]"
            } ${typeof item.icon !== "string" ? "border border-[#D4D4D4]" : ""}`}
          >
            {typeof item.icon === "string" ? (
              <img src={item.icon} alt={item.label} className="w-10 h-10" />
            ) : (
              <item.icon size={20} />
            )}
          </span>
          <span className="text-sm font-semibold text-center">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Steper;
