import { businessFramework } from "./businessFramework";
import { detectIndustry } from "./industryEngine";

export function generateBusinessPlan(idea: string) {

  const industry = detectIndustry(idea);

  const plan = {
    idea,

    industry: industry.name,

    sections: businessFramework.sections.map((section) => {

      return {
        title: section,
        content: generateSection(
          section,
          industry,
          idea
        )
      };

    })
  };

  return plan;
}


function generateSection(
  section: string,
  industry: any,
  idea: string
) {

  const focus = industry.focus?.join(", ");

  const sectionContent: any = {

    businessOverview:
    `Create a business overview for ${idea} in the ${industry.name} industry.`,

    problem:
    `Identify customer problems this ${industry.name} business solves.`,

    solution:
    `Explain the solution, product, and value proposition.`,

    targetCustomer:
    `Define ideal customers and their needs.`,

    marketAnalysis:
    `Analyze market opportunity and trends.`,

    competitors:
    `Identify competitors and differentiation.`,

    marketingStrategy:
    `Create marketing strategy focusing on ${focus}.`,

    salesStrategy:
    `Explain customer acquisition and sales process.`,

    revenueModel:
    `Create possible revenue streams.`,

    operations:
    `Explain daily operations required.`,

    team:
    `Suggest required team members.`,

    costs:
    `Estimate startup costs and expenses.`,

    growthPlan:
    `Create scaling opportunities.`,

    "90DayActionPlan":
    `Create a 90-day launch roadmap.`
  };


  return (
    sectionContent[section] ||
    "Create a detailed business strategy."
  );
}