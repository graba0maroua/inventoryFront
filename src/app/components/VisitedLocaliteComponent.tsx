import React from 'react';
import { useFetchVisitedLocaliteQuery } from '../../features/ListeInventaire/LocalitesVisEtNonVisite';
import Loader from '../../Messages/Loader';

export default function VisitedLocaliteComponent() {
  const { data, isLoading, isError } = useFetchVisitedLocaliteQuery();

  return (
    <div>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <p>Une erreur s'est produite lors de la récupération des localités visitées.</p>
      ) : data ? (
        <ul className="visited-localities-list">
        {Object.entries(data).map(([key, value]) => (
          <li key={value.LOC_LIB} className="visited-locality-item">
            <span className="locality-lib">{value.LOC_LIB} <strong>:</strong> </span> 
            <span className='locality-id'>{value.LOC_ID}</span>
          </li>
        ))}
      </ul>
      ) : null}
    </div>
  );
}