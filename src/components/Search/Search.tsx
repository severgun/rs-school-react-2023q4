// import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../Pagination/Pagination";

export default function Search(): React.JSX.Element {
  const [searchInputState, setSearchInputState] = useState<string>("");
  const router = useRouter();
  const { search, pageNum = "1", pageSize = ITEMS_PER_PAGE.MIN } = router.query;

  useEffect(() => {
    const value = search && !Array.isArray(search) ? search : "";
    setSearchInputState(value);
  }, [search]);

  const handleSearch = (): void => {
    router.push({
      pathname: "/",
      query: {
        search: searchInputState,
        pageNum,
        pageSize,
      },
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInputState(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSearch}>
      <label>
        Search for Star Track Animals:
        <input
          type="text"
          name="search"
          placeholder="Type your request..."
          value={searchInputState}
          onChange={handleChange}
        />
      </label>
      <input type="button" value="Search" onClick={handleSearch} />
    </form>
  );
}
