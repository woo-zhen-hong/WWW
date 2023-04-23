import React, { useEffect, useState } from 'react';
import { Tabs, Tag, Table, Modal, Row, Col, Button, message, Radio, Card, Input, Popconfirm, Checkbox, Switch, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import MainModal from './MainModal';
import './App.css';
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
        },
        {
            title: '還款人',
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
        tags: '',
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

        </>
    )
}
export default DebtInformation;