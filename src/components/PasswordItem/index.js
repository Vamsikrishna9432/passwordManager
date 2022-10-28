import './index.css'

const PasswordItem = props => {
  const {each, isChecked, onDeletingPassword} = props
  const {username, password, website, id} = each

  const onRemove = () => {
    onDeletingPassword(id)
  }

  const third = isChecked ? (
    <p className="name">{password}</p>
  ) : (
    <img
      className="star-image"
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    />
  )

  return (
    <li className="password-item-container">
      <div className="letter-container">
        <p className="first-letter">{username.slice(0, 1)}</p>
      </div>
      <div className="details-container">
        <p className="name">{website}</p>
        <p className="name">{username}</p>
        {third}
      </div>
      <button
        className="delete-btn"
        type="button"
        onClick={onRemove}
        testid="delete"
      >
        <img
          className="delete-icon"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        />
      </button>
    </li>
  )
}

export default PasswordItem
