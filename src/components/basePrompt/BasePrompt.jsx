import { Typography, Modal, theme } from 'antd';
import ReactRouterPrompt from 'react-router-prompt';
import { Fragment, useState } from 'react';
const { Title } = Typography;

export function BasePrompt() {
  const [visible, setVisible] = useState(true);
  const {
    token: { colorPrimaryBg, colorPrimaryText, colorBgContainer, colorFill },
  } = theme.useToken();

  return (
    <Fragment>
      <ReactRouterPrompt when={true}>
        {({ isActive, onConfirm, onCancel }) => {
          if (isActive) {
            return (
              <Modal
                style={{ top: 150 }}
                bodyStyle={{ height: 80 }}
                visible={isActive}
                closable={false}
                onOk={onConfirm}
                onCancel={onCancel}>
                <Title style={{ color: colorPrimaryText, paddingTop: 12 }} level={5}>
                  确认是否退出？
                </Title>
                <p style={{ paddingTop: 12 }}>请注意：退出后已经编辑过的内容将无法保存</p>
              </Modal>
            );
          }
          return <div style={{ position: 'fixed', zIndex: 100, right: 50, bottom: 50 }}>aiya</div>;
        }}
      </ReactRouterPrompt>
    </Fragment>
  );
}

export default BasePrompt;
