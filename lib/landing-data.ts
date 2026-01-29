import api from "@/lib/api";

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  bgImageUrl: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  projectType: string;
  status?: string;
}

export interface BeforeAfterData {
  id: number;
  title: string;
  description?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
}

export interface LandingSection {
  id: number;
  sectionKey: string;
  isVisible: boolean;
  order: number;
}

export async function getLandingData() {
  try {
    const [
      heroRes,
      propertiesRes,
      beforeAfterRes,
      sectionsRes,
    ] = await Promise.all([
      api.get("/hero"),
      api.get("/properties/featured"),
      api.get("/before-after"),
      api.get("/sections/visible"),
    ]);

    const sections = (sectionsRes.data as LandingSection[])
      .filter((s) => s.isVisible)
      .sort((a, b) => a.order - b.order);

    return {
      hero: heroRes.data as HeroContent | null,
      properties: propertiesRes.data as Project[],
      beforeAfter: beforeAfterRes.data as BeforeAfterData[],
      sections,
    };
  } catch (error) {
    console.error("Landing page data fetch failed", error);

    return {
      hero: null,
      properties: [],
      beforeAfter: [],
      sections: [],
    };
  }
}
