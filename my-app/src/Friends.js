import React, { useEffect, useState } from 'react';
import { Tag, Table, Modal, Space, Row, Col, Button, Avatar, message, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
const { Search } = Input;
const Friends = () => {
    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const [icon_show, set_icon_show] = useState(false);
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
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: '資訊',
            key: 'tags',
            dataIndex: 'tag',
            render: (_, record) => (
                <>
                    {
                        record.tag === '0' ? <>
                            <Tag color={'volcano'}>
                                欠款
                            </Tag>
                        </> : <>
                            <Tag color={'geekblue'}>
                                還款
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
                    onConfirm={e => { handleOnDelete(record.id) }}
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
        // setName(value)
        axios
            .post('/backend/search_friend.php', { name: value })
            .then((response) => {
                if (response.data.status == 'success') {
                    set_icon_show(true)
                    setName(value)
                    setID(response.data.id);
                } else {
                    setName(response.data.status);
                }
            })
        setFriend(true);
    }
    const addfriend = () => {
        axios
            .post('/backend/add_friend.php', { id: id })
            .then((response) => {
                if (response.data.status == 'success') {
                    setModalOpen(false);
                    messageApi.open({
                        type: 'success',
                        content: '新增成功',
                    });
                } else {
                    setModalOpen(false);
                    messageApi.open({
                        type: 'error',
                        content: '新增失敗',
                    });
                }
            })

    }
    const handleOnDelete = (id) => {
        axios
            .delete('/backend/delete_friend.php', {
                data: { "id": id }
            })
            .then((response) => {
                if (response.data.status == 'success') {
                    messageApi.open({
                        type: 'success',
                        content: '刪除成功',
                    });
                } else {
                    messageApi.open({
                        type: 'error',
                        content: '刪除失敗',
                    });
                }
            })
        getData();
    }
    const getData = () => {
        axios
            .get('/backend/get_friend_list.php')
            .then((response) => {
                setData(response.data.data)
            })
    }
    useEffect(() => {
        getData();
    }, [])
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
                                {icon_show ? <>
                                    <Col span={24}>
                                        <Row justify={'center'} align={'middle'}>
                                            <Col>
                                                <Row justify={'center'} align={'middle'}>
                                                    <Avatar size={80} icon={<UserOutlined />} />
                                                    <Col span={24} style={{ textAlign: 'center' }}>
                                                        {name}
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Button className='btn' style={{ backgroundColor: '#D7F5FF' }} onClick={e => addfriend()}>加為好友</Button>
                                    </Col>
                                </> : <>
                                    <Col span={24} style={{ textAlign: 'center' }}> {name} </Col>
                                </>}

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