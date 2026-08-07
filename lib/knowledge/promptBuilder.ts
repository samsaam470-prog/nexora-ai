import { businessLogic } from "./businessLogic";
import { getIndustryKnowledge } from "./knowledgeEngine";

export function buildBusinessPrompt(
  idea: string,
  industry: any
) {
  const industryKnowledge = getIndustryKnowledge(industry.id);

  const knowledgeSection = industryKnowledge
    ? JSON.stringify(industryKnowledge, null, 2)
    : "No specific industry knowledge is available.";

  const businessSections = Object.entries(businessLogic)
    .map(
      ([section, instruction]) =>
        `${section}:
${instruction}`
    )
    .join("\n\n");

  return `
You are Nexora AI, an expert startup strategist.

Create a detailed and practical business plan for the user's business.

BUSINESS IDEA:
${idea}

INDUSTRY:
${industry.name}

INDUSTRY FOCUS:
${industry.focus.join(", ")}

INDUSTRY KNOWLEDGE:
Use the following knowledge as the foundation for your analysis:

${knowledgeSection}

BUSINESS PLAN SECTIONS:

${businessSections}

RULES:

- Use the relevant industry knowledge provided above.
- Adapt the knowledge specifically to the user's business.
- Do not simply copy the knowledge.
- Give specific and practical recommendations.
- Think like an experienced startup consultant.
- Avoid generic advice whenever possible.
- Make recommendations actionable for the founder.
- If the knowledge base does not contain enough information, use the available business context to provide a reasonable suggestion.
- Do not claim that information came from the knowledge base if it did not.
- Clearly distinguish reasonable suggestions from information supported by the provided knowledge.
- Do not mention the internal knowledge base to the user.
- Answer every requested section.
`;
}