import { FormsData } from '@/features/shared';
import { selectCountriesList, useAppSelector } from '@/store';
import React, { ChangeEvent, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Autocomplete.module.css';

type PropsType = {
  register: UseFormRegister<FormsData>;
};

export default function Autocomplete({
  register,
}: PropsType): React.JSX.Element {
  const { countriesList } = useAppSelector(selectCountriesList);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [countryValue, setCountryValue] = useState<string>('');

  const applySuggestion = (event: React.MouseEvent<HTMLLIElement>) => {
    setCountryValue(event.currentTarget.innerText);
    setSuggestions([]);
  };

  const handleAutocomplete = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value) {
      setCountryValue(value);
      setSuggestions([]);
      return;
    }

    setCountryValue(value);

    const filteredList = countriesList.filter((country) =>
      country.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredList);
  };

  return (
    <div className={styles.autocompleteContainer}>
      <input
        type="text"
        value={countryValue}
        {...register('country', {
          required: true,
          onChange: handleAutocomplete,
        })}
      />
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
