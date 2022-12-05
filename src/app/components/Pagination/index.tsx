import styles from '../Pagination/Pagination.module.css';

export const Pagination = ({takePage, totalNames, paginate}: any) => {
  const pageNumber = [];

  for(let i=1; i<=Math.ceil(totalNames/takePage); i++ ) {
    pageNumber.push(i);
  }

  return(
    <div className={styles.pagination}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageNumber.map(number =>(
            <li className='page-item' key={number}>
              <a onClick={() => paginate(number)} href="#" className='page-link'>{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>  
  )
}