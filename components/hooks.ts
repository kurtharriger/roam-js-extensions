import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { API_URL, AUTH0_AUDIENCE, FLOSS_API_URL } from "./constants";

export const getSingleCodeContent = (
  id: string
): string => `var existing = document.getElementById("${id}");
if (!existing) {
  var extension = document.createElement("script");
  extension.src = "https://roamjs.com/${id}.js";
  extension.id = "${id}";
  extension.async = true;
  extension.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(extension);
}`;

const copyCode = (items: string[]) => (e) => {
  const codeContent =
    items.length === 1
      ? `\`\`\`javascript
${getSingleCodeContent(items[0].replace(/ /g, "-").toLowerCase())}
\`\`\``
      : `\`\`\`javascript
var installScript = name => {
  var existing = document.getElementById(name);
  if (existing) {
    return;
  }  
  var extension = document.createElement("script");      
  extension.type = "text/javascript";
  extension.src = \`https://roamjs.com/$\{name}.js\`;
  extension.async = true;
  extension.id = name;
  document.getElementsByTagName("head")[0].appendChild(extension);
};
${items
  .map((f) => `installScript("${f.replace(/ /g, "-").toLowerCase()}");`)
  .join("\n")}
\`\`\``;
  e.clipboardData.setData(
    "text/plain",
    `{{[[roam/js]]}}
    ${codeContent.replace(/"/g, "\u0022")}
  `
  );
  e.clipboardData.setData(
    "roam/data",
    `["^ ","~:type","~:copy","~:copied-data",[["^ ","~:block/string","{{[[roam/js]]}}","~:block/children",[["^ ","~:block/string","~${codeContent
      .replace(/\n/g, "\\n")
      .replace(
        /"/g,
        '\\"'
      )}","~:block/open",true,"~:block/order",0]],"~:block/open",true]]]`
  );
  e.preventDefault();
};

export const useCopyCode = (
  setCopied: (flag: boolean) => void
): ((items: string[]) => void) =>
  useCallback(
    (items: string[]) => {
      document.addEventListener("copy", copyCode(items));
      document.execCommand("copy");
      document.removeEventListener("copy", copyCode(items));
      setCopied(true);
    },
    [setCopied]
  );

export const useIsMobile = (): boolean => {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile);
  }, [setMobile]);

  return mobile;
};

export const useAuthenticatedAxios = (): ((
  path: string
) => Promise<AxiosResponse>) => {
  const { getAccessTokenSilently } = useAuth0();
  return useCallback(
    (path: string) =>
      getAccessTokenSilently({
        audience: AUTH0_AUDIENCE,
        scope: "read:current_user",
      }).then((token) =>
        axios.get(`${FLOSS_API_URL}/${path}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
    [getAccessTokenSilently]
  );
};

export const useAuthenticatedAxiosPost = (): ((
  path: string,
  data: Record<string, unknown>
) => Promise<AxiosResponse>) => {
  const { getAccessTokenSilently } = useAuth0();
  return useCallback(
    (path: string, data: Record<string, unknown>) =>
      getAccessTokenSilently({
        audience: AUTH0_AUDIENCE,
        scope: "read:current_user",
      }).then((token) =>
        axios.post(`${API_URL}/${path}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ),
    [getAccessTokenSilently]
  );
};
