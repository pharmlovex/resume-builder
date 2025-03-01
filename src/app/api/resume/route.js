import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const data = await req.json();

    // Generate a well-structured markdown resume
    const resumeContent = `# ${data.name}

${data.email} | ${data.phone} | ${data.address}${
      data.linkedin ? ` | [LinkedIn](${data.linkedin})` : ""
    }

## Summary

${data.summary}

## Work Experience

${data.workExperience
  .map(
    (job) => `
### ${job.jobTitle} at ${job.company}
${job.startDate} - ${job.endDate}

${job.responsibilities}

${
  job.projects && job.projects.length > 0
    ? `**Projects:**

${job.projects
  .map(
    (project) =>
      `- **${project.name}**: ${project.description}${
        project.technologies ? ` (Technologies: ${project.technologies})` : ""
      }${
        project.achievements
          ? `\n  - Achievements: ${project.achievements}`
          : ""
      }`
  )
  .join("\n")}
`
    : ""
}
`
  )
  .join("")}

## Education

${data.education
  .map(
    (edu) => `
### ${edu.degree} in ${edu.fieldOfStudy}, ${edu.school}
${edu.startDate} - ${edu.endDate}

${edu.description}
`
  )
  .join("")}

## Skills

${data.skills
  .filter((skill) => skill)
  .map((skill) => `- ${skill}`)
  .join("\n")}

${
  data.certifications && data.certifications.some((cert) => cert)
    ? `
## Certifications

${data.certifications
  .filter((cert) => cert)
  .map((cert) => `- ${cert}`)
  .join("\n")}
`
    : ""
}
`;

    return Response.json({ resumeContent });
  } catch (error) {
    console.error("Error generating resume:", error);
    return Response.json(
      { message: "Failed to generate resume" },
      { status: 500 }
    );
  }
}

// Helper function to format resume data for the prompt
function formatResumeData(data) {
  let formatted = `# Personal Information\n`;
  formatted += `Name: ${data.name}\n`;
  formatted += `Email: ${data.email}\n`;
  formatted += `Phone: ${data.phone}\n`;
  formatted += `Address: ${data.address}\n`;
  if (data.linkedin) formatted += `LinkedIn: ${data.linkedin}\n`;

  formatted += `\n# Professional Summary\n${data.summary}\n`;
  
  formatted += `\n# Skills\n`;
  data.skills.forEach((skill) => {
    if (skill.trim()) formatted += `- ${skill}\n`;
  });
  formatted += `\n# Work Experience\n`;
  data.workExperience.forEach((exp, index) => {
      formatted += `\n## Position ${index + 1}\n`;
    formatted += `Job Title: ${exp.jobTitle}\n`;
    formatted += `Company: ${exp.company}\n`;
    formatted += `Duration: ${exp.startDate} - ${exp.endDate}\n`;
    formatted += `Responsibilities: ${exp.responsibilities}\n`;

    if (exp.projects && exp.projects.length > 0) {
      formatted += `\nProjects:\n`;
      exp.projects.forEach((project, pIndex) => {
        formatted += `- Project: ${project.name}\n`;
        formatted += `  Description: ${project.description}\n`;
        formatted += `  Technologies: ${project.technologies}\n`;
        formatted += `  Achievements: ${project.achievements}\n`;
      });
    }
  });

  formatted += `\n# Education\n`;
  data.education.forEach((edu, index) => {
    formatted += `\n## Education ${index + 1}\n`;
    formatted += `School: ${edu.school}\n`;
    formatted += `Degree: ${edu.degree}\n`;
    formatted += `Field of Study: ${edu.fieldOfStudy}\n`;
    formatted += `Duration: ${edu.startDate} - ${edu.endDate}\n`;
    formatted += `Description: ${edu.description}\n`;
  });


  formatted += `\n# Certifications\n`;
  data.certifications.forEach((cert) => {
    if (cert.trim()) formatted += `- ${cert}\n`;
  });

  return formatted;
}
