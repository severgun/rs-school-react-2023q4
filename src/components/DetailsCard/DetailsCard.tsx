import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IAnimal } from '@/types';
import { useEffect, useState } from 'react';
import getAnimalByUid from '@/util/getAnimalByUid';

export default function DetailsCard(): React.JSX.Element {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [animalDetailsState, setAnimalDetailsState] = useState<IAnimal>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDetailsData = async () => {
      if (params.id) {
        setLoading(true);
        const res = await getAnimalByUid(params.id);
        setAnimalDetailsState(res?.animal);
        setLoading(false);
      }
    };

    getDetailsData();
  }, [params.id]);

  return (
    <div>
      <div>
        {!loading && animalDetailsState ? (
          <>
            <h3>{animalDetailsState.name}</h3>
            <h4>Details:</h4>
            <ul>
              <li>
                {`Earth Animal: ${
                  animalDetailsState.earthAnimal ? 'True' : 'False'
                }`}
              </li>
              <li>
                {`Earth Insect: ${
                  animalDetailsState.earthInsect ? 'True' : 'False'
                }`}
              </li>
              <li>
                It is avian: {animalDetailsState.avian ? 'True' : 'False'}
              </li>
              <li>
                It is feline: {animalDetailsState.feline ? 'True' : 'False'}
              </li>
              <li>
                It is canine: {animalDetailsState.canine ? 'True' : 'False'}
              </li>
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
