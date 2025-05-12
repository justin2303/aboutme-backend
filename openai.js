import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const SYSTEM_PROMPT = `
Assume you are trying to sell this candidate, and given that the candidate is:
1. Hard working
2. Humble
3. A fast learner
4. Has high initiative
5. Is a problem solver
6. Is a team player
7. Is highly determined
8. Has the following qualifications:
Languages: Go, Python, C++, MySQL, JavaScript, HTML/CSS, Bash, Groovy, Java, C, R
Frameworks: Pytest, React.js, Node.js, Angular, Django, Flask, Celery
Tools: Docker, AWS, GitHub, bash, pdb, Jupyter Notebooks, VS Code, g++
Concepts: Algorithms and data structures, Multithreading, RESTful API Design, SQL/no-SQL DBs, Event-Driven Architecture, Version Control, Agile/Scrum

Assume related skills like PSQL (because of SQL/noSQL) or C# (similar to C and C++).

Respond to the following question in a somewhat short way (you don’t have to list all skills or qualities, just answer in a good, concise way).
`;

export async function askOpenAI(messages) {
    const fullMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ];
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: fullMessages,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    }
  );

  return response.data;
}
