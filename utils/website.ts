import Crawler from "crawler";
import RenderResult from "next/dist/server/render-result";

type Page = {
	url: string;
	title?: string;
};

type Meta = {
	title?: string;
	description?: string;
	image?: string;
	author?: string;
	icon?: string;
};

type Social = {
	facebook?: string;
	twitter?: string;
	instagram?: string;
	linkedin?: string;
	youtube?: string;
	pinterest?: string;
	tiktok?: string;
};

export default class Website {
	url: string;

	pages: Page[];
	meta: Meta;
	social: Social;

	private crawledPages: string[] = [];

	constructor(url: string, pages = [], meta = {}, social = {}) {
		this.url = url;
		this.pages = pages;
		this.meta = meta;
		this.social = social;
	}

	private getPages($: cheerio.CheerioAPI): Page[] | [] {
		const links = $("a");
		const hrefs = Array.from($(links))
			.map((link) => $(link).attr("href"))
			.filter((href, index, self) => self.indexOf(href) === index);

		const internalLinks = hrefs.filter((href) => href && href.startsWith("/"));
		const pages = internalLinks
			.map((href) => {
				if (!href) return { url: "" };

				return {
					url: href,
				};
			})
			.filter((page) => page.url.length)

		return pages || [];
	}

	private getMeta($: cheerio.CheerioAPI): Meta {
		const meta = {
			title: $("title").text(),
			description: $("meta[name='description']").attr("content"),
			image: $("meta[property='og:image']").attr("content"),
			author: $("meta[name='author']").attr("content"),
			// get favicon
			icon: `https://www.google.com/s2/favicons?domain=${this.url}`,
		};

		return meta;
	}

	private getSocial($: cheerio.CheerioAPI): any {
		const findValues = [
			"facebook",
			"twitter",
			"instagram",
			"linkedin",
			"youtube",
			"pinterest",
			"tiktok",
		];

		const links = $("a");
		const hrefs = Array.from($(links))
			.map((link) => $(link).attr("href"))
			.filter((href, index, self) => self.indexOf(href) === index);

		const externalLinks = hrefs.filter(
			(href) => href && href.startsWith("http")
		);

		let social = {};

		externalLinks.map((href) => {
			const plattfrom = findValues.find((value) => href?.includes(value));
			social = plattfrom ? { ...social, [plattfrom]: href } : social;
		});

		return social;
	}

	async crawl() {
		await this.crawler.queue(this.url);
	}

	private crawler = new Crawler({
		maxConnections: 10,
		// This will be called for each crawled page
		callback: (error, res, done) => {
			if (error) {
				console.log(error);
			} else {
				const $ = res.$;

				// Get pages
				this.pages = [ ...this.pages, ...this.getPages($) ];

				// Get meta
				this.meta = { ...this.meta, ...this.getMeta($) };

				// Get social
				this.social = { ...this.social, ...this.getSocial($) };

				console.log(this.pages);
                console.log(this.meta);
                console.log(this.social);
			}
			done();
		},
	});
}
