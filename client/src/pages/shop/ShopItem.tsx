import React, { FC } from 'react';
import { IDevice } from "../../models/IDevice";
import { Card } from 'antd';

const { Meta } = Card;

interface UserItemProps {
  device: IDevice;
  remove?: (post: IDevice) => void;
  update?: (post: IDevice) => void;
}

const PostItem: FC<UserItemProps> = ({ device, remove, update }) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (remove) remove(device)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const name = prompt() || ""
    if (update) update({ ...device, name })
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      className="postItem"
      cover={<img alt="example" height={150} src={`http://localhost:5001/${device.img}`} />}
    >
      <Meta title={device.name} description={device.price} />
    </Card>

    // <div className="postItem" onClick={handleUpdate}>
    //   <div className="postItem_header">
    //     {device.id}. {device.name}
    //     {/* <p>Brand - {device}</p> */}
    //     {/* <Button type="primary" danger onClick={handleRemove}>Delete</Button> */}
    //   </div>
    // </div>
  );
};

export default PostItem;