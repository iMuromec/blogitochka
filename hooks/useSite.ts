import useSWR, { Fetcher } from "swr";

import { Site } from "@prisma/client";

const fetcher: Fetcher<Site, string> = (...args) =>
  fetch(...args).then((res) => res.json());

export default function useSite() {
  const { data, error, isLoading } = useSWR(`/api/site`, fetcher);

  return {
    site: data,
    loading: isLoading,
    error,
  };
}
