// @flow
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'

const UsersRef = firestore().collection('Users')

export default function useGetPortfolio(): {} {
  const { uid } = useSelector(({ user }) => user.currentUser)
  const { positions, loading } = useSelector(({ portfolio }) => portfolio)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getPortfolios() {
      const setLoading = payload => {
        dispatch({ type: 'SET_PORTFOLIO_LOADING', payload })
      }

      try {
        setLoading(true)
        const ref = await UsersRef.doc(uid)
          .collection('positions')
          .get()
        const arr = ref.docs.map(doc => doc.data())
        if (arr.length > 0) {
          dispatch({ type: 'SET_PORTFOLIO', payload: arr })
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getPortfolios()
  }, [])

  return { positions, loading }
}
