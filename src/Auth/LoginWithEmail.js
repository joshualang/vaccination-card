import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { signInWithEmail } from './AuthServices'
import AuthCard from './AuthCard'
import { isValidDate } from '../dateHelper'
import isValidEmail from './isValidEmail'

import TextInput from '../TextInput'
import SubmitButton from '../common/SubmitButton'

export default function RegisterWithEmail() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        signInWithEmail(loginData.email, loginData.password)
      }}
    >
      <TextInput
        onChange={event =>
          setLoginData({
            ...loginData,
            email: event.target.value,
          })
        }
        type="email"
      >
        E-Mail
      </TextInput>
      <TextInput
        onChange={event =>
          setLoginData({
            ...loginData,
            password: event.target.value,
          })
        }
        type="password"
      >
        Passwort
      </TextInput>
      <SubmitButton
        isActive={isValidEmail(loginData.email) && loginData.password > 7}
      >
        Einloggen
      </SubmitButton>
    </form>
  )
}
