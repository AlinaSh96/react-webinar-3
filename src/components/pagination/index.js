import {memo, useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import {usePagination, DOTS} from '../../hooks/use-pagination'

function Pagination(props){
  const paginationRange = usePagination({
    currentPage: props.currentPage,
    totalCount:  props.count,
    siblingCount: 10,
    limit:  props.limit,
  });

  return (
    <div className='pagination'>
      <ul className='pagination-wrap'>
      {paginationRange.map(pageNumber => {

        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }
        const className = (props.currentPage === pageNumber) ? 'pagination-item selected' : 'pagination-item';
        return (
          <li className={className}
              onClick={() => props.onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  skip: PropTypes.number,
  count: PropTypes.number,
};

export default memo(Pagination);
