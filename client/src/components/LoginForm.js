import { Layout, Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import httpClient from '../auth.helper';
const { Content } = Layout;
const layout = {
  labelCol: { span: 8, offset: 4 },
  wrapperCol: { span: 16, offset: 4 },
};

function LoginForm(props) {
  useEffect(() => {
    props.changePage('login');
  });
  const history = useHistory();

  const onFinish = (values) => {
    const { firstname, lastname } = values;
    httpClient.logIn(firstname, lastname).then((user) => {
      if (user) {
        props.onSuccess(user);
        history.push('/');
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content>
      <div className="site-layout-content">
        <Form
          {...layout}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="First Name"
            name="firstname"
            rules={[
              { required: true, message: 'Please input your first name!' }
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input size="large"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
}

export default LoginForm;
