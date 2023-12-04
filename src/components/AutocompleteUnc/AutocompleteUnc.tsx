import { selectCountriesList, useAppSelector } from '@/store';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import styles from './AutocompleteUnc.module.css';

const AutocompleteUnc = forwardRef<HTMLInputElement>(
  function FormField(props, ref) {
    const { countriesList } = useAppSelector(selectCountriesList);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!, []);

    const applySuggestion = (event: React.MouseEvent<HTMLLIElement>) => {
      if (innerRef.current) {
        innerRef.current.value = event.currentTarget.innerText;
        setSuggestions([]);
      }
    };

    const handleAutocomplete = () => {
      const value = innerRef.current?.value;

      if (!value) {
        setSuggestions([]);
        return;
      }

      const filteredList = countriesList.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredList);
    };

    return (
      <div className={styles.autocompleteContainer}>
        <input type="text" ref={innerRef} onChange={handleAutocomplete} />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((country, idx) => (
              <li
                key={idx}
                className={styles.suggestItem}
                onClick={applySuggestion}
              >
                <span>{country}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

export default AutocompleteUnc;
