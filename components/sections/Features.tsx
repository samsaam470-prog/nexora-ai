import { Globe, FileText, Megaphone, Rocket } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Website Blueprint",
    description: "Generate complete website structures, pages, and layouts for your business.",
  },
  {
    icon: FileText,
    title: "Business Plan",
    description: "Create investor-ready business plans in minutes with AI.",
  },
  {
    icon: Megaphone,
    title: "30-Day Content Planner",
    description: "Generate social media content calendars tailored to your business.",
  },
  {
    icon: Rocket,
    title: "Launch Roadmap",
    description: "Receive a step-by-step action plan to launch and grow your business.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold">Powerful AI Tools</h2>
        <p className="mt-4 text-gray-400">
          Everything you need to build and grow your business in one platform.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-blue-500 hover:bg-white/10"
            >
              <Icon className="mb-5 h-10 w-10 text-blue-500" />

              <h3 className="mb-3 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}