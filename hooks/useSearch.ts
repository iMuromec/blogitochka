import useSWRMutation from "swr/mutation";

interface useSearchProps {
  limit: number;
  currentPage: number;
  search?: string;
  user?: boolean;
}

async function fetcher(url: string, arg: { arg: useSearchProps }) {
  const { limit, currentPage, search, user = false } = arg.arg;

  const params: any = {
    limit: String(limit),
    skip: String((currentPage - 1) * limit),
    search,
  };

  if (user) {
    params.user = true;
  }

  const urlParams = new URLSearchParams(params).toString();
  const searchUrl = `${url}?${urlParams}`;

  return fetch(searchUrl).then((res) => res.json());
}

export default function useSearch() {
  const { trigger } = useSWRMutation("/api/posts", fetcher);

  return { trigger };
}
