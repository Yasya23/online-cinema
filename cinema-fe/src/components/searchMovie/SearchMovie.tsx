import { useState } from 'react';
import Spinner from '@/components/spinner/Spinner';
import ErrorMessage from '@/components/responseMessages/ErrorMessage';
import NoResultsMessage from '@/components/responseMessages/NoResultsMessage';
import Card from '@/components/cards/movieCard/MovieCard';
import { useMoviesByQuery } from '@/hooks/useMovies';
import { useDebounce } from '@/hooks/useDebounce';
import { Movie } from '@/types/movie.type';
import Input from '../input/Input';
import { FiSearch } from 'react-icons/fi';
import styles from './search.module.scss';

export const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const { data, error, isLoading } = useMoviesByQuery({
    page: 1,
    limit: 10,
    query: debouncedQuery,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Input
          value={query}
          icon={FiSearch}
          type="search"
          onChange={handleInputChange}
          placeholder="Search for movies..."
          hasMessages={false}
          label="Search"
          isLabelVisibilityHidden={true}
        />
        {error && <ErrorMessage />}
        {isLoading && <Spinner />}
        {!isLoading && !error && data?.length === 0 && <NoResultsMessage />}
        {!isLoading && !error && !!data?.length && (
          <div>
            {data.map((movie: Movie) => (
              <Card key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchMovies;
