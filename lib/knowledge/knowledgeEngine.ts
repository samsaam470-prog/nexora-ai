import { knowledgeBase } from "./knowledgeBase";

export function getIndustryKnowledge(industryId: string) {
  const knowledge =
    knowledgeBase[industryId as keyof typeof knowledgeBase];

  if (!knowledge) {
    return null;
  }

  return knowledge;
}