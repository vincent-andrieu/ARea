import { Client } from "@notionhq/client";

const getBlockChildrenList = async (notionToken, blockId) => {
    try {
        const notion = new Client({ auth: notionToken });
        console.log("HEllo");
        const response = await notion.blocks.children.list({
            block_id: blockId
        });
        console.log("World");
        console.log(JSON.stringify(response));
    } catch (error) {
        const some_error = error as Error;

        console.log(some_error);
    }
};

const appendBlockToPage = async (notionToken, blockId, textObject) => {

    try {
        const notion = new Client({ auth: notionToken });
        const response = await notion.blocks.children.append({
            block_id: blockId,
            children: [textObject]
        });

        console.log(response);
    } catch (error) {
        const some_error = error as Error;

        console.log(some_error);
    }

};

// const textObject = {
//     object: "block",
//     type: "paragraph",
//     paragraph: {
//         text: [
//             {
//                 type: "text",
//                 text: {
//                     content: "New Github Issue",
//                     link: {
//                         type: "url",
//                         url: "https://twitter.com/NotionAPI"
//                     }
//                 }
//             }
//         ]
//     }
// };

export = {
    appendBlockToPage,
    getBlockChildrenList
}