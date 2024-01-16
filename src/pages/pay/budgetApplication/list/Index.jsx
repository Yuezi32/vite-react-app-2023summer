import {
  Button,
  theme,
  Modal,
  Divider,
  Typography,
  Card,
  Form,
  Input,
  Radio,
  Space,
  Table,
  Tag,
} from 'antd';
import { logout, goto } from '@/api';
import { useRequest } from 'ahooks';
import { useContext, useEffect, useState } from 'react';
import { BasicLayoutContext } from '@/components/basicLayout/BasicLayout';

const { Title, Paragraph, Text, Link } = Typography;
export const appBaseUrl = '/nky/service/';

async function request(url, options = {}) {
  options = { method: 'POST', ...options };
  let newOptions = { ...options };
  if (['POST', 'PUT'].includes(options.method.toUpperCase())) {
    newOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'no-referrer',
      'x-Current-User-Id': 10149,
      'x-Current-Org-Id': 200,
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  return (
    fetch(url, newOptions)
      // .then((response) => checkStatus(response))
      .then((response) => response?.text())
      .then((text) => {
        if (text?.length) {
          try {
            return JSON.parse(text);
          } catch (err) {
            // do nothing
          }
        }
        return text;
      })
      .catch((error) => {
        // netErrorHint();
        return error;
      })
      .finally(() => {
        // clearRequestCount(newOptions)
      })
  );
}
async function requestGql(gql, bindVars) {
  const res = await request(`${appBaseUrl}graphql`, {
    method: 'POST',
    body: { query: gql, variables: bindVars },
  });

  return res;
}
async function getContract() {
  try {
    const gql = `{
      Contract{
        id
        name
        description
      }
    }`;
    const { data } = await requestGql(gql);
    const { Contract } = data;
    return Contract;
  } catch (error) {
    console.log(error);
    return [];
  }
}

function BudgetApplicationList() {
  const { setSpinning, senlin } = useContext(BasicLayoutContext);
  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorBgBase,
      colorPrimaryBg,
      colorPrimaryText,
      colorPrimaryHover,
    },
  } = theme.useToken();
  const { data: Contract, loading, run } = useRequest(getContract);

  useEffect(() => {
    if (loading === false) {
      setSpinning(false);
    }
  }, [loading]);
  const [form] = Form.useForm();
  const onFormLayoutChange = (values) => {
    console.log('values', values);
  };
  const onHeaderCell = (row) => {
    return {
      style: { background: colorPrimaryBg, color: colorPrimaryText },
    };
  };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 90,
      onHeaderCell,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 280,
      onHeaderCell,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      onHeaderCell,
    },
  ];

  const dataSource = Contract ?? [];

  return (
    <>
      <Title level={3}>事前申请</Title>
      <Card>
        <Form
          layout="inline"
          form={form}
          initialValues={{ layout: 'inline' }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: 'none' }}>
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value="inline">
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => run()}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <br />
      <Card>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          scroll={{ y: 400 }}
          virtual
          sticky
        />
      </Card>
    </>
  );
}

export default BudgetApplicationList;
