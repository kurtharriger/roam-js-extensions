import {createButtonObserver, getTextTreeByBlockUid, runExtension} from "../entry-helpers";
import {addButtonListener, getUidsFromButton} from "roam-client";
import {renderDatalogQueryResult} from "../components/DatalogQueryButton";

// const insertAfter = (before: Node, node: Node) => {
//     before.parentElement.insertBefore(node, before.nextSibling);
// }
const findConfig = (b: HTMLButtonElement, name: string ) => {
    const roamBlock = b.closest('.roam-block-container');
    const className = `${name}-container`;
    return {roamBlock, className}
}
const findContainer = (b: HTMLButtonElement, name: string): HTMLDivElement | undefined => {
    const { roamBlock, className } = findConfig(b, name);
    const existing = roamBlock.querySelector(`.${className}`);
    return existing as HTMLDivElement | undefined;
}
const findOrCreateContainer = (b: HTMLButtonElement, name: string): HTMLDivElement => {
    const roamBlock = b.closest('.roam-block-container');
    const className = `${name}-container`;
    const existing = findContainer(b, name);
    if(existing) return existing;

    const container = document.createElement('PRE') as HTMLDivElement;
    container.classList.add(className);

    const roamBlockChildren = roamBlock.querySelector('.rm-block-children ');
    roamBlockChildren.insertBefore(container, roamBlockChildren.firstChild);
    return container;
}

const tryQuery = (query: string, parameters: any[]) => {
    try {
        // @ts-ignore - q excepts query followed by any number of query parameters
        return  window.roamAlphaAPI.q(query, ...parameters);
    } catch (e ) {
        return e;
    }
}
runExtension("datalog-query", () => {
    createButtonObserver({
        shortcut: "datalog-query",
        attribute: "datalog-query",
        render: (b: HTMLButtonElement) => {
            console.log('datalog-query');

            const { blockUid } = getUidsFromButton(b);
            const { children } = getTextTreeByBlockUid(blockUid);
            const [ query, ...parameters ] = children.map(n => n.text);
            // @ts-ignore
            const { open } = window.roamAlphaAPI.q('[:find (pull ?e [:block/open]) . :in $ ?id :where [?e :block/uid ?id]]', blockUid)
            const result = tryQuery(query, parameters);
            console.log({blockUid, query, parameters, open, result});
            if(open) {
                const reactContainer = findOrCreateContainer(b, 'datalog-query')
                renderDatalogQueryResult(result, reactContainer);
            } else {
                findContainer(b, 'datalog-query')?.remove()
            }
        },
    });
});
console.log('installed8');
