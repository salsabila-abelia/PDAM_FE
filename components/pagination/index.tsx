/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

type Props = {
    count: number;
    perPage: number;
    currentPage: number;
}

export default function simplePagination({ count, perPage, currentPage }: Props) {
    const totalPage = Math.ceil(count / perPage);
    const isFirstPage = currentPage <= 1;
    const isLastPage = currentPage >= totalPage;

    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const safePage = Math.min(Math.max(page, 1), totalPage);

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", safePage.toString());
        router.push(`?${params.toString()}`);
    }

    const generatePages = () => {
        const pages = [];

        const start = Math.max(currentPage - 2, 1);
        const end = Math.min(currentPage + 2, totalPage);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    }

    console.log("count:", count);
    console.log("perPage:", perPage);
    console.log("totalPage:", totalPage);
    console.log("currentPage:", currentPage, typeof currentPage);

    return (
        <Pagination>
            <PaginationContent>
                {/*Previous */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => !isFirstPage && changePage(currentPage - 1)}
                        className={isFirstPage ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>

                {/*First Elipsis */}
                {currentPage > 3 && (
                    <>
                        <PaginationItem>
                            <PaginationLink onClick={() => changePage(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    </>
                )}

                {/* Number Pages */}
                {generatePages().map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => changePage(page)}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/*Last Elipsis */}
                {currentPage < totalPage - 2 && (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => changePage(totalPage)}>
                                {totalPage}
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}

                {/*Next */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => !isLastPage && changePage(currentPage + 1)}
                        className={isLastPage ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination >
    )
}