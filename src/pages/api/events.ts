// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data = await fetch("https://w3e.ai/backend/events/singapore?limit=500")
    const events = (await data.json()).result;
    const metacampEvents = await events.filter(
      (event: { organizer_name: string; }) => event.organizer_name.toLowerCase().includes("metacamp")
    );
    res.status(200).json(metacampEvents);
  } catch (err) {
    res.status(404);
  }
}
