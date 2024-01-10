const Header = (props) => {
  return (
    <header>{props.title}</header>
  )
}

Header.defaultProps ={
  title: 'Todo list'
}
export default Header