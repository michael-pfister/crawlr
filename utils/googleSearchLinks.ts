import axios from "axios";
import jsdom from "jsdom";

export default async function getAllLinks(searchTerm: string) {
  const data = (
    await axios.get(`https://www.google.com/search?q=${searchTerm}`)
  ).data;
  const dom = new jsdom.JSDOM(data);
  const links = dom.window.document.getElementsByTagName("a");
  const hrefs = Array.from(links).map((link) => link.href);
  const filteredHrefs = hrefs
    .filter((link) => link.includes("/url?q=http"))
    .map((link) => link.split("/url?q=")[1].split("&sa=U")[0]);

  // Remove the last two links, because they are not relevant
  filteredHrefs.splice(-2);
  console.log(filteredHrefs);
}

getAllLinks("test");
