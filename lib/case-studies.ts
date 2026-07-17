import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

export interface CaseStudyFrontmatter {
  title: string;
  tagline: string;
  tag: string;
  order: number;
  year: string;
  status: string;
  role: string;
  github: string;
  demo: string;
  meta: string[];
  summary: string;
}

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

/**
 * Reads every MDX file in content/case-studies, parses frontmatter,
 * and returns them sorted by the `order` field.
 *
 * This is the Content Layer described in the architecture doc: adding a
 * new case study means dropping a new .mdx file here — no component or
 * routing changes required.
 */
export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const studies = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as CaseStudyFrontmatter,
      content,
    };
  });

  return studies.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as CaseStudyFrontmatter,
    content,
  };
}

export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
