import React from 'react'
import { useFetchVisitedLocaliteQuery } from '../../features/ListeInventaire/LocalitesVisEtNonVisite';

export default function VisitedLocaliteComponent() {
    const { data ,isLoading, isError } = useFetchVisitedLocaliteQuery();
  
    return (
    <div>
    {data ? (
        <ul>
            {data.map((locality) => (
            <li key={locality}>{locality}</li>
            ))}
        </ul>
        ) : (
        <p>Loading visited localities...</p>
        )}
    </div>
  )
}
