import { Layout, Row, Tabs, TabsProps } from "antd";
import BrandForm from './BrandForm'
import TypeForm from './TypeForm'
import DeviceForm from './DeviceForm'

const Admin = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Add new Brand`,
      children: <BrandForm />,
    },
    {
      key: '2',
      label: `Add new Type`,
      children: <TypeForm />,
    },
    {
      key: '3',
      label: `Add new Device`,
      children: <DeviceForm />,
    },
  ];

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <Tabs defaultActiveKey="1" items={items} />
      </Row>
    </Layout>
  );
}
 
export default Admin;