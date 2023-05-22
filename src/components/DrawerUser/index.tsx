import { Button, Drawer, Form, Input } from 'antd'
import { buildUrl } from 'services/axios/ip'
import { ComToken, SemToken } from 'services/crud'
import { LocalStorage } from 'services/crud/LocalStorage.ts'
import { useAppStore } from 'state'

const testServer = async () => {
  const url = buildUrl('user', {})
  const response = await ComToken.get(url)

  console.log('railway server response', response)
}

type LoginData = {
  email: string
  password: string
}

export function DrawerUser(): JSX.Element {
  const showDrawerUser = useAppStore((state) => state.showDrawerUser)
  const setShowDrawerUser = useAppStore((state) => state.setShowDrawerUser)

  const [loginForm] = Form.useForm<LoginData>()

  const login = async () => {
    const loginData = await loginForm.validateFields()

    const url = buildUrl('user/login', {})

    const response = await SemToken.post(url, loginData)

    if (response && response.data.apiMessage.foundUser) {
      LocalStorage.accessToken = response.data.apiMessage.accessToken
    }
  }

  return (
    <Drawer
      open={showDrawerUser}
      closable
      onClose={() => {
        setShowDrawerUser(false)
      }}
      maskClassName='bg-cyan-300'
    >
      <Form
        layout='vertical'
        className='rounded-md border-2 p-4'
        onFinish={login}
        form={loginForm}
      >
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            { required: true, message: 'Por favor insira um email cadastrado.' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Senha'
          rules={[{ required: true, message: 'Por favor insira sua senha.' }]}
        >
          <Input type='password' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Enviar
          </Button>
        </Form.Item>
      </Form>

      <Button onClick={testServer}>test Server</Button>
    </Drawer>
  )
}
