import formidable from 'formidable';
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the files' });
      return;
    }

    const file = files.file;
    const selectedOption = fields.selectedOption;
    const pageRange = fields.pageRange;

    // Read the file
    const fileContent = fs.readFileSync(file.filepath, 'utf8');

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Process this PDF content for ${selectedOption} with page range ${pageRange}`,
          },
          {
            role: 'user',
            content: fileContent,
          },
        ],
        model: 'gpt-3.5-turbo',
      });

      res.status(200).json({ output: chatCompletion.choices[0].message.content });
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      res.status(500).json({ error: 'Error processing the file with OpenAI' });
    }
  });
}