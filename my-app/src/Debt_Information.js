import React, { useEffect, useState } from 'react';
import { Tabs, Tag, Table, Modal, Row, Col, Button, message, Radio, Card, Input, Popconfirm, Checkbox, Switch, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import axios from "axios";
import MainModal from './MainModal';
import styled from 'styled-components';
import './App.css';
const CustomTabs = styled.div`
    //tab的css設定
    .ant-tabs-tab{
        color: #bbb;
        font-size :1rem;
        font-weight: 400;
        border-radius: 10px;
    }
    //點擊tab後外面顏色改變、字變大、變粗
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active{
        font-size :1.5rem;
        font-weight: 700;
        background-color: #A6B3D2 !important;
    }
    //點擊tab字的顏色變白色
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
      color:#FFFFFF;
    }
    .ant-tabs-tab:hover {
        color: #gray;
        background: #FFF
        transform:scale(1.2)
    }
`;
const DebtInformation = () => {
    const [type, setType] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [activeKey, setActivety] = useState(1);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editcard, setEditCard] = useState({ id: '', amount: '', alert: '', note: '' });
    const [title, setTitle] = useState('');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: '欠款人',
            dataIndex: 'debt_name',
            key: 'debt_name',
        },
        {
            title: '收款人',
            dataIndex: 'back_name',
            key: 'back_name',

        },
        {
            title: '金額',
            dataIndex: 'money',
            key: 'money',

        },
        {
            title: '資訊',
            key: 'tags',
            dataIndex: 'tags',
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
            title: '日期',
            dataIndex: 'date',
            key: 'date',

        },
        {
            title: '備註',
            dataIndex: 'note',
            key: 'note',

        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space>
                        <a style={{ color: 'green' }} onClick={e => editItem(record)}>編輯</a>
                        <Popconfirm
                            title="確定要刪除嗎"
                            okText="確定"
                            cancelText="取消"
                            onConfirm={e => { handleOnDelete(record.list_id) }}
                        >
                            <a style={{ color: 'red' }}>刪除</a>

                        </Popconfirm>
                    </Space>
                </>

            ),
        },

    ]);

    const [data_debt, set_data_debt] = useState([{
        key: 1,
    },]);
    const [back_data, set_back_data] = useState([{
        key: 1,
    },]);
    const addDebt = () => {
        setOpen(true)
        setTitle('新增欠款');
    }
    const addBack = () => {
        setOpen(true)
        setTitle('新增還款')

    }
    const handleEdit = () => {
        if (type == 'debt') {
            axios
                .patch('/backend/edit_debt.php', editcard)
                .then((response) => {
                    if (response.data.status == 'success') {
                        setOpen(false);
                        messageApi.open({
                            type: 'success',
                            content: '更新成功',
                        });
                    } else {
                        setOpen(false);
                        messageApi.open({
                            type: 'error',
                            content: '更新失敗',
                        });
                    }
                })
        } else {
            axios
                .patch('/backend/edit_repay.php', editcard)
                .then((response) => {
                    if (response.data.status == 'success') {
                        setOpen(false);
                        messageApi.open({
                            type: 'success',
                            content: '更新成功',
                        });
                    } else {
                        setOpen(false);
                        messageApi.open({
                            type: 'error',
                            content: '更新失敗',
                        });
                    }
                })
        }

    }
    const handleSubmit = () => {
        console.log(type);
        console.log(editcard)
        if (type == 'debt') {
            axios
                .post('/backend/add_debt.php', editcard)
                .then((response) => {
                    if (response.data.status == 'success') {
                        messageApi.open({
                            type: 'success',
                            content: '新增成功',
                        });
                    } else {
                        messageApi.open({
                            type: 'erroe',
                            content: '新增失敗',
                        });
                    }
                })
        } else {
            axios
                .post('/backend/add_repay.php', editcard)
                .then((response) => {
                    if (response.data.status == 'success') {
                        messageApi.open({
                            type: 'success',
                            content: '新增成功',
                        });
                    } else {
                        messageApi.open({
                            type: 'erroe',
                            content: '新增失敗',
                        });
                    }
                })
        }
        setOpen(false);
        if (activeKey == 1) {
            getAllData();
        } else if (activeKey == 2) {
            getDebt();
        } else if (activeKey == 3) {
            getBack();
        }
    }
    const editItem = (record) => {
        setEditCard({});
        setEdit(true);
        if (record.tag == '0') {
            setTitle('編輯欠款');
            setType('debt');
            setEditCard(pre => {
                return ({
                    ...record,
                    name: record.back_name,
                    amount: record.money,
                    id: record.debt_user_id_1,
                })
            })
        } else {
            setTitle('編輯還款');
            setType('repay')
            setEditCard(pre => {
                return ({
                    ...record,
                    name: record.debt_name,
                    amount: record.money,
                    id: record.debt_user_id_2,
                })
            })
        }
        // setEditCard(record);
        setOpen(true);

    }
    const [columns1, setColumns1] = useState([
        {
            title: '收款人',
            dataIndex: 'back_name',
            key: 'back_name',

        },
        {
            title: '金額',
            dataIndex: 'money',
            key: 'money',

        },
        {
            title: '資訊',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record) => (
                <>
                    <Tag color={'volcano'}>
                        欠款
                    </Tag>
                </>
            ),
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',

        },
        {
            title: '備註',
            dataIndex: 'note',
            key: 'note',

        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space>
                        <a style={{ color: 'green' }} onClick={e => editItem(record)}>編輯</a>
                        <Popconfirm
                            title="確定要刪除嗎"
                            okText="確定"
                            cancelText="取消"
                            onConfirm={e => { handleOnDelete(record.list_id) }}
                        >
                            <a style={{ color: 'red' }}>刪除</a>

                        </Popconfirm>
                    </Space>
                </>

            ),
        },
    ]);
    const [columns2, setColumns2] = useState([
        {
            title: '欠款人',
            dataIndex: 'debt_name',
            key: 'debt_name',
        },
        {
            title: '金額',
            dataIndex: 'money',
            key: 'money',

        },
        {
            title: '資訊',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record) => (
                <>
                    <Tag color={'geekblue'}>
                        還款
                    </Tag>
                </>
            ),
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',

        },
        {
            title: '備註',
            dataIndex: 'note',
            key: 'note',

        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space>
                        <a style={{ color: 'green' }} onClick={e => editItem(record)}>編輯</a>
                        <Popconfirm
                            title="確定要刪除嗎"
                            okText="確定"
                            cancelText="取消"
                            onConfirm={e => { handleOnDelete(record.list_id) }}
                        >
                            <a style={{ color: 'red' }}>刪除</a>
                        </Popconfirm>
                    </Space>
                </>

            ),
        },
    ]);
    useEffect(() => {
        getAllData();
    }, [])
    const getAllData = () => {
        axios
            .get('/backend/view_all_debt.php')
            .then((response) => {
                setData(response.data.data);
            })
    }
    const getBack = () => {
        axios
            .get('/backend/view_debt.php')
            .then((response) => {
                set_back_data(response.data.data);
            })
    }
    const getDebt = () => {
        axios
            .get('/backend/view_repay.php')
            .then((response) => {
                set_data_debt(response.data.data);
            })
    }
    useEffect(() => {
        if (activeKey == 1) {
            getAllData();
        } else if (activeKey == 2) {
            getDebt();
        } else if (activeKey == 3) {
            getBack();
        }
    }, [activeKey])
    const handleOnDelete = (id) => {
        axios
            .delete('/backend/delete_list.php', {
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
                if (activeKey == 1) {
                    getAllData();
                } else if (activeKey == 2) {
                    getDebt();
                } else if (activeKey == 3) {
                    getBack();
                }
            })

    }
    return (
        <>
            {contextHolder}
            <CustomTabs>
                <MainModal
                    open={open}
                    setOpen={setOpen}
                    title={title}
                    handleSubmit={handleSubmit}
                    handleEdit={handleEdit}
                    edit={edit}
                    editcard={editcard}
                    setEditCard={setEditCard}
                    type={type}
                />
                <Col apn={24}>
                    <Row gutter={[8, 8]} justify={'end'}>
                        <Col span={24} style={{ fontSize: '2rem' }}>瀏覽債務資訊</Col>
                        <Col>
                            <Row gutter={[8, 8]}>
                                <Col><Button className='btn' style={{ backgroundColor: '#7DAAFF', color: 'white' }} onClick={e => { setEditCard({ id: '', amount: '', alert: '', note: '' }); setType('debt'); addDebt() }}>新增欠款</Button></Col>
                                <Col><Button className='btn' style={{ backgroundColor: '#00BDB7', color: 'white' }} onClick={e => { setEditCard({ id: '', amount: '', alert: '', note: '' }); setType('repay'); addBack() }}>新增還款</Button></Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Tabs
                                type="card"
                                onChange={key => setActivety(key)}
                                defaultActiveKey={1}
                                activeKey={activeKey}
                                items={[{
                                    key: 1,
                                    label: '全部',
                                    children: (<>
                                        <Col span={24}>
                                            <Table tableLayout={'fixed'}
                                                scroll={{ x: 'max-content' }}
                                                columns={columns} dataSource={data}
                                                pagination></Table>
                                        </Col>
                                    </>),
                                }, {
                                    key: 2,
                                    label: '欠款資訊',
                                    children: (<>
                                        <Col span={24}>
                                            <Table tableLayout={'fixed'}
                                                scroll={{ x: 'max-content' }}
                                                columns={columns1} dataSource={data_debt}
                                                pagination={false}></Table>
                                        </Col>
                                    </>),
                                }, {
                                    key: 3,
                                    label: '收款資訊',
                                    children: (<>
                                        <Col span={24}>
                                            <Table tableLayout={'fixed'}
                                                scroll={{ x: 'max-content' }}
                                                columns={columns2} dataSource={back_data}
                                                pagination={false}></Table>
                                        </Col>
                                    </>),
                                }]}
                            />
                        </Col>
                        <Col style={{ paddingTop: '20px' }}>
                            <img src='./nomoney.png'></img>
                        </Col>
                    </Row>
                </Col >
            </CustomTabs >
        </>
    )
}
export default DebtInformation;