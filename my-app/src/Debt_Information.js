import React, { useEffect, useState } from 'react';
import { Tabs, Tag, Table, Modal, Row, Col, Button, message, Radio, Card, Input, Popconfirm, Checkbox, Switch, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MainModal from './MainModal';
const InputOutline = styled.div`
    .ant-select-focused .ant-select-selector,
    .ant-select-selector:focus,
    .ant-select-selector:active,
    .ant-select-open .ant-select-selector {
    border-color: #d9d9d9 !important;
    box-shadow: none !important;
    }
    .ant-input{
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: groove;
        border-radius:0px;
        background-color:#f5f5f5;
        border-width:2px
    }
    .ant-select-selector{
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: groove;
        border-radius:0px;
        background-color:#f5f5f5;
    }
    .ant-input-status-error{
        border-top-style: hidden;
        border-right-style: hidden;
        border-left-style: hidden;
        border-bottom-style: groove;
        border-radius:0px;
        background-color:#f5f5f5;
        border-width:5px;
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
                            <Col><Button style={{ backgroundColor: '#7DAAFF', color: 'white' }} onClick={addDebt}>新增欠款</Button></Col>
                            <Col><Button style={{ backgroundColor: '#00BDB7', color: 'white' }} onClick={addBack}>新增還款</Button></Col>
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

        </>
    )
}
export default DebtInformation;