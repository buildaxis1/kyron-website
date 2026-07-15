"use client";

import { useState } from "react";
import { Check, Info, X } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "disabled";
}
const PricingPage: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState<boolean>(true);

  const pricingPlans: PricingPlan[] = [
    {
      id: "free",
      name: "Free",
      description:
        "Upgrade your spreadsheets: import data easily, then analyze it with AI.",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      features: [
        "AI Analyst Limited",
        "Data Tables Import Manually",
        "Cell enrichment Limited",
        "Up to 3 guests",
      ],
      isCurrent: true,
      buttonText: "Current Plan",
      buttonVariant: "disabled",
    },
    {
      id: "plus",
      name: "Plus",
      description: "Master your data with unlimited AI and automated imports.",
      monthlyPrice: "$8/month per user",
      yearlyPrice: "$6/month per user",
      features: [
        "AI Analyst Unlimited",
        "Data Tables Automate per day",
        "Cell enrichment 100k",
        "Up to 10 guests",
        "White-labeled embed",
      ],
      isPopular: true,
      buttonText: "Select Plan",
      buttonVariant: "primary",
    },
    {
      id: "pro",
      name: "Pro",
      description:
        "Get data even faster and share spreadsheets with more people.",
      monthlyPrice: "$79/month + $8/month per user",
      yearlyPrice: "$59/month + $6/month per user",
      features: [
        "Everything in Plus",
        "Data Tables Automate per min",
        "Cell enrichment 1 million",
        "Up to 200 guests",
        "Video support",
      ],
      buttonText: "Select Plan",
      buttonVariant: "primary",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Data and APIs for custom business workflows.",
      monthlyPrice: "—",
      yearlyPrice: "—",
      features: [
        "Advanced API endpoints",
        "Custom AI models, functions and Integrations",
        "High-volume usage",
        "Custom themes and designs",
        "SAML SSO",
        "Dedicated CS Manager",
      ],
      buttonText: "Send us an email",
      buttonVariant: "secondary",
    },
  ];

  const getButtonClasses = (variant: PricingPlan["buttonVariant"]): string => {
    const baseClasses =
      "w-full px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    switch (variant) {
      case "primary":
        return `${baseClasses} whitespace-nowrap rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.12),4px_0_6px_-1px_rgba(0,0,0,0.3)] hover:bg-blue-800 sm:px-6 sm:text-base`;
      case "secondary":
        return `${baseClasses} whitespace-nowrap rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),0_10px_10px_-5px_rgba(0,0,0,0.12),4px_0_6px_-1px_rgba(0,0,0,0.3)] hover:bg-blue-800 sm:px-6 sm:text-base`;
      case "disabled":
        return `${baseClasses} bg-gray-200 text-gray-500 cursor-not-allowed`;
      default:
        return baseClasses;
    }
  };

  return (
    <>
      <section
        id="pricing"
        className="flowing-lines relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[50px] md:pt-[60px] xl:pb-[80px] xl:pt-[90px] 2xl:pb-[110px] 2xl:pt-[120px]"
        data-oid="jyx8lds"
      >
        <div className="container relative z-10" data-oid="pmx41r2">
          {/* Main Content */}
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Title and Billing Toggle */}
            <div className="mb-12 text-center">
              <h1 className="mb-8 text-3xl font-bold text-gray-900">
                Select a Plan for Kyron Medical
              </h1>

              {/* Billing Toggle */}
              <div
                className="flex items-center justify-center space-x-4"
                role="group"
                aria-label="Billing period selection"
              >
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`rounded-full px-6 py-2 font-medium transition-all duration-200 ${
                    isMonthly
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-pressed={isMonthly}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`rounded-full px-6 py-2 font-medium transition-all duration-200 ${
                    !isMonthly
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  aria-pressed={!isMonthly}
                >
                  Annually <span className="text-red-500">-25%</span>
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-xl border-2 bg-white p-6 transition-all duration-200 hover:shadow-lg ${
                    plan.isPopular
                      ? "border-purple-500 shadow-lg"
                      : "border-gray-200"
                  } ${plan.isCurrent ? "ring-2 ring-gray-300" : ""}`}
                >
                  {/* Popular Badge */}
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                      <span className="rounded-full bg-purple-500 px-3 py-1 text-xs font-medium text-white">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                      {plan.description}
                    </p>
                    <div className="text-2xl font-bold text-gray-900">
                      {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                          {feature.includes("guests") && (
                            <Info className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`${getButtonClasses(plan.buttonVariant)} mt-8`}
                    disabled={plan.buttonVariant === "disabled"}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-500">
                * Our fair use policy includes up to 1,000,000 Integration Tasks
                and 10,000 AI Analyst prompts.
              </p>
              <div className="flex justify-center space-x-4 text-sm">
                <a
                  href="#"
                  className="text-blue-600 transition-colors hover:text-blue-800"
                >
                  Compare our plans in detail
                </a>
                <span className="text-gray-400">•</span>
                <a
                  href="mailto:sales@kyronmedical.com"
                  className="text-blue-600 transition-colors hover:text-blue-800"
                >
                  reach out to sales@kyronmedical.com for help
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
