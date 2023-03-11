import { Button, Form, Input, Layout, Row } from "antd";
import { useNavigate } from "react-router-dom";
// import { authUser } from '../../store/reducers/auth/ActionCreators';
import { useAppDispatch } from '../../hooks/redux';
import { RouteNames } from '../../components/AppRouter';

const Admin = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <h1>Admin</h1>
      </Row>
    </Layout>
  );
}
 
export default Admin;