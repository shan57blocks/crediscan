import { config } from "./config";
import { requestGet, requestPost } from "./request";

export interface Discover {
  background: string;
  company_name: string;
  founders: { name: string; background: string }[];
  funding: {
    details: string;
    year: number;
  }[];
  job_positions: string[];
  legal_issues: [];
  overall_summary: string;
  security_assessment: {
    description: string;
    risks: string;
    certifications: string[];
    awards: string[];
  };
  user_reviews: {
    reviewer: string;
    position: string;
    review: string;
    feedback: string;
  }[];
  website: string;
}

export interface GoogleSearch {
  link: string;
  position: number;
  snippet: string;
  title: string;
  sitelinks: {
    link: string;
    title: string;
  }[];
  date: string;
}

export const api = {
  getDiscover: async () => {
    const response = await requestPost<{ discovered_companies: Discover[] }>(
      `${config.API_ENDPOINT}/discover`,
      {
        urls: [
          "https://startups.gallery/categories/industries/web3",
          "https://wellfound.com/startups/industry/web3-4",
        ],
        max_companies: 10,
      }
    );

    return response.discovered_companies.filter(
      (item) => item.company_name !== "Unknown"
    );
  },
  getGoogleSearch: async (query: string) => {
    const response = await requestGet<{
      results: {
        organic: GoogleSearch[];
      };
    }>(`${config.API_ENDPOINT}/search?query=${query}`);

    return response.results.organic;
  },
  getAggregate: async (companyName: string) => {
    const response = await requestPost<{ content: string }>(
      `${config.API_ENDPOINT}/aggregate`,
      {
        company_name: companyName,
        model: "research",
      }
    );

    return response;
  },
};
