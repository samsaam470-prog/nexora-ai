import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Start building your business ideas with AI.",
    features: [
      "5 AI generations per day",
      "Business Plan Generator",
      "Website Blueprint",
      "Basic Content Ideas",
    ],
    popular: false,
    available: true,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For creators, founders, and growing businesses.",
    features: [
      "Unlimited AI generations",
      "30-Day Social Media Planner",
      "Marketing Strategy Generator",
      "Priority Support",
    ],
    popular: true,
    available: false,
  },
  {
    name: "Business",
    price: "$49",
    description: "For teams, agencies, and serious growth.",
    features: [
      "Everything in Pro",
      "Team Workspace",
      "Client Projects",
      "Advanced AI Features",
    ],
    popular: false,
    available: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Plans that grow with you
        </h2>

        <p className="mt-4 text-gray-400">
          Start free. Upgrade when your business grows.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 ${
              plan.popular
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 bg-white/5"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold">
                Most Popular
              </span>
            )}

            <h3 className="text-2xl font-bold">{plan.name}</h3>

            <div className="mt-4 text-5xl font-extrabold">
              {plan.price}
              <span className="text-lg font-normal text-gray-400">
                /month
              </span>
            </div>

            <p className="mt-4 min-h-[48px] text-gray-400">
              {plan.description}
            </p>

            <ul className="mt-8 space-y-3 text-left text-gray-300">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {plan.available ? (
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="mt-8 w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 py-3 font-semibold text-gray-500"
              >
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}