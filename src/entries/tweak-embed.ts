import {createHTMLObserver, getTextByBlockUid} from "../entry-helpers";
import { getUids } from "roam-client";

const isElementNode = (e: Node): e is HTMLDivElement => e.nodeType === Node.ELEMENT_NODE

const mutateEmbed = (embedBlock: HTMLDivElement) => {
    const { blockUid } = getUids(embedBlock);
    const text = getTextByBlockUid(blockUid);
    const [_, heading] = text.match('^(.*)\({{)');
    const newHeading = heading.trim();

    if(newHeading) {
        const blockText = embedBlock.querySelector('.rm-embed-container .rm-block-main .rm-block-text');
        blockText.textContent = newHeading;
        blockText.setAttribute('data-roamjs-tweak-embed-header', newHeading);

        const parentSpan = embedBlock.querySelector('.rm-embed-container').closest('span');
        [...parentSpan.childNodes].filter(n => !(isElementNode(n) && n.classList.contains('rm-embed-container')))
             .forEach(n => parentSpan.removeChild(n));
    }
}
const mutateOnce = (className: string, mutate: (block: HTMLElement) => void) => (e: HTMLElement) => {
    const roamBlock = e.closest('.roam-block') as HTMLDivElement;
    if(!e.classList.contains(className)) {
        roamBlock.classList.add(className);
        mutate(roamBlock);
    }
}

createHTMLObserver({
    callback: mutateOnce('roamjs-tweak-embed', mutateEmbed),
    tag: 'div',
    className: 'rm-embed-container',
    removeCallback: () => {}
});

