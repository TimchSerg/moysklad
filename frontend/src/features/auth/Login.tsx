import * as React from 'react'
// import { setCredentials } from './authSlice'

// import { ProtectedComponent } from './ProtectedComponent'
import { useLoginMutation } from '../../app/services/auth'
import type { UserResponse } from '../../app/services/auth'
import { Field, Form } from 'react-final-form'
import Logotype from 'shared/components/logotype'
import { composeValidators, requiredValidator } from 'shared/components/form/validators'

import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'
import { PasswordField, TextField } from 'shared/components/form/fields'


export const Login = () => {
  const [formState] = React.useState<UserResponse>({
    login: '',
    password: '',
  })
  const auth = useAuth()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()

  React.useEffect(() => {
    if(auth.isAuth) navigate('/')
  }, [auth]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (values: UserResponse) => {
    login(values).then(() => navigate('/'))
  }

  return (
    <div className="col-12 flex justify-content-center align-items-center" style={{height: '100dvh'}}>
      <div className="col-12 md:col-4 p-xl-3 p-0">
        <div className="col-12 p-0 flex justify-content-center flex-column align-items-center">
          <Logotype className="flex justify-content-center "/>
          <h3 className="m-2">Авторизация</h3>
        </div>
          
          {isLoading && <span>Ожидание...</span>}

        <Form
          onSubmit={onSubmit}
          initialValues={formState}
          render={({ handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit}>
              
              <div className="mt-1 mb-2">
                <Field
                  validate={composeValidators(requiredValidator)}
                  name="login"
                  label="Логин:"
                  render={TextField}
                  settings={{
                    placeholder: 'Введите логин от сервиса "МойСклад"',
                  }}
                />
              </div>

              <div className="mt-1 mb-2">
                <Field
                  validate={requiredValidator}
                  name="password"
                  label="Пароль:"
                  render={PasswordField}
                  settings={{
                    placeholder: "Введите пароль",
                    feedback: false,
                  }}
                  icon={["fas", "lock"]}
                />
              </div>

              <div className="mt-1">
                <Button className="btn btn-primary col-12"label="Авторизоваться" disabled={submitting} />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export default Login