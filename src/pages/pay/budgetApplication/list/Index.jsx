import { Button, theme, Modal, Divider, Typography, Card, Form, Input, Radio, Space, Table, Tag } from 'antd';
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
  const { data: Contract, loading } = useRequest(getContract);
  console.log('loading', loading, senlin);
  useEffect(() => {
    console.log('Contract', Contract);
  }, [Contract]);
  useEffect(() => {
    if (loading === false) {
      setSpinning(false);
    }
  }, [loading]);
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('inline');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return (
    <>
      <Title level={3}>事前申请</Title>
      <Card>
        <Form
          layout="inline"
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}>
          <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
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
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table columns={columns} dataSource={data} />
      </Card>
    </>
  );
}

export default BudgetApplicationList;
