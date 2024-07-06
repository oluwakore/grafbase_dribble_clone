"use client"

import { useState, useEffect } from 'react'
import  { getProviders, signIn } from 'next-auth/react'


type Props = {}

interface Provider  {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider> | null;


const AuthProviders = (props: Props) => {

  const [providers, setProviders] = useState<Providers | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders()

      console.log(res)

      setProviders(res)
    }
    fetchProviders()
  }, [])

  if(providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, index: number) => (
          <button key={index} onClick={() => signIn()} >{provider.id}</button>
        ))}
      </div>
    )
  }


}

export default AuthProviders