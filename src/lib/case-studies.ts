import { getPayload } from "payload";
import config from "@payload-config";
import type { CaseStudy } from "@/payload-types";

export type CaseStudySummary = {
  title: string;
  company: string;
  description: string;
  slug?: string;
  logo?: string;
  industry?: string;
};

function toSummary(doc: CaseStudy): CaseStudySummary {
  const client = typeof doc.client === "object" ? doc.client : undefined;
  const logo = typeof client?.logo === "object" ? client.logo?.url : undefined;
  const industry =
    typeof client?.industry === "object" ? client.industry?.name : undefined;
  return {
    title: doc.name,
    company: client?.companyName ?? "",
    description: doc.shortDescription ?? "",
    slug: doc.slug ?? undefined,
    logo: logo ?? undefined,
    industry: industry ?? undefined,
  };
}

export async function getAllCaseStudies(limit = 0): Promise<CaseStudySummary[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "case-studies",
    sort: "order",
    limit,
    depth: 2,
  });
  return docs.map(toSummary);
}

export async function getRelatedCaseStudies(
  serviceId: string,
  limit = 3,
): Promise<CaseStudySummary[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "case-studies",
    where: { services: { contains: serviceId } },
    limit,
    depth: 2,
  });
  return docs.map(toSummary);
}
