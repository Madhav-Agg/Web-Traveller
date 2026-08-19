import { GoogleSite } from "./GoogleSite";
import { YouTubeSite } from "./YouTubeSite";
import { WikipediaSite } from "./WikipediaSite";
import { AmazonSite } from "./AmazonSite";
import { GenericSite } from "./GenericSite";
import { getSite, nearestSnapshot } from "@/lib/timeline-data";

export function SiteRenderer({
  siteId,
  year,
  query = "cats",
}: {
  siteId: string;
  year: number;
  query?: string;
}) {
  const site = getSite(siteId);
  const snap = nearestSnapshot(site, year);

  switch (siteId) {
    case "google":
      return <GoogleSite year={snap.year} query={query} />;
    case "youtube":
      return <YouTubeSite year={snap.year} />;
    case "wikipedia":
      return <WikipediaSite year={snap.year} />;
    case "amazon":
      return <AmazonSite year={snap.year} />;
    default:
      return <GenericSite site={site} snap={snap} />;
  }
}
