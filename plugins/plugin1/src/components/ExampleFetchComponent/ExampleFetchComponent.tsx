import React, { useEffect, useState, useRef } from 'react';
import './Index.css';
import List from './List'
import Form from './Form';

interface AppState {
  subs: Array<Sub>
  newSubsNumber: number;

}

export interface Sub {
  nick: string
  subMonths: number
  avatar: string
  description?: string
}

export type SubResponseFromApi = Array<{
  nick: string
  months: number
  profileUrl: string
  description?: string


}>



export function ExampleFetchComponent() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [newSubsNumber, setNewSubsNumber] = useState<AppState['newSubsNumber']>(0)
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const fetchSubs = ():Promise<SubResponseFromApi> =>{
      return fetch('http://localhost:3001/subs')
      .then(res => res.json())
    }
    const mapFromApiToSubs = (apiResponse: SubResponseFromApi): 
    Array<Sub> => {
      return apiResponse.map(subFromApi => {
        const {
          months: subMonths,
          profileUrl: avatar,
          nick,
          description
        } = subFromApi
        return {
          nick,
          description,
          avatar,
          subMonths
        }
      })


    }
    //setSubs(INITIAL_STATE)
    fetchSubs()
    .then(mapFromApiToSubs)
    .then(setSubs)
    
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(subs => [... subs, newSub])
    setNewSubsNumber(n => n+1)
  }

  return (
    <div className='App' ref={divRef}>
      <h1>Subscriptores</h1>

      <List subs={subs} />
      New subs: {newSubsNumber}
      <Form onNewSub={handleNewSub} />
    </div>

  );
}

//export default App;