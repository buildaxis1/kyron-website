import type { Metadata } from "next";
import DemoForm from "./_components/DemoForm";

export const metadata: Metadata = {
  title: "Demo | Kyron",
  description: "Demo Page for Kyron",
  // other metadata
};

const DemoPage = () => {
  return (
    <section className="pb-[120px] pt-[120px]" data-oid="atskmfs">
      <div className="container" data-oid="le9..k2">
        <DemoForm data-oid="q60eau8" />
      </div>
    </section>
  );
};

export default DemoPage;
