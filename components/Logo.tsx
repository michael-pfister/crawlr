import { Center, Flex } from "@chakra-ui/react";
import { faSpider } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Logo() {
    return <Flex align={"center"} justify={"center"} gap={2} padding={5}>
        <FontAwesomeIcon icon={faSpider} size={"2x"} color="#E63946" />
        <h2 className="text-3xl">Crawlr<span className="text-red">.</span></h2>
    </Flex>
}