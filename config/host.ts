import { createUrl } from "@/lib/utils";

const hostUrl = createUrl();

export const hostSite = {
  logoSrc: `${hostUrl}static/logo.png`,
  name: "Блог — и точка",
  url: hostUrl,
};
