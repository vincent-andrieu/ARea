
const notionBlockIdRexexp = /([a-z0-9]+)$/;


describe("Notion block id regexp", () => {
    it("Page", async () => {
        const testUrl = "https://www.notion.so/df4ed9d0374840b68b95ccf946b4e103?v=21b1572a6369448eba1d3dec825a43c2";

        expect(notionBlockIdRexexp.test(testUrl) === true);
        const result = notionBlockIdRexexp.exec(testUrl);
        if (!result || !result.entries || !result.entries[0]) {
            expect(true).toBeFalsy;
            return;
        } expect(result.entries[0] === "21b1572a6369448eba1d3dec825a43c2");
    });
    it("Other page", async () => {
        const testUrl = "https://www.notion.so/AREA-4c14b32b03d4466cb8d585a2f0be26b0";

        expect(notionBlockIdRexexp.test(testUrl) === true);
        const result = notionBlockIdRexexp.exec(testUrl);
        if (!result || !result.entries || !result.entries[0]) {
            expect(true).toBeFalsy;
            return;
        } expect(result.entries[0] === "4c14b32b03d4466cb8d585a2f0be26b0");
    });
    it("Page as kanban", async () => {
        const testUrl = "https://www.notion.so/df4ed9d0374840b68b95ccf946b4e103?v=21b1572a6369448eba1d3dec825a43c2";

        expect(notionBlockIdRexexp.test(testUrl) === true);
        const result = notionBlockIdRexexp.exec(testUrl);
        if (!result || !result.entries || !result.entries[0]) {
            expect(true).toBeFalsy;
            return;
        }
        expect(result.entries[0] === "21b1572a6369448eba1d3dec825a43c2");
    });
});