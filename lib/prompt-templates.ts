export interface PromptVariable {
  name: string
  description: string
  defaultValue?: string
}

export interface PromptTemplate {
  id: string
  title: string
  content: string
  description: string
  category: string
  variables: PromptVariable[]
  tags: string[]
  isBuiltIn: boolean
}

export const BUILT_IN_TEMPLATES: PromptTemplate[] = [
  {
    id: "code-review",
    title: "Code Review Assistant",
    content: `Review the following {{language}} code and provide:
1. Code quality assessment
2. Potential bugs or issues
3. Performance improvements
4. Best practices recommendations
5. Security considerations

Code:
{{code}}`,
    description: "Get comprehensive code reviews with actionable feedback",
    category: "Development",
    variables: [
      { name: "language", description: "Programming language", defaultValue: "JavaScript" },
      { name: "code", description: "Code to review" },
    ],
    tags: ["code", "review", "development"],
    isBuiltIn: true,
  },
  {
    id: "email-writer",
    title: "Professional Email Writer",
    content: `Write a professional email with the following details:

To: {{recipient}}
Subject: {{subject}}
Tone: {{tone}}

Context: {{context}}

Please write a clear, professional email that addresses the context appropriately.`,
    description: "Craft professional emails for any situation",
    category: "Communication",
    variables: [
      { name: "recipient", description: "Email recipient" },
      { name: "subject", description: "Email subject" },
      { name: "tone", description: "Email tone", defaultValue: "professional" },
      { name: "context", description: "Email context and purpose" },
    ],
    tags: ["email", "communication", "writing"],
    isBuiltIn: true,
  },
  {
    id: "meeting-notes",
    title: "Meeting Notes Summarizer",
    content: `Summarize the following meeting notes into:
1. Key discussion points
2. Decisions made
3. Action items with owners
4. Next steps

Meeting: {{meeting_title}}
Date: {{date}}

Notes:
{{notes}}`,
    description: "Transform meeting notes into actionable summaries",
    category: "Productivity",
    variables: [
      { name: "meeting_title", description: "Meeting title" },
      { name: "date", description: "Meeting date" },
      { name: "notes", description: "Raw meeting notes" },
    ],
    tags: ["meeting", "summary", "productivity"],
    isBuiltIn: true,
  },
  {
    id: "content-improver",
    title: "Content Improver",
    content: `Improve the following {{content_type}} by:
1. Enhancing clarity and readability
2. Fixing grammar and spelling
3. Improving structure and flow
4. Making it more engaging
5. Maintaining the original tone and intent

Content:
{{content}}`,
    description: "Enhance any written content for better impact",
    category: "Writing",
    variables: [
      { name: "content_type", description: "Type of content", defaultValue: "article" },
      { name: "content", description: "Content to improve" },
    ],
    tags: ["writing", "editing", "content"],
    isBuiltIn: true,
  },
  {
    id: "brainstorm",
    title: "Brainstorming Assistant",
    content: `Help me brainstorm ideas for: {{topic}}

Context: {{context}}

Please provide:
1. 10 creative ideas
2. Pros and cons for each
3. Implementation difficulty (Easy/Medium/Hard)
4. Potential impact (Low/Medium/High)
5. Your top 3 recommendations`,
    description: "Generate creative ideas with detailed analysis",
    category: "Creativity",
    variables: [
      { name: "topic", description: "Topic to brainstorm" },
      { name: "context", description: "Additional context" },
    ],
    tags: ["brainstorm", "ideas", "creativity"],
    isBuiltIn: true,
  },
  {
    id: "data-analyst",
    title: "Data Analysis Helper",
    content: `Analyze the following data and provide insights:

Dataset: {{dataset_name}}
Question: {{question}}

Data:
{{data}}

Please provide:
1. Key findings
2. Trends and patterns
3. Anomalies or outliers
4. Actionable recommendations
5. Visualizations suggestions`,
    description: "Get insights and recommendations from your data",
    category: "Analysis",
    variables: [
      { name: "dataset_name", description: "Name of the dataset" },
      { name: "question", description: "Question to answer" },
      { name: "data", description: "Data to analyze" },
    ],
    tags: ["data", "analysis", "insights"],
    isBuiltIn: true,
  },
  {
    id: "learning-tutor",
    title: "Learning Tutor",
    content: `I want to learn about: {{topic}}

My current level: {{level}}
Learning goal: {{goal}}

Please:
1. Explain the concept clearly
2. Provide examples
3. Suggest practice exercises
4. Recommend resources
5. Create a learning roadmap`,
    description: "Get personalized tutoring on any topic",
    category: "Education",
    variables: [
      { name: "topic", description: "Topic to learn" },
      { name: "level", description: "Current knowledge level", defaultValue: "beginner" },
      { name: "goal", description: "Learning goal" },
    ],
    tags: ["learning", "education", "tutorial"],
    isBuiltIn: true,
  },
  {
    id: "problem-solver",
    title: "Problem Solving Framework",
    content: `Help me solve this problem using a structured approach:

Problem: {{problem}}

Context: {{context}}

Please use this framework:
1. Problem definition and scope
2. Root cause analysis
3. Potential solutions (at least 5)
4. Evaluation criteria
5. Recommended solution with implementation plan
6. Risk mitigation strategies`,
    description: "Apply structured problem-solving frameworks",
    category: "Strategy",
    variables: [
      { name: "problem", description: "Problem to solve" },
      { name: "context", description: "Problem context" },
    ],
    tags: ["problem-solving", "strategy", "analysis"],
    isBuiltIn: true,
  },
]

export function getTemplatesByCategory(category: string): PromptTemplate[] {
  return BUILT_IN_TEMPLATES.filter((t) => t.category === category)
}

export function searchTemplates(query: string): PromptTemplate[] {
  const lowerQuery = query.toLowerCase()
  return BUILT_IN_TEMPLATES.filter(
    (t) =>
      t.title.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

export function substituteVariables(template: string, variables: Record<string, string>): string {
  let result = template
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(new RegExp(`{{${key}}}`, "g"), value)
  })
  return result
}
