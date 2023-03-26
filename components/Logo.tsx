import { Center, Flex } from "@chakra-ui/react";
import { faSpider } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo() {
	return (
		<Flex align={"center"} justify={"center"} gap={2}>
			<FontAwesomeIcon icon={faSpider} size="xl" color="#E63946" />
			<h2 className="text-2xl">
				Crawlr<span className="text-red">.</span>
			</h2>
		</Flex>
	);
}
