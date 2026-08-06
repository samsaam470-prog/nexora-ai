export async function generateBusinessPlan(idea: string) {
  return `
Business Plan for: ${idea}

1. Business Overview
Create a clear description of the business, target customers, and value proposition.

2. Target Market
Identify ideal customers, their problems, and buying behavior.

3. Marketing Strategy
Create channels, campaigns, and growth strategies.

4. Revenue Model
Explain how this business will make money.

5. Growth Plan
Outline the next 6-12 months of expansion.

6. Action Steps
Provide practical steps to launch and grow.
`;
}