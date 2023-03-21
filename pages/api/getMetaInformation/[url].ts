// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import url from "url";

type Data = {
  url: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
   const data = await axios({
    method: "get",
    url: "https://www.google.com/",
   });

   const newUrl = new url.URL('www.google.at')

  res.status(200).json({ url: newUrl });
}
