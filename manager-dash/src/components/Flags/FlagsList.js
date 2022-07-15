import { useEffect, useState } from 'react';
import ApiClient from '../../lib/ApiClient';
import { CreateFlagForm } from './CreateFlagForm';
import { FlagTable } from './FlagTable';

export const FlagsList = () => {
  const [ready, setReady] = useState(false);
  const [flags, setFlags] = useState([])

  useEffect(() => {
    const init = async () => {
      const flags = await ApiClient.getFlags();
      // also fetch audience list to use for the CreateFlagForm (should this be in a different effect hook?)
      setFlags(flags);
      setReady(true)
    }
    init();
  }, [])

  if (!ready) {
    return <>Loading...</>
  }

  return (
    <div className="list">
      <CreateFlagForm></CreateFlagForm>
      <FlagTable flags={flags} />
    </div>
  )
}