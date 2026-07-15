"use client";

import { useState, useEffect } from "react";
import FileUploadBox from "./FileUpload";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

// Define type for API response
interface AppealResponse {
  appeal_letter: string;
}

// Define error response type
interface ErrorResponse {
  error: string;
}

const DemoForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");

  const [patientNotesFile, setPatientNotesFile] = useState<File | null>(null);
  const [insuranceDenialFile, setInsuranceDenialFile] = useState<File | null>(
    null,
  );

  const [appealLetter, setAppealLetter] = useState<string>("");
  // New state to check if textarea is filled
  const [isTextareaFilled, setIsTextareaFilled] = useState<boolean>(false);
  const [isEmailFilled, setIsEmailFilled] = useState<boolean>(false);
  const [isSubjectFilled, setIsSubjectFilled] = useState<boolean>(false);

  useEffect(() => {
    if (appealLetter.trim().length > 0) {
      setIsTextareaFilled(true);
    } else {
      setIsTextareaFilled(false);
    }
  }, [appealLetter]);

  useEffect(() => {
    setIsEmailFilled(email.trim() !== "");
  }, [email]);

  useEffect(() => {
    setIsSubjectFilled(subject.trim() !== "");
  }, [subject]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!patientNotesFile || !insuranceDenialFile) {
      alert("Please upload both Patient Note(s) and Insurance Denial files.");
      return;
    }

    // External API disabled in this build — no network request is made.
    setAppealLetter(
      "This is a demo build. Appeal-letter generation is disabled and no " +
        "external request was sent.",
    );
    toast.info("Demo build — appeal generation is disabled (no external calls).");
  };

  return (
    <>
      <div className="container" data-oid="hru.anr">
        <div
            className="mx-4 mt-32 flex flex-col flex-wrap items-center justify-center gap-8 align-middle"
            data-oid="uxbamok"
          >
            <div className="flex flex-row gap-8" data-oid="fwday0o">
              <FileUploadBox
                label="Patient Note(s)"
                onFileChange={(file) => setPatientNotesFile(file)}
                data-oid="z-4qcec"
              />

              <FileUploadBox
                label="Insurance Denial"
                onFileChange={(file) => setInsuranceDenialFile(file)}
                data-oid="4xfem1l"
              />
            </div>

            <button
              type="button"
              className={`rounded-sm px-9 py-4 text-base font-medium shadow-submit duration-300 ${
                patientNotesFile && insuranceDenialFile
                  ? "bg-primary text-white hover:bg-primary/90 dark:shadow-submit-dark"
                  : "cursor-not-allowed bg-gray-300 text-gray-700"
              }`}
              onClick={handleSubmit}
              disabled={!patientNotesFile || !insuranceDenialFile}
              data-oid="7jsxlvo"
            >
              Generate Letter of Appeal
            </button>

            {isTextareaFilled && (
              <div className="w-full px-4 md:w-1/2" data-oid="g9s0-ow">
                <div className="mb-8" data-oid="oq.a-eb">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    data-oid="7gn9xc7"
                  >
                    Recipient&apos;s Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter recipient's email"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    data-oid="t:vseaz"
                  />
                </div>
                <div className="mb-8" data-oid="enhpkju">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    data-oid=":o546h2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter subject"
                    className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    data-oid="x-xrwda"
                  />
                </div>
                {/* Updated Textarea Container */}
                <div className="w-full max-w-3xl" data-oid="s.co5a0">
                  {" "}
                  {/* Increased max-width */}
                  {/* Letter of appeal from fetch request */}
                  <textarea
                    className="border-stroke h-96 w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                    value={appealLetter}
                    readOnly
                    rows={15} // Increased number of visible text lines
                    data-oid="f8i133j"
                  ></textarea>
                </div>

                <button
                  type="button"
                  className={`rounded-sm px-9 py-4 text-base font-medium shadow-submit duration-300 ${
                    isEmailFilled && isSubjectFilled
                      ? "bg-primary text-white hover:bg-primary/90 dark:shadow-submit-dark"
                      : "cursor-not-allowed bg-gray-300 text-gray-700"
                  }`}
                  onClick={handleSubmit}
                  disabled={!isEmailFilled || !isSubjectFilled}
                  data-oid=".i273pl"
                >
                  Send Email
                </button>
              </div>
            )}
          </div>
      </div>
    </>
  );
};

export default DemoForm;
