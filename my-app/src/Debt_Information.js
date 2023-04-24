import React, { useEffect, useState } from 'react';
import { Tabs, Tag, Table, Modal, Row, Col, Button, message, Radio, Card, Input, Popconfirm, Checkbox, Switch, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import MainModal from './MainModal';
import styled from 'styled-components';
import './App.css';
const CustomTabs = styled.div`
    .ant-tabs-tab{
        color: #bbb;
        font-size :1rem;
        font-weight: 400;
        border-radius: 10px;
        // background-color: #D9B3B3;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active{
        font-size :1.5rem;
        font-weight: 700;
        background-color: #A6B3D2 !important;
    }
    //點擊tab字的顏色變白色
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
      color:#FFFFFF;
    }
    //tab字的大小
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab{
      font-size :1rem;
    }
    .ant-tabs-tab:hover {
        color: #gray;
        background: #FFF
        transform:scale(1.2)
    }
    .ant-tabs-tab-btn:focus, .ant-tabs-tab-remove:focus, .ant-tabs-tab-btn:active, .ant-tabs-tab-remove:active {
        color: #FFF;
    }
`;
const DebtInformation = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [activeKey, setActivety] = useState(1);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editcard, setEditCard] = useState({});
    const [title, setTitle] = useState('');
    const [data, setData] = useState([{
        key: 1,
        debt_name: 'JACKY',
        back_name: '軟妹',
        money: '250',
        tags: '欠款',
        date: '05/01',
        note: '麻辣燙的錢',
    }, {
        key: 2,
        debt_name: 'Mingyao',
        back_name: 'JACKY',
        money: '250',
        tags: '還款',
        date: '06/01',
        note: '深水的錢',
    }, {
        key: 3,
        debt_name: 'Mingyao',
        back_name: 'JACKY',
        money: '100',
        tags: '還款',
        date: '05/01',
        note: '加油錢',
    }, {
        key: 4,
        debt_name: 'JACKY',
        back_name: 'YEEDA',
        money: '150',
        tags: '欠款',
        date: '05/05',
        note: '麥片+牛奶',
    }, {
        key: 5,
        debt_name: 'JACKY',
        back_name: 'MINGYAO',
        money: '50',
        tags: '欠款',
        date: '05/03',
        note: '軟體之星道具',
    }, {
        key: 6,
        debt_name: '婷婷',
        back_name: 'JACKY',
        money: '150',
        tags: '還款',
        date: '05/05',
        note: '披薩',
    }]);
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
                        record.tags === '還款' ? <>
                            <Tag color={'volcano'}>
                                {record.tags}
                            </Tag>
                        </> : <>
                            <Tag color={'geekblue'}>
                                {record.tags}
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
        // {
        //     title: '是否還款',
        //     dataIndex: 'back',
        //     key: 'back',
        // },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space>
                        <a style={{ color: 'green' }} onClick={e => editItem(record)}>編輯</a>
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
                    </Space>
                </>

            ),
        },
        
    ]);

    const [data1, setData1] = useState([{
        key: 1,
        debt_name: 'JACKY',
        back_name: '軟妹',
        money: '250',
        tags: '欠款',
        date: '05/01',
        note: '麻辣燙的錢',
    }, {
        key: 2,
        debt_name: 'JACKY',
        back_name: 'YEEDA',
        money: '150',
        tags: '欠款',
        date: '05/05',
        note: '麥片+牛奶',
    }, {
        key: 3,
        debt_name: 'JACKY',
        back_name: 'MINGYAO',
        money: '50',
        tags: '欠款',
        date: '05/03',
        note: '軟體之星道具',
    }]);
    const [data2, setData2] = useState([{
        key: 1,
        debt_name: 'Mingyao',
        back_name: 'JACKY',
        money: '250',
        tags: '還款',
        date: '06/01',
        note: '深水的錢'
    }, {
        key: 2,
        debt_name: '婷婷',
        back_name: 'JACKY',
        money: '150',
        tags: '還款',
        date: '05/05',
        note: '披薩',
    }, {
        key: 3,
        debt_name: 'Mingyao',
        back_name: 'JACKY',
        money: '100',
        tags: '還款',
        date: '05/01',
        note: '加油錢',
    }
        // back: '',
        ,]);
    const addDebt = () => {
        setOpen(true)
        setTitle('新增欠款');
    }
    const addBack = () => {
        setOpen(true)
        setTitle('新增還款')

    }
    const handleEdit = () => {
        setOpen(false);
        messageApi.open({
            type: 'success',
            content: '更新成功',
        });
    }
    const handleSubmit = () => {
        setOpen(false);
        messageApi.open({
            type: 'success',
            content: '新增成功',
        });
    }
    const editItem = (record) => {
        // setEditCard({});
        setEdit(true);
        if (record.tags == '還款') {
            setTitle('編輯還款');

        } else {
            setTitle('編輯欠款');
        }
        setEditCard(record);
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
                    {
                        record.tags === '還款' ? <>
                            <Tag color={'volcano'}>
                                {record.tags}
                            </Tag>
                        </> : <>
                            <Tag color={'geekblue'}>
                                {record.tags}
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
        // {
        //     title: '是否還款',
        //     dataIndex: 'back',
        //     key: 'back',
        // },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space>
                        <a style={{ color: 'green' }} onClick={e => editItem(record)}>編輯</a>
                        <Popconfirm
                            title="確定要刪除好友嗎"
                            okText="確定"
                            cancelText="取消"
                            onConfirm={e => {
                                setData1(data1.filter(item => item.key != record.key));
                                messageApi.open({
                                    type: 'success',
                                    content: '刪除成功',
                                });
                            }}
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
                    {
                        record.tags === '還款' ? <>
                            <Tag color={'volcano'}>
                                {record.tags}
                            </Tag>
                        </> : <>
                            <Tag color={'geekblue'}>
                                {record.tags}
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
        // {
        //     title: '是否還款',
        //     dataIndex: 'back',
        //     key: 'back',
        // },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <>
                    <Space>
                        <a style={{ color: 'green' }} onClick={e => editItem(record)}>編輯</a>
                        <Popconfirm
                            title="確定要刪除好友嗎"
                            okText="確定"
                            cancelText="取消"
                            onConfirm={e => {
                                setData2(data2.filter(item => item.key != record.key));
                                messageApi.open({
                                    type: 'success',
                                    content: '刪除成功',
                                });
                            }}
                        >
                            <a style={{ color: 'red' }}>刪除</a>

                        </Popconfirm>
                    </Space>
                </>

            ),
        },
    ]);
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
                />
                <Col apn={24}>
                    <Row gutter={[8, 8]} justify={'end'}>
                        <Col span={24} style={{ fontSize: '2rem' }}>瀏覽債務資訊</Col>
                        <Col>
                            <Row gutter={[8, 8]}>
                                <Col><Button className='btn' style={{ backgroundColor: '#7DAAFF', color: 'white' }} onClick={addDebt}>新增欠款</Button></Col>
                                <Col><Button className='btn' style={{ backgroundColor: '#00BDB7', color: 'white' }} onClick={addBack}>新增收款</Button></Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Tabs
                                type="card"
                                // onChange={key => setActivety(key)}
                                // defaultActiveKey={1}
                                // activeKey={activeKey}
                                items={[{
                                    key: 1,
                                    label: '全部',
                                    children: (<>
                                        <Col span={24}>
                                            <Table tableLayout={'fixed'}
                                                scroll={{ x: 'max-content' }}
                                                columns={columns} dataSource={data}
                                                pagination={false}></Table>
                                        </Col>
                                    </>),
                                }, {
                                    key: 2,
                                    label: '欠款資訊',
                                    children: (<>
                                        <Col span={24}>
                                            <Table tableLayout={'fixed'}
                                                scroll={{ x: 'max-content' }}
                                                columns={columns1} dataSource={data1}
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
                                                columns={columns2} dataSource={data2}
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
                </Col>
            </CustomTabs>
        </>
    )
}
export default DebtInformation;