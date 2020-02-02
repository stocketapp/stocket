// @flow
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import functions from '@react-native-firebase/functions'
import { useSelector, useDispatch } from 'react-redux'
import { getStock } from 'api'

const UsersRef = firestore().collection('Users')

export default function useGetPortfolio(): {} {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { positions, loading } = useSelector(({ portfolio }) => portfolio)
  const dispatch = useDispatch()

  useEffect(() => {
    const setLoading = (payload: boolean) => {
      dispatch({ type: 'SET_PORTFOLIO_LOADING', payload })
    }

    return UsersRef.doc(uid)
      .collection('positions')
      .onSnapshot(snapshot => {
        const list = []
        snapshot.forEach(doc => {
          const arr = doc.data()
          list.push(arr)
        })
        if (list.length > 0) {
          dispatch({ type: 'SET_PORTFOLIO', payload: list })
        }

        if (loading) {
          setLoading(false)
        }
      })
  }, [dispatch, loading, uid])

  return { positions, loading }
}
