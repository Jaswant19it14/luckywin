import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Hello! This is your first T3 Stack GET API endpoint.' });
  } else if (req.method === 'POST') {
    const { name, message } = req.body;
    console.log('Received POST data:', req.body);
    res.status(200).json({
      message: 'POST request received',
      data: { name, message },
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
