import useCreateUserMutation from './useCreateUserMutation'

export default function useStocketMutations() {
  const createUser = useCreateUserMutation()
  return {
    createUser,
  }
}
