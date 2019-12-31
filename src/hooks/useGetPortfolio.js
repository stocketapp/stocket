// @flow
import { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'

const UsersRef = firestore().collection('Users')

export default function useGetPortfolio(): Array<any> {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(({ user }) => user)
  const { positions } = useSelector(({ portfolio }) => portfolio)

  useEffect(() => {
    async function getPortfolios() {
      try {
        const ref = await UsersRef.doc(currentUser?.uid)
          .collection('positions')
          .get()
        const arr = ref.docs.map(doc => doc.data())
        dispatch({
          type: 'SET_PORTFOLIO',
          positions: arr,
        })
      } catch (err) {
        console.log(err)
      }
    }
    getPortfolios()
  }, [])

  return positions
}
