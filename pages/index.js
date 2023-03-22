import Link from "next/link";
import { useState } from "react";
import Card from "./../components/card/Card";
import Pagination from "./../components/Pagination";
import { paginate } from "./../utils/paginate";
import useSWR from "swr";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRouter } from "next/router";

const fetcher = async (category = "") => {
  let url = "";
  if (category != "all") {
    url = `category=${category}&`;
  }
  let response = [];
  response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&${url}apiKey=${process.env.API_KEY}`
  );

  const medium = await response.json();
  const data = medium.articles;
  return data;
};

const HeadLines = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selection, setSelection] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filterdData, setFilterdData] = useState([]);
  const router = useRouter();

  const { data, error } = useSWR(selectedOption || "all", fetcher);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = async () => {
    if (selectedOption !== "") {
      const newData = await fetcher(selectedOption);
      setFilterdData(newData);
    } else {
      setFilterdData([]);
    }
    setCurrentPage(1);
  };
  const handleButtonClick2 = async () => {
    setSelectedOption(selection[0]);
    router.push(`/headLines/${selection[0].description}`);
  };

  let posts =
    filterdData.length > 0
      ? paginate(filterdData, currentPage, pageSize)
      : paginate(data, currentPage, pageSize);

  return (
    <div className="headContainer">
      <div className="searchContainer">
        <Typeahead
          id="basic-typeahead-single search"
          labelKey="title"
          onChange={setSelection}
          options={selectedOption && filterdData ? filterdData : data}
          placeholder="Choose a Title..."
          selected={selection}
          className="typeahead-margin"
        />

        <button onClick={handleButtonClick2}>Search</button>
      </div>
      <div className="radio-buttons-container">
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedOption === "all"}
            onChange={handleOptionChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="general"
            checked={selectedOption === "general"}
            onChange={handleOptionChange}
          />
          General
        </label>
        <label>
          <input
            type="radio"
            value="health"
            checked={selectedOption === "health"}
            onChange={handleOptionChange}
          />
          Health
        </label>
        <label>
          <input
            type="radio"
            value="science"
            checked={selectedOption === "science"}
            onChange={handleOptionChange}
          />
          Science
        </label>
        <label>
          <input
            type="radio"
            value="entertainment"
            checked={selectedOption === "entertainment"}
            onChange={handleOptionChange}
          />
          Entertainment
        </label>
        <label>
          <input
            type="radio"
            value="business"
            checked={selectedOption === "business"}
            onChange={handleOptionChange}
          />
          Business
        </label>
        <label>
          <input
            type="radio"
            value="technology"
            checked={selectedOption === "technology"}
            onChange={handleOptionChange}
          />
          Technology
        </label>
        <label>
          <input
            type="radio"
            value="sports"
            checked={selectedOption === "sports"}
            onChange={handleOptionChange}
          />
          Sports
        </label>
        <br />
        <button onClick={handleButtonClick}>Filter</button>
      </div>
      {posts.map((headline) => {
        return (
          <Link
            href={`/headLines/${headline.description}`}
            passHref
            style={{ color: "black", textDecoration: "none" }}
            key={headline.url}
          >
            <div>
              <Card headline={headline} />
            </div>
          </Link>
        );
      })}
      <Pagination
        items={data.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HeadLines;
