"use client";

import Breadcrumb from "@/app/_components/Common/Breadcrumb";

import resourcesData from "../data/resource-data";
import { FaFilePdf } from "react-icons/fa6";
import { useState } from "react";
import ResourceModal from "../_components/ui/resource-modal";

const Whitepapers = () => {
  // Add state for the modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    url: "",
    title: "",
  });

  const whitepapersData = resourcesData.filter((resource) => {
    return resource.resourceType === "Whitepaper";
  });
  return (
    <>
      <Breadcrumb
        pageName="Whitepapers"
        description="Explore the latest healthcare technology trends, insights, and best practices to transform your practice and improve patient outcomes."
        data-oid="azbhgw:"
      />

      <section className="pb-[120px] pt-[120px]" data-oid="t:el:qy">
        <div className="container" data-oid=":1j4mnz">
          {/* Make a grid of whitepapers, 3 col  */}
          <div
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
            data-oid="zi5woxc"
          >
            {whitepapersData.map((whitepaper) => (
              <div
                key={whitepaper.id}
                className="group relative overflow-hidden rounded-xl bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                data-oid=".uxmoll"
              >
                {/* PDF icon */}
                <div className="overflow-hidden pl-8 pt-8" data-oid="b.6.s_p">
                  <FaFilePdf
                    className="text-2xl text-blue-500"
                    data-oid="99ibxa4"
                  />
                </div>

                <div className="flex h-full flex-col p-6" data-oid="svhxz5g">
                  <h3
                    className="mb-4 line-clamp-1 text-xl font-bold text-gray-900 dark:text-white "
                    data-oid="imn9q1t"
                  >
                    {whitepaper.title}
                  </h3>

                  <div className="min-h-[4.5rem]" data-oid="i61qgia">
                    <p
                      className="line-clamp-3 text-lg text-gray-600 dark:text-gray-300"
                      data-oid="ht.4gle"
                    >
                      {whitepaper.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-4" data-oid="u3nbpvf">
                    <hr className="mb-4" data-oid="v9cdj:j" />
                    <button
                      onClick={() => {
                        setCurrentResource({
                          url: whitepaper.link,
                          title: whitepaper.title,
                        });
                        setModalOpen(true);
                      }}
                      className="inline-block rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      data-oid="zf3cd5e"
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
              data-oid=".cpgp9p"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Whitepapers;
