import useCreateUserMutation from './useCreateUserMutation'

export default function useStocketMutation() {
  const createUser = useCreateUserMutation()
  return {
    createUser,
  }
}
