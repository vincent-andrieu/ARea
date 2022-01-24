
import { Client } from "@notionhq/client";

const getBlockChildrenList = async (notionToken, blockId) => {
    const notion = new Client({ auth: notionToken });
    console.log("HEllo");
    const response = await notion.blocks.children.list({
        block_id: blockId
    });
    console.log("World");
    console.log(JSON.stringify(response));
};

const appendBlockToPage = async (notionToken, blockId, textObject) => {
    const notion = new Client({ auth: notionToken });

    const response = await notion.blocks.children.append({
        block_id: blockId,
        children: [textObject]
        
    });

    console.log(response);
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