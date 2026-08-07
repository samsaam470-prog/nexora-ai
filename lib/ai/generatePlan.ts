import { getBestIndustryKnowledge } from "@/lib/knowledge/knowledgeEngine";
import { businessLogic } from "@/lib/knowledge/businessLogic";

type IndustryKnowledge = {
  overview: string;
  customerProblems: string[];
  solutions: string[];
  targetCustomers: string[];
  revenueModels: string[];
  marketingStrategies: string[];
  competitors: string[];
  operations: string[];
  startupCosts: string[];
  growthStrategies: string[];
  mistakesToAvoid: string[];
  trends: string[];
};

function formatList(items: string[] | undefined) {
  if (!items || items.length === 0) {
    return "No specific information is currently available.";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function formatSectionName(section: string) {
  return section
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

export async function generateBusinessPlan(
  idea: string,
  industryId: string
) {
  const result = getBestIndustryKnowledge(industryId);

  const knowledge =
    result.knowledge as IndustryKnowledge | null;

  /*
   * ---------------------------------------------------------
   * NO USEFUL INDUSTRY MATCH
   * ---------------------------------------------------------
   */

  if (!knowledge) {
    return `
# Business Plan

## Business Idea

${idea}

## Industry

${industryId}

## Nexora Learning Status

Nexora is currently expanding its knowledge of this industry.

At the moment, there is not enough relevant industry-specific
knowledge in the current knowledge system to provide verified
industry insights.

Nexora can still provide practical startup suggestions based on
the business idea.

## Business Overview

Clearly define what the business offers, who it serves, the main
problem it solves, and why customers would choose it.

## Customer

Identify the people most likely to need this business. Understand
their needs, behavior, problems, and purchasing decisions.

## Problem

Identify the biggest problems customers currently experience and
which of those problems the business can realistically solve.

## Solution

Define the simplest useful product or service that can solve the
most important customer problem.

## Marketing

Start with channels where the target customers already spend time.
Test small campaigns and measure the results before increasing
spending.

## Revenue

Consider realistic ways the business can make money based on its
product, customer type, purchase frequency, and willingness to pay.

## Operations

Identify the people, tools, technology, suppliers, and processes
needed to deliver the product or service.

## Growth

Start with a focused customer group, validate demand, improve the
offering, and expand only after finding something that works.

## 90-Day Starting Direction

### Days 1-30

Validate the customer problem, target customer, competitors, and
initial business model.

### Days 31-60

Build and test the core offering with real potential customers.

### Days 61-90

Measure results, improve the offering, strengthen operations, and
focus on the channels that show the strongest potential.

## Important Note

These are general startup suggestions, not industry-specific
knowledge.

Nexora is continuously expanding its knowledge of this industry.
`.trim();
  }

  /*
   * ---------------------------------------------------------
   * INDUSTRY MATCH FOUND
   * ---------------------------------------------------------
   */

  let plan = `
# Business Plan

## Business Idea

${idea}

## Industry

${industryId}

`;

  /*
   * Tell the user when a custom industry was matched
   * with an existing industry.
   */

  if (result.isCustomMatch && result.matchedIndustry) {
    const matchedName = formatSectionName(result.matchedIndustry);

    plan += `## Knowledge Matching

Your custom industry was matched with the closest available
industry knowledge: **${matchedName}**.

Nexora will use that knowledge as a foundation while keeping your
actual business idea and custom industry as the focus.

This is a knowledge match, not a claim that the two industries are
identical.

`;
  } else {
    plan += `## Knowledge Status

Nexora has specific knowledge available for this industry.

The information below is being used as the foundation for the
business plan.

`;
  }

  /*
   * ---------------------------------------------------------
   * BUSINESS PLAN SECTIONS
   * ---------------------------------------------------------
   */

  for (const [section, instruction] of Object.entries(
    businessLogic
  )) {
    const sectionName = formatSectionName(section);

    plan += `## ${sectionName}

${instruction}

`;

    switch (section) {
      case "businessOverview":
        plan += `### Industry Overview

${knowledge.overview}

`;
        break;

      case "problem":
        plan += `### Customer Problems

${formatList(knowledge.customerProblems)}

`;
        break;

      case "solution":
        plan += `### Relevant Solutions

${formatList(knowledge.solutions)}

`;
        break;

      case "targetCustomer":
        plan += `### Target Customers

${formatList(knowledge.targetCustomers)}

`;
        break;

      case "marketAnalysis":
        plan += `### Industry Trends

${formatList(knowledge.trends)}

`;
        break;

      case "competitors":
        plan += `### Competitor Landscape

${formatList(knowledge.competitors)}

`;
        break;

      case "marketingStrategy":
        plan += `### Marketing Strategies

${formatList(knowledge.marketingStrategies)}

`;
        break;

      case "salesStrategy":
        plan += `### Sales Direction

Use the target customers, customer problems, marketing strategies,
and competitive landscape to determine the most appropriate sales
approach for this specific business.

Focus on how interested prospects can move from awareness to trial,
purchase, and repeat business.

`;
        break;

      case "revenueModel":
        plan += `### Revenue Models

${formatList(knowledge.revenueModels)}

`;
        break;

      case "operations":
        plan += `### Operations

${formatList(knowledge.operations)}

`;
        break;

      case "team":
        plan += `### Team Considerations

Use the operational requirements and growth strategies to determine
which roles should be prioritized first.

Start lean and add specialized roles as the business gains traction.

`;
        break;

      case "costs":
        plan += `### Startup Costs

${formatList(knowledge.startupCosts)}

`;
        break;

      case "growthPlan":
        plan += `### Growth Strategies

${formatList(knowledge.growthStrategies)}

`;
        break;

      case "90DayActionPlan":
        plan += `### 90-Day Action Plan

#### Days 1-30

Validate the customer problem, target customer, competitive
landscape, and initial business model.

#### Days 31-60

Develop and test the core offering using the relevant solutions,
marketing strategies, and operational requirements.

#### Days 61-90

Measure customer response, improve the offering, strengthen
operations, and begin applying the most promising growth strategies.

### Mistakes to Avoid

${formatList(knowledge.mistakesToAvoid)}

`;
        break;
    }
  }

  /*
   * ---------------------------------------------------------
   * FINAL KNOWLEDGE
   * ---------------------------------------------------------
   */

  plan += `## Industry Trends to Monitor

${formatList(knowledge.trends)}

`;

  plan += `## Final Founder Guidance

Use the industry knowledge as a foundation, but adapt it to the
specific business idea, target customer, location, available
resources, budget, and current stage of the business.

Do not blindly copy industry practices.

Prioritize the actions that are most relevant to validating,
launching, and growing this specific business.

If this was a custom industry, remember that the industry knowledge
was used as a relevant foundation rather than an exact description
of the custom industry.
`;

  return plan.trim();
}