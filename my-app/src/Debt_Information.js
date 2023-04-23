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
        background: linear-gradient(-60deg, transparent 20px, white 0) right,
        linear-gradient(120deg, transparent 20px, white 0) left;
        background-color: transparent;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab-active{
        font-size :1.5rem;
        font-weight: 700;
        background-color: #A6B3D2 !important;

    }
    .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card.ant-tabs-top > div > .ant-tabs-nav .ant-tabs-tab{
      padding:10px;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
      color:#FFFFFF;
    }
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab, .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab{
    //   background:#FFF4C1;
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
    const [columns, setColumns] = useState([
        {
            title: '欠款人',
            dataIndex: 'debt_name',
            key: 'debt_name',
            render: (_, record) => (
                <>
                    <a style={{ color: 'black' }}>JACKY</a>
                </>
            ),
        },
        {
            title: '還款人',
            dataIndex: 'back_name',
            key: 'back_name',
            render: (_, record) => (
                <>
                    <a style={{ color: 'black' }}>軟妹</a>
                </>
                
            ),
        },
        {
            title: '金額',
            dataIndex: 'money',
            key: 'money',
            render: (_, record) => (
                <>
                    <a style={{ color: 'red' }}>250</a>
                </>
            ),
        },
        {
            title: '資訊',
            key: '還錢',
            dataIndex: '還錢',
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
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            render: (_, record) => (
                <>
                    <a style={{ color: 'black' }}>05/01</a>
                </>
            ),
        },
        {
            title: '備註',
            dataIndex: 'note',
            key: 'note',
            render: (_, record) => (
                <>
                    <a style={{ color: 'black' }}>麻辣燙的錢</a>
                </>
            ),
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
                        <a style={{ color: 'green' }} onClick={e => editItem(record.tags)}>編輯</a>
                        <a style={{ color: 'red' }}>刪除</a>
                    </Space>
                </>

            ),
        },
        
    ]);
    const [data, setData] = useState([{
        debt_name: '',
        back_name: '',
        money: '',
        tags: '欠款',
        date: '',
        note: '',
        // back: '',
    },
    ]);
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
    const editItem = (tag) => {
        setEdit(true);
        if (tag == '還錢') {
            setTitle('編輯還款');

        } else {
            setTitle('編輯欠款');
        }
        setOpen(true);

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
                />
                <Col apn={24}>
                    <Row gutter={[8, 8]} justify={'end'}>
                        <Col span={24} style={{ fontSize: '2rem' }}>瀏覽債務資訊</Col>
                        <Col>
                            <Row gutter={[8, 8]}>
                                <Col><Button className='btn' style={{ backgroundColor: '#7DAAFF', color: 'white' }} onClick={addDebt}>新增欠款</Button></Col>
                                <Col><Button className='btn' style={{ backgroundColor: '#00BDB7', color: 'white' }} onClick={addBack}>新增還款</Button></Col>
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
                                                columns={columns} dataSource={data}
                                                pagination={false}></Table>
                                        </Col>
                                    </>),
                                }, {
                                    key: 3,
                                    label: '還款資訊',
                                    children: (<>
                                        <Col span={24}>
                                            <Table tableLayout={'fixed'}
                                                scroll={{ x: 'max-content' }}
                                                columns={columns} dataSource={data}
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