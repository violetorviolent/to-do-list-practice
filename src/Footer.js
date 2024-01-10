
const Footer = ({length}) => {
  return (
    <footer> {length} {length !== 1 ? 'goals' : 'goal' } left </footer>
  )
}

export default Footer