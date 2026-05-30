/** ------------------------------------------------------------------
 *  Portfolio Data Adapter – Single source of truth via portfolio.json
 * ------------------------------------------------------------------ */

import portfolio from "./portfolio.json";

const data: any = portfolio;

/* ─── Interfaces ─── */
export interface PersonalInfoItem { id: number; type: string; value: string; }
export interface PersonalInfoGroup { id: number; data: PersonalInfoItem[]; }
export interface StatItem { id: number; title: string; value: string; }
export interface TechStackItem { id: number; title: string; value: string; }
export interface ExperienceItem {
  id: number; date: string; title: string; company: string;
  projectName: string; desc: string; be: string; fe: string;
  db: string; clound: string;
}
export interface EducationItem { id: number; date: string; title: string; unv: string; desc: string; }
export interface SkillItem { id: number; name: string; value: string; }
export interface BlogPost { id: number; author: string; date: string; tags: string; title: string; img: string; desc: string; }
export interface PortfolioWork { id: number; src: string; category: string; title: string; link?: string; }
export interface HomeData { name: string; role: string; photo: string; photoMobile: string; }

/* ─── Home data ─── */
export const homeData: HomeData = {
  name: data.home?.name || "Phat Nguyen Tan",
  role: data.home?.role || ".NET Web Developer",
  photo: data.home?.photo || "/assets/img/profile-image.png",
  photoMobile: data.home?.photoMobile || "/assets/img/profile-image-mobile.png",
};

/* ─── Section data ─── */
export const personalInfo: PersonalInfoGroup[] = data.personalInfo || [];
export const stats: StatItem[] = data.stats || [];
export const techStack: TechStackItem[] = data.techStack || [];
export const experience: ExperienceItem[] = data.experience || [];
export const education: EducationItem[] = data.education || [];
export const skills: SkillItem[] = data.skills || [];

/* ─── Portfolio works ─── */
export const portfolioWorks: PortfolioWork[] = (data.portfolio || []).map(
  (item: any): PortfolioWork => ({
    id: item.id,
    src: item.img,
    category: item.type || "Project",
    title: item.title,
    link: item.previewLink || undefined,
  })
);

/* ─── Blog posts (static, images mapped to existing assets) ─── */
export const blogPosts: BlogPost[] = [
  { id: 1, author: "steve", date: "09 December 2023", tags: "wordpress, business, economy, design", title: "How to Own Your Audience by Creating an Email List", img: "/assets/img/projects/project-2.PNG", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { id: 2, author: "steve", date: "09 December 2023", tags: "wordpress, business, economy, design", title: "Top 10 Toolkits for Deep Learning in 2020", img: "/assets/img/projects/project-3.PNG", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { id: 3, author: "steve", date: "09 December 2023", tags: "wordpress, business, economy, design", title: "Everything You Need to Know About Web Accessibility", img: "/assets/img/projects/project-2.PNG", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { id: 4, author: "steve", date: "09 December 2023", tags: "wordpress, business, economy, design", title: "How to Inject Humor & Comedy Into Your Brand", img: "/assets/img/projects/project-3.PNG", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { id: 5, author: "steve", date: "09 December 2023", tags: "wordpress, business, economy, design", title: "Women in Web Design: How To Achieve Success", img: "/assets/img/projects/project-2.PNG", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  { id: 6, author: "steve", date: "09 December 2023", tags: "wordpress, business, economy, design", title: "Evergreen versus topical content: An overview", img: "/assets/img/projects/project-3.PNG", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
];

/* ─── Footer / contact ─── */
export const footerData = {
  name: data.footer?.name || "Phat Nguyen Tan",
  tagline: data.footer?.tagline || ".NET Web Developer",
  email: data.footer?.email || "nguyentanphatuit@gmail.com",
  phone: data.footer?.phone || "(+84) 869 164 648",
  address:
    data.personalInfo?.[1]?.data?.find((d: any) => d.type === "Address")?.value ||
    "Ho Chi Minh City",
  socialLinks: (data.socialLinks || []).map((link: any) => ({
    id: link.id, icon: link.icon, link: link.link,
  })),
};
