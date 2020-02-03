import { useState, useEffect } from 'react'
import { getUser, getProfile } from '../helper/services'

export default function useLoadingEffect(user, lastRefresh, profileId) {
  const [data, setData] = useState({})
  const [profiles, setProfiles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getUser(user.uid, user._lat).then(loadedData => {
      setProfiles(loadedData.user.profiles)
      const profileIndex = loadedData.user.profiles.findIndex(
        profile => profile._id === profileId
      )
      getProfile(
        loadedData.user.profiles[profileIndex > -1 ? profileIndex : 0]._id,
        user._lat
      ).then(result => {
        setData(result.profile)
        setIsLoading(false)
      })
    })
  }, [lastRefresh, profileId])
  return { data, profiles, isLoading }
}
