import  * as re from "../entry-helpers";
import  * as rc from "roam-client";

const internal =   { ...re, ...rc } ;

// @ts-ignore
window.internal = internal;
console.log('internals exposed');
export { internal };
