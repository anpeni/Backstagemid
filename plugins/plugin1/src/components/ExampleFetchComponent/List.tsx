import React from 'react';

export interface Sub {
  nick: string
  subMonths: number
  avatar: string
  description?: string
}
interface Props {
  subs: Array<Sub>
}


export default function List({ subs }: Props) {

  return (
      <ul>
          {
              subs.map(sub => {
                  return (
                      <li key={sub.nick}>
                          <img src={sub.avatar} alt={'Avatar for ${sub.nick}'}></img>
                          <h4>{sub.nick}(<small>{sub.subMonths}</small>)</h4>
                          <p>{sub.description?.substring(0, 100)}</p>

                      </li>
                  )
              })}

      </ul>
  )
}