import useSWR from "swr";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

interface usePostProps {
  limit: number;
  currentPage: number;
  user?: boolean;
}

export default function usePost({
  limit,
  currentPage,
  user = false,
}: usePostProps) {
  const params: any = {
    limit: String(limit),
    skip: String((currentPage - 1) * limit),
  };

  if (user) {
    params.user = true;
  }

  const urlParams = new URLSearchParams(params).toString();
  const url = `/api/posts?${urlParams}`;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    posts: data?.posts,
    totalPosts: data?.total,
    totalPages: Math.ceil(data?.total / limit),
    loading: isLoading,
    mutate,
    isError: error,
  };
}
