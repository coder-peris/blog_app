const Footer = () => {
  const YEAR = (new Date()).getFullYear();
  return (
    <footer className='footer'>
      <h2>Copyright &copy; {YEAR}</h2>
    </footer>
  )
}

export default Footer;