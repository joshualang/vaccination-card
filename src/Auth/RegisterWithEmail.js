import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { signUpWithEmail } from './AuthServices'
import AuthCard from './AuthCard'
import { isValidDate } from '../dateHelper'

import TextInput from '../TextInput'
import SubmitButton from '../common/SubmitButton'

export default function RegisterWithEmail() {
  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
  })
  return (
    <AuthCard>
      <form
        onSubmit={event => {
          event.preventDefault()
          signUpWithEmail(
            registrationData.email,
            registrationData.password,
            registrationData.name,
            registrationData.birth
          )
        }}
      >
        <TextInput
          onChange={event =>
            setRegistrationData({
              ...registrationData,
              email: event.target.value,
            })
          }
          type="email"
        >
          E-Mail
        </TextInput>
        <TextInput
          onChange={event =>
            setRegistrationData({
              ...registrationData,
              password: event.target.value,
            })
          }
          type="password"
        >
          Passwort
        </TextInput>
        <TextInput
          onChange={event =>
            setRegistrationData({
              ...registrationData,
              name: event.target.value,
            })
          }
        >
          Name
        </TextInput>
        <TextInput
          onChange={event =>
            setRegistrationData({
              ...registrationData,
              birth: event.target.value,
            })
          }
          valid={isValidDate(registrationData.birth)}
        >
          Geburtsdatum
        </TextInput>
        <SubmitButton>Registrieren</SubmitButton>
      </form>
    </AuthCard>
  )
}
