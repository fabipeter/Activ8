import { observer } from "mobx-react-lite";
import React from "react";

const PaginationComponent = (props: any) => {
  const { postsPerPage, totalPosts, paginate, currentPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <a
          className="page-link"
          onClick={(e) =>
            currentPage > 1 ? paginate(currentPage - 1) : e.preventDefault()
          }
          aria-label="Previous"
        >
          <span aria-hidden="true">
            <i className="fa-solid  fa-chevron-left"></i>
          </span>
        </a>
        {pageNumbers
          .slice(
            currentPage <= 10
              ? 0
              : currentPage % 10 !== 0
              ? currentPage - (currentPage % 10)
              : currentPage - 10,
            currentPage <= 10
              ? 10
              : currentPage % 10 !== 0
              ? currentPage + (10 - (currentPage % 10))
              : currentPage
          )
          .map((number) => (
            <li key={number} className="page-item cursorPointer">
              <a
                onClick={() => paginate(number)}
                className={
                  currentPage === number ? "page-link currentPage" : "page-link"
                }
              >
                {number}
              </a>
            </li>
          ))}
        <a
          className="page-link"
          onClick={(e) =>
            currentPage !== pageNumbers.length
              ? paginate(currentPage + 1)
              : e.preventDefault()
          }
          aria-label="Next"
        >
          <span aria-hidden="true">
            <i className="fa-solid  text-dark fa-chevron-right"></i>
          </span>
        </a>
      </ul>
    </nav>
  );
};

export default observer(PaginationComponent);
