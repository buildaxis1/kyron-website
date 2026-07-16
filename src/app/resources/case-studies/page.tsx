"use client";

import Breadcrumb from "@/app/_components/Common/Breadcrumb";

import resourcesData from "../data/resource-data";
import { FaFilePdf } from "react-icons/fa6";
import ResourceModal from "../_components/ui/resource-modal";
import { useState } from "react";

const CaseStudies = () => {
  // Add state for the modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    url: "",
    title: "",
  });

  const caseStudiesData = resourcesData.filter((resource) => {
    return resource.resourceType === "Case Study";
  });
  return (
    <>
      <Breadcrumb
        pageName="Case Studies"
        description="Explore the latest healthcare technology trends, insights, and best practices to transform your practice and improve patient outcomes."
        data-oid="ery7.:7"
      />

      <section className="pb-[120px] pt-[120px]" data-oid="xf3:8pd">
        <div className="container" data-oid="diq3z_4">
          {/* Make a grid of whitepapers, 3 col  */}
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            data-oid="vg.3ljd"
          >
            {caseStudiesData.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/70 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#577DE8]/40 hover:shadow-lg"
                data-oid="vygdm0w"
              >
                {/* pdf file icon */}
                <div
                  className="overflow-hidden pl-8 pt-8 text-2xl text-blue-500"
                  data-oid="nsofno-"
                >
                  <FaFilePdf data-oid="4ah21to" />
                </div>
                <div className="p-6" data-oid="z4igi29">
                  <h3
                    className="mb-4 line-clamp-1 text-xl font-semibold text-foreground"
                    data-oid="-8lim3d"
                  >
                    {caseStudy.title}
                  </h3>
                  <p
                    className="line-clamp-2 text-sm leading-relaxed text-muted-foreground"
                    data-oid="k81aay4"
                  >
                    {caseStudy.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4" data-oid="g.e1qye">
                    <hr className="mb-4" data-oid="ygc27ps" />
                    <button
                      onClick={() => {
                        setCurrentResource({
                          url: caseStudy.link,
                          title: caseStudy.title,
                        });
                        setModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-[#577DE8] px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]"
                      data-oid=".1.xxs3"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add the modal at the bottom of your component */}
            <ResourceModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              resourceUrl={currentResource.url}
              resourceTitle={currentResource.title}
              data-oid="xewb0fu"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;
