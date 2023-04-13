import useSWRMutation from "swr/mutation";

interface usePaginationProps {
  limit: number;
  currentPage: number;
}

async function fetcher(url: string, arg: { arg: usePaginationProps }) {
  const { limit, currentPage } = arg.arg;

  const params: any = {
    limit: String(limit),
    skip: String((currentPage - 1) * limit),
  };

  const urlParams = new URLSearchParams(params).toString();
  const searchUrl = `${url}?${urlParams}`;

  return fetch(searchUrl).then((res) => res.json());
}

export default function usePagination() {
  const { trigger } = useSWRMutation("/api/posts", fetcher);

  return { trigger };
}
