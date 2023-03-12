import { Button, Form, Input, Layout, Row } from "antd";
import { brandAPI } from "../../services/BrandService";

const BrandForm = () => {

  const [createBrand] = brandAPI.useCreateBrandMutation()

  const onFinish = async (value: any) => {
    await createBrand(value)
  };

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: 'Please input new brand name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Layout>
  );
}
 
export default BrandForm;