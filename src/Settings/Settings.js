import React, { useState, useRef } from 'react'
import styled from 'styled-components/macro'
import Head from '../Head'
import SectionText from '../common/text/SectionText'
import { Link } from 'react-router-dom'
import checkmark from '../img/checkmark.svg'
import ToggleSwitchInput from '../ToggleSwitchInput'
import TextInput from '../TextInput'
import DetailsText from '../common/text/DetailsText'
import PersonalInformation from './PersonalInformation'
import DiseasesSelected from './DiseasesSelected'

import { stringifyDate, isValidDate } from '../dateHelper'
import { updateUserDisplayName } from '../Auth/AuthServices'

export default function({
  userAge,
  userName,
  updateSettingsInBackend,
  diseases,
}) {
  const refSubmit = useRef(null)
  const [settings, setSettings] = useState({
    name: userName,
    age: stringifyDate(new Date(userAge)),
    diseases: { ...diseases },
  })
  console.log(settings)
  function onFormNameChange(event) {
    setSettings({ ...settings, name: event.target.value })
  }
  function onFormBirthChange(event) {
    setSettings({ ...settings, age: event.target.value })
  }
  function onDiseaseChange(disease, event) {
    console.log(event.target.checked)
    setSettings({
      ...settings,
      diseases: { ...settings.diseases, [disease]: event.target.checked },
    })
  }

  return (
    <>
      <Head
        headline="Einstellungen"
        topRight={
          <Link to="/" onClick={() => refSubmit.current.click()}>
            <img height="18px" width="18px" src={checkmark} alt="submit" />
          </Link>
        }
      />
      <Container>
        <Settings
          onSubmit={event => {
            event.preventDefault()
            settings.name !== userName && updateUserDisplayName(settings.name)
            updateSettingsInBackend({
              age: settings.age,
              settings: settings.diseases,
            })
          }}
        >
          <div>
            <PersonalInformation
              settings={settings}
              onFormNameChange={onFormNameChange}
              onFormBirthChange={onFormBirthChange}
              isValidDate={isValidDate}
            ></PersonalInformation>
          </div>
          <div>
            <DiseasesSelected
              onDiseaseChange={onDiseaseChange}
              settings={settings}
            ></DiseasesSelected>
          </div>
          <button
            ref={refSubmit}
            type="submit"
            style={{ display: 'none' }}
          ></button>
        </Settings>
      </Container>
    </>
  )
}

const Settings = styled.form`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-right: 4px;
`
const Indent = styled.div`
  padding-left: 8px;
`
const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
`
