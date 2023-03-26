// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Website from "@/utils/website";
import validUrl from "valid-url";

type Data = any;

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (!req.query.url) {
		res.status(400).json("No URL provided");
		return;
	}else if (!validUrl.isWebUri(req.query.url?.toString())) {
		res.status(400).json("Invalid URL");
		return;
	}else if (req.query.url?.toString().includes("localhost")) {
		res.status(400).json("Localhost is not supported");
		return;
	}else if (Array.isArray(req.query.url)) {
		res.status(400).json("Only one URL is supported");
		return;
	}


	const website = new Website(req.query.url);
	website.crawl();

	res.status(200).json({ name: "John Doe" });
}
