import {getChildRefUidsByBlockUid, getTextTreeByBlockUid} from "../entry-helpers";
import {getUids} from "roam-client";
import  * as eh from "../entry-helpers";
import  * as rc from "roam-client";

// const getButtonConfig = (target: HTMLButtonElement, targetCommand: string) => {
//     console.log({ text: target.innerText });
//     const rawParts = target.innerText
//         .substring(targetCommand.length + 1)
//         .split(" ");
//     let quotedWord = "";
//     const restOfButtonText: string[] = [];
//     for (const part of rawParts) {
//         if (quotedWord) {
//             if (part.endsWith('"')) {
//                 restOfButtonText.push(
//                     `${quotedWord} ${part.substring(0, part.length - 1)}`
//                 );
//                 quotedWord = "";
//             } else {
//                 quotedWord = `${quotedWord} ${part}`;
//             }
//         } else {
//             if (part.startsWith('"')) {
//                 quotedWord = part.substring(1);
//             } else {
//                 restOfButtonText.push(part);
//             }
//         }
//     }
//     const numPairs = Math.floor(restOfButtonText.length / 2);
//     const buttonConfig = {} as { [key: string]: string };
//     for (let i = 0; i < numPairs; i++) {
//         buttonConfig[restOfButtonText[i * 2]] = restOfButtonText[i * 2 + 1];
//     }
//     return buttonConfig;
// };

const clickEventListener = (
    targetCommand: string,
    callback: (blockUid: string) => void
) => async (e: MouseEvent) => {
    const htmlTarget = e.target as HTMLElement;
    if (
        htmlTarget &&
        htmlTarget.tagName === "BUTTON" &&
        htmlTarget.innerText
            .toUpperCase()
            .trim()
            .startsWith(targetCommand.toUpperCase())
    ) {
        const target = htmlTarget as HTMLButtonElement;

        const parentBlockDiv = target.closest('[id]');
        const { blockUid } = getUids(parentBlockDiv as HTMLDivElement);

        callback(blockUid);
    }

};

export const addButtonListener = (
    targetCommand: string,
    callback: (blockUid: string) => void
) =>
    document.addEventListener(
        "click",
        clickEventListener(targetCommand, callback)
    );


const runQuery = (blockUid: string): void => {
    const { children } = getTextTreeByBlockUid(blockUid);
    const args = children.map(c => c.text);
    // @ts-ignore
    const result = window.roamAlphaAPI.q(...args);
    console.log(args);
    console.log(result);
}

addButtonListener("my-query", runQuery);

const roamExtensionMethods = {
    ...eh,
    ...rc,
    roam42: window.roam42,
    roamDatomicAlphaAPI: window.roamDatomicAlphaAPI,
    roamAlphaAPI: window.roamAlphaAPI,
    roamjs: window.roamjs
}


// @ts-ignore
window.roamExtensionMethods = roamExtensionMethods;
console.log(roamExtensionMethods);
