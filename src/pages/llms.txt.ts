import type { APIRoute } from 'astro';
import home from '../data/home.json';
import career from '../data/career.json';
import projects from '../data/projects.json';
import tech from '../data/tech.json';
import experience from '../data/experience.json';
import billing from '../data/billing.json';
import adaptability from '../data/adaptability.json';
import { absoluteUrl } from '../utils/url';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = absoluteUrl('/', site);
  const resumeUrl = home.resumeUrl ? absoluteUrl(home.resumeUrl, site) : '';

  const techCategoriesStr = tech.categories
    .map((cat) => `- **${cat.title}:** ${cat.skills.map((s) => s.name).join(', ')}`)
    .join('\n');

  const careerStr = career
    .map((item) => `- **${item.role}**, ${item.company} (${item.period})\n  * ${item.description}`)
    .join('\n');

  const projectsStr = projects
    .map((proj) => `- **${proj.title}** (${proj.company}): ${proj.role} ${proj.result}`)
    .join('\n');

  const experienceStr = experience
    .map((role) => `### ${role.role}, ${role.company} (${role.period})\n${role.summary}\n${role.areas.map((area) => `- **${area.title}:** ${area.text}`).join('\n')}`)
    .join('\n\n');

  const billingStr = billing.areas
    .map((area) => `- **${area.title}:** ${area.text}`)
    .join('\n');

  const adaptabilityStr = adaptability.steps
    .map((step) => `- **${step.company}** (${step.period}): ${step.stack.join(', ')}. ${step.delivered}`)
    .join('\n');

  const socialsStr = home.socials
    .filter((s) => s.url && s.url !== '#')
    .map((s) => `- **${s.name}:** ${s.url.replace('mailto:', '')}`)
    .join('\n');

  const markdown = `# ${home.name}

> ${home.description}

## Overview
${home.name} is a ${home.jobTitle} based in ${home.location}. ${home.description}

## Key Information
- **Location:** ${home.location}
- **Availability:** ${home.availability} (${home.availabilityDetail})
- **Portfolio:** ${siteUrl}
${resumeUrl ? `- **Resume:** ${resumeUrl}` : ''}

## Recent Roles
${experienceStr}

## Payments & Billing
${billing.intro}
${billingStr}

## Adaptability
${adaptability.statement}
${adaptabilityStr}

## Technical Skills & Categories
${techCategoriesStr}

## Experience & Education
${careerStr}

## Selected Work
${projectsStr}

## Contact & Links
- **Website:** ${siteUrl}
${socialsStr}
`;

  return new Response(markdown.trim() + '\n', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
