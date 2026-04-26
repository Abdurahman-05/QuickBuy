import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="w-full lg:w-1/3 mb-4 lg:mb-0 lg:pr-8">
      <h2 className="text-md font-medium tracking-widest text-gray-700 uppercase mb-2">
        {title}
      </h2>
      <p className="text-[12px] text-gray-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
