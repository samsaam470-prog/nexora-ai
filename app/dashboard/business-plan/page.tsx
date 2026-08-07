"use client";

import { useMemo, useState } from "react";

const industries = [
  "restaurant",
  "saas",
  "ecommerce",
  "clothing",
  "fitness",
  "real_estate",
  "digital_agency",
  "consulting",
  "education",
  "mobile_app",
  "marketplace",
  "ai_startup",
  "healthcare",
  "beauty",
  "travel",
  "finance",
  "gaming",
  "content_creator",
  "podcast",
  "delivery",
  "manufacturing",
  "agriculture",
  "automotive",
  "clean_energy",
  "events",
  "legal",
  "insurance",
  "pet_business",
  "subscription_box",
  "freelancing",
  "crypto_web3",
  "cybersecurity",
  "cloud_services",
  "software_development",
  "hr_recruitment",
  "logistics",
  "fashion_accessories",
  "food_delivery",
  "bakery",
  "coffee_shop",
  "online_coaching",
  "newsletter",
  "affiliate_marketing",
  "dropshipping",
  "printing",
  "photography",
  "video_production",
  "interior_design",
  "construction",
  "architecture",
  "home_services",
  "security_services",
  "education_tutoring",
  "language_learning",
  "virtual_assistant",
  "data_analytics",
  "robotics",
  "three_d_printing",
  "gaming_studio",
  "music_business",
  "biotech",
  "pharmaceuticals",
  "medical_devices",
  "telemedicine",
  "mental_health",
  "wellness",
  "nutrition",
  "organic_food",
  "sports_equipment",
  "outdoor_adventure",
  "marine_services",
  "aviation",
  "space_tech",
  "defense",
  "government_services",
  "nonprofit",
  "social_enterprise",
  "cultural_arts",
  "performing_arts",
  "media_agency",
  "pr_agency",
  "market_research",
  "business_intelligence",
  "crm_solutions",
  "erp_solutions",
  "it_consulting",
  "managed_services",
  "data_center",
  "network_services",
  "telecom",
  "electronics",
  "home_appliances",
  "furniture",
  "luxury_goods",
  "jewelry",
  "footwear",
  "watches",
  "toy_business",
  "stationery",
  "packaging",
  "recycling",
  "waste_management",
  "water_services",
  "hvac_services",
  "electrical_services",
  "plumbing_services",
  "landscaping",
  "pest_control",
  "janitorial_services",
  "facility_management",
  "property_management",
  "mortgage_broker",
  "accounting_firm",
  "wealth_management",
  "venture_capital",
  "private_equity",
  "family_office",
];

const popularIndustries = [
  "saas",
  "ecommerce",
  "fitness",
  "restaurant",
  "real_estate",
  "ai_startup",
  "healthcare",
  "mobile_app",
  "consulting",
  "digital_agency",
  "education",
  "finance",
];

function formatIndustryName(industry: string) {
  return industry
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BusinessPlanPage() {
  const [idea, setIdea] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const filteredIndustries = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return industries;
    }

    return industries.filter((industry) =>
      formatIndustryName(industry)
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const visibleIndustries = showAll
    ? filteredIndustries
    : filteredIndustries.slice(0, 24);

  function selectIndustry(industry: string) {
    setIndustryId(industry);
    setShowCustom(false);
    setCustomIndustry("");
    setError("");
  }

  function selectCustomIndustry() {
    setIndustryId("custom");
    setShowCustom(true);
    setError("");
  }

  async function generatePlan() {
    setError("");
    setPlan("");

    if (!idea.trim()) {
      setError("Please enter your business idea.");
      return;
    }

    if (!industryId) {
      setError("Please select an industry.");
      return;
    }

    if (industryId === "custom" && !customIndustry.trim()) {
      setError("Please enter your custom industry.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: idea.trim(),
          industryId:
            industryId === "custom"
              ? customIndustry.trim()
              : industryId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate business plan."
        );
      }

      setPlan(data.plan || "");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating the plan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-blue-400">
            NEXORA AI
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            AI Business Plan Generator 🚀
          </h1>

          <p className="mt-3 max-w-2xl text-white/60">
            Tell Nexora your business idea, choose an industry, and
            generate a practical business plan using its industry
            knowledge.
          </p>
        </div>

        {/* Business Idea */}
        <section className="mb-8">
          <label className="mb-3 block text-lg font-semibold">
            1. What's your business idea?
          </label>

          <textarea
            className="h-40 w-full rounded-2xl border border-white/10 bg-white/5 p-5 outline-none transition placeholder:text-white/30 focus:border-blue-500/60"
            placeholder="Example: An AI fitness app that creates personalized workouts for university students..."
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
          />
        </section>

        {/* Industry */}
        <section className="mb-8">
          <div className="mb-4">
            <label className="text-lg font-semibold">
              2. Choose your industry
            </label>

            <p className="mt-1 text-sm text-white/50">
              Select the industry that best matches your business.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <input
              type="text"
              placeholder="Search 117 industries..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(true);
              }}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-blue-500/60"
            />
          </div>

          {/* Popular */}
          {!search && (
            <div className="mb-7">
              <h3 className="mb-3 text-sm font-semibold text-white/70">
                Popular industries
              </h3>

              <div className="flex flex-wrap gap-3">
                {popularIndustries.map((industry) => {
                  const selected = industryId === industry;

                  return (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => selectIndustry(industry)}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        selected
                          ? "border-blue-500 bg-blue-500/20 text-blue-300"
                          : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
                      }`}
                    >
                      {formatIndustryName(industry)}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All industries */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white/70">
                {search ? "Search results" : "All industries"}
              </h3>

              {!search && (
                <span className="text-xs text-white/40">
                  {industries.length} industries
                </span>
              )}
            </div>

            {visibleIndustries.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {visibleIndustries.map((industry) => {
                  const selected = industryId === industry;

                  return (
                    <button
                      key={industry}
                      type="button"
                      onClick={() => selectIndustry(industry)}
                      className={`min-h-[58px] rounded-xl border px-3 py-3 text-sm transition ${
                        selected
                          ? "border-blue-500 bg-blue-500/20 text-blue-300"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {formatIndustryName(industry)}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="text-white/60">
                  No matching industry found.
                </p>

                <button
                  type="button"
                  onClick={selectCustomIndustry}
                  className="mt-3 text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  Use a custom industry →
                </button>
              </div>
            )}

            {!search &&
              filteredIndustries.length > 24 && (
                <button
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                  className="mt-5 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  {showAll
                    ? "Show fewer industries"
                    : `Show all ${industries.length} industries`}
                </button>
              )}
          </div>

          {/* Custom industry */}
          <div className="mt-6">
            <button
              type="button"
              onClick={selectCustomIndustry}
              className={`w-full rounded-2xl border p-5 text-left transition ${
                industryId === "custom"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">✏️</span>

                <div>
                  <h3 className="font-semibold">
                    My industry isn't listed
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    Enter a custom industry and Nexora will use it
                    as the focus of your plan.
                  </p>
                </div>
              </div>
            </button>

            {showCustom && (
              <div className="mt-3">
                <input
                  type="text"
                  value={customIndustry}
                  onChange={(e) =>
                    setCustomIndustry(e.target.value)
                  }
                  placeholder="Example: Drone photography for real estate"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition placeholder:text-white/30 focus:border-blue-500/60"
                />

                <p className="mt-2 text-xs text-white/40">
                  Custom industries will be handled separately from
                  the built-in industry knowledge.
                </p>
              </div>
            )}
          </div>

          {/* Selected industry */}
          {industryId && (
            <div className="mt-5 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
              <p className="text-xs uppercase tracking-wide text-blue-400">
                Selected industry
              </p>

              <p className="mt-1 font-semibold">
                {industryId === "custom"
                  ? customIndustry || "Custom industry"
                  : formatIndustryName(industryId)}
              </p>
            </div>
          )}
        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Generate */}
        <button
          type="button"
          onClick={generatePlan}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-7 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Nexora is building your plan..."
            : "Generate Business Plan 🚀"}
        </button>

        {/* Result */}
        {plan && (
          <section className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                Your Business Plan
              </h2>

              <p className="mt-1 text-sm text-white/50">
                Generated using Nexora's current knowledge system.
              </p>
            </div>

            <div className="whitespace-pre-line rounded-2xl border border-white/10 bg-white/5 p-6 leading-7 text-white/80">
              {plan}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}