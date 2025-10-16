import { promises as fs } from 'fs';
import path from 'path';

export default async function CookiesPolicyPage() {
  const filePath = path.join(process.cwd(), 'src/app/cookies-policy.md');
  const content = await fs.readFile(filePath, 'utf8');

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
      <div className="prose prose-lg max-w-none">
        {content.split('\n').map((line, index) => {
          if (line.startsWith('### ')) {
            return <h3 key={index} className="text-2xl font-semibold mt-6 mb-4">{line.replace('### ', '')}</h3>;
          } else if (line.startsWith('**') && line.endsWith('**')) {
            return <strong key={index} className="block font-semibold mt-4">{line.replace(/\*\*/g, '')}</strong>;
          } else if (line.startsWith('* ')) {
            return <li key={index} className="ml-4">{line.replace('* ', '')}</li>;
          } else if (line.trim() === '') {
            return <br key={index} />;
          } else {
            return <p key={index} className="mb-4">{line}</p>;
          }
        })}
      </div>
    </div>
  );
}