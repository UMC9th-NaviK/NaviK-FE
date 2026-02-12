import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getGoalsList } from "../../apis/goals/goals";

export const useGoals = (pageSize = 10, sortBy = "RECENT") => {
    const observerRef = useRef<HTMLDivElement>(null);

    const query = useInfiniteQuery({
        queryKey: ['goals', sortBy, pageSize],
        queryFn: ({ pageParam }) => getGoalsList(pageParam as number, pageSize, sortBy),
        initialPageParam: undefined as number | undefined,
        getNextPageParam: (lastPage) => {
            if (!lastPage.result.hasNext || lastPage.result.nextCursor === "null" || !lastPage.result.nextCursor) {
                return undefined;
            }
            return lastPage.result.nextCursor;
        }
    });

    const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1 }
        );

        const currentElement = observerRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const goalsList = query.data?.pages.flatMap(page => page.result.content) || [];

    return {
        ...query,
        goalsList,
        observerRef
    };
};