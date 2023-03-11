import { Card, Col, Row, Spin, Typography } from 'antd';
import { useParams } from 'react-router-dom'
import { deviceAPI } from "../../services/DeviceService";
const { Title } = Typography;

const { Meta } = Card;

function Device() {
  const { id } = useParams();

  const {
    data,
    error,
    isLoading,
  } = deviceAPI.useFetchByIdQuery({id});

  return ( 
    <>
      <Row justify="center">
        <Typography>
          <Title level={2}>Device Details</Title>
        </Typography>
      </Row>
      {isLoading && <Spin />}
      {error && <h1>{error as string}</h1>}
      <Col span={6} offset={9}>
        {error 
          ? <h1>{(error as any).data.message}</h1>
          : isLoading 
          ? <h1>Loading...</h1>
          : <Card
              hoverable
              style={{ width: 300 }}
              className="postItem"
              cover={<img alt="example" height={150} src={`http://localhost:5001/${data.img}`} />}
              extra={`Raiting - ${data.rating}`}
            >
              <Meta title={data.name} description={data.price} />
            </Card>
        }
      </Col>
    </>
  );
}

export default Device;