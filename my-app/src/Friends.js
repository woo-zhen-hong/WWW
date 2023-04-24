import React, { useEffect, useState } from 'react';
import { Tag, Table, Modal, Space, Row, Col, Button, Avatar, message, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
const { Search } = Input;
const Friends = () => {
    const [name, setName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [modalOpen, setModalOpen] = useState(false);
    const [friend, setFriend] = useState(false);
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '債務情況',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '資訊',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {
                        tags === '還錢' ? <>
                            <Tag color={'volcano'}>
                                {tags}
                            </Tag>
                        </> : <>
                            <Tag color={'geekblue'}>
                                {tags}
                            </Tag>
                        </>
                    }
                </>
            ),
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="確定要刪除好友嗎"
                    okText="確定"
                    cancelText="取消"
                    onConfirm={e => {
                        setData(data.filter(item => item.key != record.key));
                        messageApi.open({
                            type: 'success',
                            content: '刪除成功',
                        });
                    }}
                >
                    <a style={{ color: 'red' }}>刪除</a>

                </Popconfirm>
            ),
        },
    ];
    const [data, setData] = useState([
        {
            key: '1',
            name: 'John Brown',
            age: 100,
            tags: '還錢',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: -80,
            tags: '欠錢',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 200,
            tags: '還錢',
        },
    ]);
    const onSearch = (value) => {
        setName(value)
        setFriend(true);
    }
    const addfriend = () => {
        setModalOpen(false);
        messageApi.open({
            type: 'success',
            content: '你已和mingyao成為朋友囉～～',
        });
    }
    return (
        <>
            {contextHolder}
            <Modal
                style={{ pointerEvents: 'auto' }}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                setOpen={setModalOpen}
                width={400}
                footer={false}
                className="modalStyle2"
                wrapClassName={"modalStyle2"}
                modalRender={(e) => <>
                    <Col span={24} style={{ backgroundColor: '#D7F5FF' }}>
                        <Row justify={'center'} align={'middle'} style={{ padding: '10px' }}>
                            <Col style={{ fontSize: '1.2rem', fontWeight: 400 }}>新增好友</Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                        <Row gutter={[8, 16]} justify={'center'} >
                            <Col span={24}>
                                <Row justify={'center'} align={'middle'}>
                                    <Col>好友帳號：</Col>
                                    <Col>
                                        <Search
                                            placeholder="請輸入好友帳號"
                                            onSearch={onSearch}
                                            style={{
                                                width: 200,
                                            }}
                                        /></Col>
                                </Row>
                            </Col>
                            {friend ? <>
                                <Col span={24}>
                                    <Row justify={'center'} align={'middle'}>
                                        <Col>
                                            <Row justify={'center'} align={'middle'}>
                                                {/* <Col span={22}> */}
                                                <Avatar size={80} icon={<UserOutlined />} />
                                                {/* </Col> */}
                                                <Col span={22} style={{ textAlign: 'center' }}>
                                                    {name}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Button className='btn' style={{ backgroundColor: '#D7F5FF' }} onClick={e => addfriend()}>加為好友</Button>
                                </Col>
                            </> : null}
                        </Row>
                    </Col>
                </>}
                centered
            />
            <Col span={24}>
                <Row gutter={[16, 40]} justify={'space-between'} align={'middle'}>
                    <Col style={{ fontSize: '2rem', fontWeight: 400 }}>查看好友</Col>
                    <Col><Button className='btn' size='large' style={{ backgroundColor: '#8BA8E0' }} icon={<PlusOutlined />} onClick={e => setModalOpen(true)}>新增好友</Button></Col>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </Col>
                </Row>
            </Col>
        </>
    )
}
export default Friends;