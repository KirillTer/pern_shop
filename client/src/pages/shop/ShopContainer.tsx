
import React, { useEffect, useState, useRef, useTransition } from "react";
import { Button, Col, Layout, Menu, MenuProps, Row, Segmented } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { deviceAPI } from "../../services/DeviceService";
import { typeAPI } from "../../services/TypeService";
import { brandAPI } from "../../services/BrandService";
import ShopItem from "./ShopItem";
// import PostModal from "./PostModal";
import { IDevice } from "../../models/IDevice";
import { IType } from "../../models/IType";
import { IBrand } from "../../models/IBrand";


const DeviceContainer = () => {

  const [typeId, setType] = useState('')
  const [brandId, setBrand] = useState('')
  
  const {
    data: devices,
    error: apiError,
    isLoading: isDevLoading,
    refetch,
  } = deviceAPI.useFetchAllDevicesQuery({brandId, typeId });

  const {
    data: types,
    error: apiTypeError,
    isLoading: isTypeLoading,
  } = typeAPI.useFetchAllTypesQuery({});

  const {
    data: brands,
    error: apiBrandError,
    isLoading: isBrandLoading,
  } = brandAPI.useFetchAllBrandsQuery({});

  const [updatePost] = deviceAPI.useUpdateDeviceMutation();
  const [deletePost] = deviceAPI.useDeleteDeviceMutation();

  const handleRemove = (device: IDevice) => {
    deletePost(device);
  };

  const handleUpdate = (device: IDevice) => {
    updatePost(device);
  };

  type MenuItem = Required<MenuProps>['items'][number];
  
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const onSelectType = (item: any) => {
    setType(item.key.split('-')[1])
  }

  const onSelectBrand = (item: any) => {
    const currentBrand = brands?.filter((i: IBrand) => i.name === item)
    setBrand(item ? currentBrand[0].id : '')
  }

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        <Col span={6}>
          {apiTypeError 
            ? <h1>{(apiTypeError as any).data.message}</h1>
            : isTypeLoading 
            ? <h1>Loading...</h1>
            : <Menu
              defaultSelectedKeys={['1']}
              mode="inline"
              onSelect={onSelectType}
              items={[getItem('All Types'), ...(types ? types.map((item: IType) => getItem(item.name)) : [])]}
            />
          }
        </Col>
        <Col span={18}>
          <div className="post__list">
            {/* <Button type="primary" onClick={() => refetch()}>Refetch</Button> */}
            {/* <PostModal createNewPost={handleCreate}/> */}
            {brands?.length && <Segmented size="large" options={[getItem('All Brands'), ...(brands.map((brand: IBrand) => (brand.name)))]} onChange={onSelectBrand}/>}
            <h1 >Devices list</h1>
            {apiError 
              ? <h1>{(apiError as any).data.message}</h1>
              : isDevLoading 
              ? <h1>Loading...</h1>
              : !devices['rows']?.length
              ? <div>No available devices</div>
              : <TransitionGroup>
                <div className="post__container">
                  {devices.rows?.map((device: IDevice) => (
                    <CSSTransition
                      key={device.id}
                      timeout={500}
                      classNames="postAnimation"
                    >
                      <ShopItem
                        remove={handleRemove}
                        update={handleUpdate}
                        key={device.id}
                        device={device}
                      />
                    </CSSTransition>
                  ))}
                </div>
              </TransitionGroup>
            }
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
 
export default DeviceContainer;