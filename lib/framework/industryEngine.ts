import { industries } from "@/lib/industries/industries";

export function detectIndustry(idea: string) {
  const text = idea.toLowerCase();

  let bestMatch = null;
  let highestScore = 0;

  for (const industry of industries) {
    let score = 0;

    for (const keyword of industry.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        score++;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = industry;
    }
  }

  return (
    bestMatch || {
      id: "general",
      name: "General Business",
      focus: [
        "customers",
        "marketing",
        "revenue",
        "growth"
      ]
    }
  );
}