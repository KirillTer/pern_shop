import { Button, Form, Input, Layout, Row, Select } from "antd";
import { typeAPI } from "../../services/TypeService";
import { brandAPI } from "../../services/BrandService";
import { IType } from "../../models/IType";
import { IBrand } from "../../models/IBrand";

const { Option } = Select;

const DeviceForm = () => {

  const {
    data: brands,
    error: apiBrandError,
    isLoading: isBrandLoading,
  } = brandAPI.useFetchAllBrandsQuery({});

  const {
    data: types,
    error: apiTypeError,
    isLoading: isTypeLoading,
  } = typeAPI.useFetchAllTypesQuery({});

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const handleBrandChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleTypeChange = (value: string) => {
    console.log(`selected ${value}`);
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
            label="Device Name"
            name="name"
            rules={[{ required: true, message: 'Please input new device name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input new devide price' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
          >
            <Select
              defaultValue={brands[0].name}
              style={{ width: 120 }}
              onChange={handleBrandChange}
            >
              {brands.map((item: IBrand) => {
                return <Option value={item.name}>{item.name}</Option>
                // return {value: item.name, label: item.name}
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
          >
            <Select
            defaultValue={types[0].name}
              style={{ width: 120 }}
              onChange={handleTypeChange}
            >
              {types.map((item: IType) => {
                return <Option value={item.name}>{item.name}</Option>
              })}
            </Select>
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
 
export default DeviceForm;