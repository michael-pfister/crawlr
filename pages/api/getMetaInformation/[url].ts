// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import validUrl from "valid-url";

const metascraper = require("metascraper")([
  require("metascraper-author")(),
  require("metascraper-description")(),
  require("metascraper-image")(),
  require("metascraper-title")(),
  require("metascraper-logo-favicon")()
]);

type metaData = {
  author: string | null;
  description: string | null;
  image: string | null;
  title: string | null;
  logo: string | null;
} | "Invalid URL";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<metaData>
) {
  const query = req.query.url?.toString() || "";

  if (!validUrl.isWebUri(query)) {
    return res.status(400).json("Invalid URL");
  }

  const {data} = await axios({
    method: "get",
    url: query,
  });

  const metadata: metaData = await metascraper({
    html: data,
    url: query.toString(),
  });

  res.status(200).json(metadata);
}
