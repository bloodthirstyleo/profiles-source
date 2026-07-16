export interface HomeData {
  name: string;
  role: string;
  photo: string;
  photoMobile: string;
  alias?: string;
  roles?: string[];
  experience?: string;
  location?: string;
  stack?: string[];
  available?: boolean;
  codeCardFilename?: string;
  intro?: string;
  seek?: string;
}

export interface PersonalInfoItem {
  id: number;
  type: string;
  value: string;
}

export interface PersonalInfoGroup {
  id: number;
  data: PersonalInfoItem[];
}

export interface StatItem {
  id: number;
  title: string;
  value: string;
}

export interface TechStackItem {
  id: number;
  title: string;
  value: string;
}

export interface ExperienceItem {
  id: number;
  date: string;
  title: string;
  company: string;
  projectName: string;
  desc: string;
  be: string;
  fe: string;
  db: string;
  clound: string;
}

export interface EducationItem {
  id: number;
  date: string;
  title: string;
  unv: string;
  desc: string;
}

export interface SkillItem {
  id: number;
  name: string;
  value: string;
}

export interface PortfolioWork {
  id: number;
  src: string;
  category: string;
  title: string;
  link?: string;
  project?: string;
  client?: string;
  role?: string;
  date?: string;
  description?: string;
  langages?: string;
}

export interface ReferenceItem {
  name: string;
  role: string;
  email: string;
  phone: string;
}

export interface BlogPost {
  id: number;
  author: string;
  date: string;
  tags: string;
  title: string;
  img: string;
  desc: string;
}