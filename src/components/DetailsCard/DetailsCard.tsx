import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetAnimalByUidQuery } from '@/services/animalsApi';

export default function DetailsCard(): React.JSX.Element {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { data, isLoading, isFetching } = useGetAnimalByUidQuery(
    params.id || ''
  );
  const animalDetails = data?.animal;
  const navigate = useNavigate();

  return (
    <div>
      <div>
        {(!isLoading || !isFetching) && animalDetails ? (
          <>
            <h3>{animalDetails.name}</h3>
            <h4>Details:</h4>
            <ul>
              <li>
                {`Earth Animal: ${
                  animalDetails.earthAnimal ? 'True' : 'False'
                }`}
              </li>
              <li>
                {`Earth Insect: ${
                  animalDetails.earthInsect ? 'True' : 'False'
                }`}
              </li>
              <li>It is avian: {animalDetails.avian ? 'True' : 'False'}</li>
              <li>It is feline: {animalDetails.feline ? 'True' : 'False'}</li>
              <li>It is canine: {animalDetails.canine ? 'True' : 'False'}</li>
            </ul>
          </>
        ) : (
          'Loading...'
        )}
      </div>
      <div>
        <button
          onClick={() =>
            navigate({ pathname: '/', search: searchParams.toString() })
          }
        >
          Close
        </button>
      </div>
    </div>
  );
}
