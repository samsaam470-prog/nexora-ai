import { knowledgeBase } from "./knowledgeBase";

type KnowledgeEntry =
  (typeof knowledgeBase)[keyof typeof knowledgeBase];

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/[^\w\s]/g, "")
    .trim();
}

function getWords(text: string) {
  return normalizeText(text)
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

/*
 * Finds the closest existing industry for a custom industry.
 */
function findClosestIndustry(customIndustry: string) {
  const customWords = getWords(customIndustry);

  let bestIndustry: string | null = null;
  let bestScore = 0;

  for (const industryId of Object.keys(knowledgeBase)) {
    const industryName = industryId.replace(/_/g, " ");
    const industryWords = getWords(industryName);

    let score = 0;

    for (const word of customWords) {
      if (industryWords.includes(word)) {
        score += 1;
      }
    }

    /*
     * Give a small boost when the complete industry name
     * appears inside the custom industry.
     */
    const normalizedCustom = normalizeText(customIndustry);
    const normalizedIndustry = normalizeText(industryName);

    if (
      normalizedCustom.includes(normalizedIndustry) ||
      normalizedIndustry.includes(normalizedCustom)
    ) {
      score += 3;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIndustry = industryId;
    }
  }

  if (!bestIndustry || bestScore === 0) {
    return null;
  }

  return {
    industryId: bestIndustry,
    score: bestScore,
  };
}

/*
 * Gets exact industry knowledge.
 */
export function getIndustryKnowledge(industryId: string) {
  const knowledge =
    knowledgeBase[
      industryId as keyof typeof knowledgeBase
    ];

  if (!knowledge) {
    return null;
  }

  return knowledge;
}

/*
 * Gets knowledge for either:
 *
 * 1. An exact industry
 * 2. A custom industry by finding the closest existing industry
 */
export function getBestIndustryKnowledge(industryId: string) {
  const exactKnowledge = getIndustryKnowledge(industryId);

  if (exactKnowledge) {
    return {
      knowledge: exactKnowledge,
      matchedIndustry: industryId,
      isCustomMatch: false,
      matchScore: 100,
    };
  }

  const closest = findClosestIndustry(industryId);

  if (!closest) {
    return {
      knowledge: null,
      matchedIndustry: null,
      isCustomMatch: true,
      matchScore: 0,
    };
  }

  const matchedKnowledge = getIndustryKnowledge(
    closest.industryId
  );

  return {
    knowledge: matchedKnowledge,
    matchedIndustry: closest.industryId,
    isCustomMatch: true,
    matchScore: closest.score,
  };
}