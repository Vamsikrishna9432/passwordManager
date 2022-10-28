import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    isChecked: false,
    searchInput: '',
  }

  onSubmitingForm = event => {
    event.preventDefault()
    const {website, password, username} = this.state
    const newPassword = {
      id: v4(),
      website,
      password,
      username,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      password: '',
      username: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeSearchInput = event => {
    this.setState(prev => ({searchInput: event.target.value}))
  }

  onDeletingPassword = id => {
    const {passwordsList} = this.state

    const newPass = passwordsList.filter(each => each.id !== id)

    this.setState(prevState => ({passwordsList: newPass}))
  }

  renderNoPasswordsView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />

      <p>No Passwords</p>
    </div>
  )

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      isChecked,
      searchInput,
    } = this.state

    const filteredResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const lengthofList = filteredResults.length

    return (
      <div className="password-manager-app-container">
        <div className="logo-container">
          <img
            className="logo"
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          />
        </div>
        <div className="top-card-container">
          <div className="image-container">
            <img
              className="image"
              alt="password manager"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            />
          </div>

          <div className="input-container">
            <form className="form-container" onSubmit={this.onSubmitingForm}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-box-container">
                <img
                  className="box-image"
                  alt="website"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                />
                <input
                  className="box"
                  placeholder="Enter Website"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-box-container">
                <img
                  className="box-image"
                  alt="username"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                />
                <input
                  className="box"
                  placeholder="Enter Username"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-box-container">
                <img
                  className="box-image"
                  alt="password"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                />
                <input
                  className="box"
                  placeholder="Enter Password"
                  type="password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>

              <div className="btn-container">
                <button className="btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="bottom-container">
          <div className="search-container">
            <div className="text-container">
              <h1 className="bottom-heading">Your Passwords</h1>
              <div className="count">
                <p className="number">{lengthofList}</p>
              </div>
            </div>

            <div className="input-box">
              <img
                className="box-image"
                alt="search"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              />
              <input
                type="search"
                className="box4"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>

          <hr className="line" />

          <div className="check-box-container">
            <div className="check">
              <input
                type="checkbox"
                className="ch-box"
                id="ch-text"
                onChange={this.onChecked}
              />
              <label className="ch-text" htmlFor="ch-text">
                Show Passwords
              </label>
            </div>
          </div>
          {lengthofList === 0 ? (
            this.renderNoPasswordsView()
          ) : (
            <ul className="passwords-container">
              {passwordsList.map(each => (
                <PasswordItem
                  each={each}
                  key={each.id}
                  isChecked={isChecked}
                  onDeletingPassword={this.onDeletingPassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
