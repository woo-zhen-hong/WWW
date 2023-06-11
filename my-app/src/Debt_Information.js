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
        setTimeout(() => {
            if (activeKey == 1) {
                getAllData();
            } else if (activeKey == 2) {
                getDebt();
            } else if (activeKey == 3) {
                getBack();
            }
        }, [1000])
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
                console.log(activeKey)
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
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAABtCAYAAADzq74KAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAJaeSURBVHgBtf0HsGTpeR4Gv+eczvHmO3fyzO7O5l1gd0EiRwogCRIECEC/REqy/t8lynb9ZbtULrvK5XLB2WWXbVm2LMt2uSTLoiVStMQgACJIBAILgLvAhtmcJqeb7+3bufucz8/zft8JHWYB2uWe6rl9+3af8H1vfN7k/ZX/zxeM8OF5Yl/wZYCn536L+I4+4/eMJ5m/u++IL8bEh4o/59mvTj3iv3uen3nPvjZzPhe/Tr+Hs/m+fQZ8BhK4Zy6X0/fz+BnkCnidx0/PfSbnnr77mX4+Pn729fR57RrEV2T06ev6zF7rT/cw6X2b9Jieic+J3z0ztWazP5PX9grdcX/yNXg4abxn8c/kyvi7owm+njlv/MTvkczet3+Xc07TyMT13OWas+dPHlF8vVHyGRMa6RweyTsvvCyXLr4q0aArpVJeBoOe9PtD2d7fl0KpgK+G0u0PpIP3xjhMfziUXCTxjcW3Nr0oMRNweY1uGD+b7Ju7gdD9YrfB2FfGbvD0TRjJHMN9P3vOd9vEeOOT5xQR80kC9/S14LWRgO/p08Pvnv708fkciNCfwwATT3tSd28mXqHkTmYEwrswRHKPuia6kKJkZLxEXnDtLG/Ex549XkL8xhEcD+XHeyjJdybOb6avXRyTmYk9mkeoXkZISuYM00wRf+ZuTDBzTT/F+3f7W1Y46f/Y0163I5deeU0uv/qmRKOBFAs5GYIJ+BiNxyoMu72BDMdDGYahkEAM3g+jSHIytXjx6+kbjxkg+ayJb9xKlchpDMsgkxuoa+tliEZ/92IxOHOD8zYj/or+pwzgOWKfenpeQviWKdJnLhfoT/s+id8os/hkDN+7CyPwzNHE9en6mFlNkP09S9jx7166vMk92d+d4FBG896VmfyYOU3Cn3ZJpokfP3yTuQbPpNc0te52K6LM6/Qis9RhMj+Nl1KDn71e+bM/fioNaiYoSrIM7Tu6a+/sy623LkuvdSj5gEojByIXJfxuOJYumGMMws+BBsKRkRE0Q0QmyPlkBEe3c048fWdWXWb2TcnEdx/zJdn2+IBeRnLKJIFz4ectQFYNZj8fq33P3ThNCs8Rr5+V7HxfyAgwe2D+0PSJTaDYfJpkHs8xQ8JjyVNkmmCyBDor97LkkBJ9ohZnFjXH81MnGLJaJNNk5GW+EzNIQphe+pms5koZLjW75gmcd394c7V0ek/zGfX/DhP8VA8zszKS4XcShPQO2/LOxdekS/MnsJq/Cw3B9Q/BDb1uV02gMKTtAk0BBmj3+lLI5bEPYIaY+7NLZTyTbKXJmEbJqZ1alollt/8nknv6Xt7FNrzr/Zv5pke8KYFnCUkJWZnAmggq7Z0WiE2l7HNai1jTaFITZM83LR3j+83e+YTF4ZkJTTAhuvGo5fOy0WhKo1oRL/KxIUPZOTiQg1FPxp79fvxdT2YJbcJEEmuKZN9LLyaS6Yszd2GKSU08eR6ZOm9873+WvZz4vrFadtr0u/vDzPlcfCxPxt2BvP3sRdm6dE3qlYq0Wvsq6QsFXw5bHfGw5xGOMQ7HKhzHkXUIDPY8hFbI00yeVDKTp7YmkD+xGTHTpIySOAp3udi7S6O5TlD221MEOekbeEr0fuCIOPPadxKBT6rBIEP01BR+kDWlUs0yzy+YvpvJVZj8Y3o/3owZQkatF4pyvN6Q1VpdKpWyXgc3rFnzZLFek929I9mBFDsa9yT0xjOEn72sREt6qRGWMsFPpwHMn0FTzEj+PwMTvDvD3O0avJnXGXaWGJwZ9fty6aXX5O0XXpI6HGNjxlLFz8N2214i6GJzb196o6FqXtLCEOaRmkSkB6eRcybZUm/GRorNg3hps+aCmbnBjHYwkxv0kx7vxhDTEtr6GtNmjJcQ9azUtxoDNAemiF87hkk0gdUKsbLLGhiTon7uFc67o+RVAdeyUK7IifqCLNWq4ueIyEFCZUymXN6Xcq4sK7jIWr+qGmKv15bD/mFi30uMJDlb3xeT7MdPK5mzhG/u6p/N3tOMZpB339WfdD1eTKGzf7nLF0TCcZgcl/sb8UJBwe29A7n4Jz+AIzCQCOhgsejLoEdNGOlnOkCHqA0GYISRErxRS2E8HClYMoKWIJ0oauSZyYsyKSAmCaQn3gwClBKwP8FDnpeaT95PWNTpY02o/blPSZghe8ysszzxuz/NHF7KQL57Jszl/RkYOKvmJx8q/YslWQfxrzbqUs4Doi3gGpR8Lf2bKLTXGti1M9joPDZS8jgylr8c4HuwZQ86bRkYIhyhiiwjZo6x9P/e464CSv4fH/muf7kbk1KK08YfjUa6Xrs3bsmr331Wwl5PGrUS/j6Sfs/IfvtI9gGj5ooF6YBBxljrCN8f4zs9MAB9CFJ8dzzSvRGLGmUIf5qY516kN6MJNK5AHJeKxs/Yc8pHqfy4m80577U1f2JbVKz976S1SnJJn7H8tn7C5N8CpykUTfLi1/YpGabJXsNPkmgJ9q7n9ZVA85TmhZIsV2vSxLNUQPwC0EVOTTHPObuii+7hKYkZFqlkA8ghBah1UaIXJfx6EV/oF6Q9HMswKEjo4+/B0DFufNeTUn5mb8w8+zr5xsT9yIQmlKm/JZszgR7FD3/qO39W/2HuubIP1eKBQqBjSPnRYCj7Nzdl89ZNqZULUgBBD4Y9ZZROp6+fO2zDzOz2IGACjTHkfetH8pHH3hhoiRL+huWlaZRBBmR2cfVdz0/eU6KfuQP799Q+1h2XrL36bkSW/M23tneW6LMmkO/JlANp3Pte+jenNeJjKNaeHCsl/ARhcq/j+/ffZQMjSe19Mn4RSFSzWJRFEH6jXJUinGDRWEWgn6MKTm15xgsi/Z4kx/GTJfLABEE0VgQD/wHeG0hgsFEliyb1RhHUeBEBoLxEwRj7MFLVMXu53hRI5E0RumSYw8wwQYJd3YWYk0Db1N/TsGvmc9mr8Lw/k08yj5nUxYY2GIEReu2uvHXxFQg3A5+gIEdHLRdL6Eqr30XArK9aYODgUksTMJuAHEUg/hDCp5QvJPSUmyctaMOmj5gJUmKZuDhdTyPJjuhHjcxz9OczgSV+b4pYp59+1jSS1JSZOJZk4FV35bEEmPxehrnES847e62xKWKlIOLUUgXc1iyVZKXRgCSqQBJZKZWcSKW9XYI02mWZQKW9uIvKbjRUNygfuD8ZBa/HYDlg3wWSF3bILxl1/IeQaoMoAEPk4Uzjr94Q3DZS6FXv2PPnIqVZUs9qM+tppBC3w77T7018NhU0JvP3u1oOMrn9PxUTmMkXenxJJS816ajbx1KN5Mff+JYc7G3L2mJd/T8f69bEnrQ7R1KBcGpTa8AUolBiMK0IM2kXGoKamsG0SC0bChdft2mKETwx06SeEFKsKbLohKecYCZlgSOb+CamCSxlJiMZJpgm/MRcIUyaZRh/YvH97NMz+vSy2sjERGiytzPhc3izlynxZvDcy+WyHKs3pQnCp9RX1AnagPa9ZyJLTDwHJDqJ2iRmkGi8RMmNfx8PsOJANpjCoskZkfosjPrw+iN9bVQb8FgBDpLnEtOmhRTLgUcKOEUfXt8QzsQoykND4LNgCBNEWVhDZu7GGBUQ0dy7tK8yLAGeYuwlrys7BlMavS/r4GfXcCI2JDLjWXnZY8r8xyyTxAwYL6ITxqC1AeyYt3/4vOzcvCUL1RKuDX4DNGQTqNvOfguCAn7AYKAM0MbPnCKEAdYsBANgxWEOcfWDmMGwL5VS0foI9kacdNfbVWTaOb2RpFahN+eWImc6eamqnjEr7ef9JG8mXaRp59hPJLX9gO+oNGvSJNI+YbpIYs1lkvwZR3wZZvCMS2cwJEPf3eXstVpJB4cVxPf4yeNwxOoq9U2yUDycJXwSiGoBMgSkOiW6dWojNbv0fRKRSv0epPuaew/ED23CayG3BcrgJPaRc+4RFcXpAlxDkVINDBIQMx9jd4JQcmQIslNYgsTDeRgoAvQRwWQyXiywZOIOI7c2WQLOmkbGh9nl0d4uwNwoShkOfwTi6cLBHMOxHMHxHCHWEYj1K/3YSvBkJk1jmjESvRqjUl7mc3HgVVEDXwWF8e0Oq5MMyR6CkCMwwc1X3pE3L160AkR9QAEy1FeTk7lEA1wnCb4F36BQKChqtw9zaQCGIVoI2AKWp6Unfo5CLU/UaEK1mZgQXKRVLBPYC45zUsxEVNjSaUyM8THSDcgywTw/IbWhU23hJ5J6UktkTRs/YVeJU2ZAXEafvFB9zdQPEhxzSkh8JmWY5PzzfnqUGEYeP7UuC4sL9ljqbOR0r3yeA4RJZ4sqOSF0qGCPzGH4E+95odqtptu2TJinIwxGGPT17/QF6MRZB5mMCTlfgwFWrMAnjhThMG4tQvgI5LcgT0cPiBN+D0LYxH2cC2+OI+bNcF9wjXC0I58SfCSxZjQxoc34EKIrOYYh1osq0oOpcBxwrjruhG9x3TmiWOWGdHNF6XfKiHOMNEUhl/OsMFLTxFj/0Q/cOtrsAQNi08i+n9elNyooPGXKyJk+tNf52vfJ/DZbwcd98DuEvMcjRIjNSLbeflUuv/QSCFfgLA8AHoBxI0+qlYLc2txRZuv1h9LHPjBY1ocJNcQeaQANQjriWvO7pAn8YyCtApNpGEqqEWIisIQQpebLlOSIpaXMkNK0g+0IV2adpoQBvNQ9T7REhgEmv5f+zZ/zd4tJGpW0liHsJmjCTWSfsbbQe4ntdT1/IGmY0CrkJvatUc05yeRcQZpCgOhMNLTch59UtR6ksUdtwKANpKYX0kTC70R5INFlb0ui7r54586DuFrKGGou8X4IBfL4+aIykC8lCRBxDiogxgHQIkjCEY7vA9YY4wvDMaU+pSYIFH8rApZFyFRoIYWUoHrvnhJVRMka0AAbi8wYRfZOQw/EDTPraBjI7kFbjlqHciNsy8kKoEWYXExBqAECrjWWoJ0qsg47fK+Xk21cE7+j9jYJTYOanpRAWBLvEdY5pLOKf0VqPCI35BNcH4lT5Qn2qA+GJ5PTFKMJqMLGBJDmkNSg0mqxJr3Oltx47SJiBC0FIXo4bqNekX6/A02Fz8L253tFmLF7e3vKDDx2MW/1lwbPnHlN+vABSpRyBWhTA7NqIasRskpsnmMz770YUYrVo0mIOyF2MROE72ccU8+bNE2mGSDG9+NFtXlEs87tBIFP/T7xN8cQJOJIjx1ZsvdDiZk3lpZVxh3GXSxaDX/iYobq5JrWpsj2ZfGqi9i0Ogi8r5oAYktNI6GkAjPQzqcJA/xHhlub2MBtaT70sEjvEM8O+KSvDGMo9emplaoq9dQ6KFTVBykaTzcvR+kLIopgsgRgDtrFdPbGoVFtVyhYU2cE0yFyooWb7Tk5F+L6Qx5btYRl6sjLy8AryeEgJy0E8A4OdxGc2pP2/pYcbN+R5zp7YNIuIGGR9ZUlefSBB2Tl2IY0lvqyDMIsNotybb8vHeD2tL9zgC/z8J/Ak6p/yKA24g8zL4qS9eW1k2LyDlnrg9DLeRJkJANqD7evms3MZVWNC99gd0/2t66rD9br4brgH7QRPSZEfdg90qzSMb57G5+jyUOBwaXgtYXQTHn15yxtEE6tw2zS7GNouUJBfQQzQ+x3gzinUYKsyysZJsg6n1kN4Evq9EryWW/qc1kzSSRGglKIM2tOeZnrsBtgnKPMn5YBoglmUOnlGM6oHevMpdjxiO+VRNo5ABVWxCtWrU9A0wMLB1RTeq9+R0rn7wEBL8FIHVFXg7jH+r1BtwO/uK9IENOBd65ek+pyTha4E519MXtQ43if/gTNAII/MjiU6OC2BGv3qAlGZU3Cz5VsKkYR5s8QVObThgaBdCM61aIaw/gWtfLINfzd3av6W4ZYFzQeTJ4I1zaGhuiDsFoRgk0jDwTUBV8egQm2ZH/nNp6bcri7o/fQA8MOBxAGr1+RZ197W95z3z3yxKMPycr6MVlePyEnqvBfwIi7XU/aJDicgxHcHK5/MBiB+HJqEnowAYdYG985EyGImWygf6Nwwe/UZAXcG9cwNBYUGWO9CrwJXMtbP/wmzMGeaoN8pQKms2n1m/uHqnS5PXsIpOEDNoqMYzKrNIwshfDvvnXHlAmqeBZhgnp+0Zpvjz76yFeyZsfdnnz4E6ZMBnGJbXcxMyaOJIQbO8KWwidNJEeH3iT8OY378xm479qaArvZ8VNhNM+hR+44vu8lcQSZYrqJ7ErH0/an9XlOwBb3AMVJvqxcYoD6eDBrsNIybA1k6+WXpLZQFg/aYAyHLATxD4d4wlHrHR2BoPZk6/a2XHrripx66KTUjh2TaOuWdK/fkAGYocDgGH0HEGN4sC3tm9fgHxQlKNehJYqIRtcUZeKN+TCdfKYD0MaOhjYeoY4kiHukYhjSOLK+Usz0ZBzP8ncA4mRsO49/jHCPIYkPWy3Z27kju1s3ZWfzlhzt74Lm2rgH5uyPFIcPcF6B9jgEIvP2tWvy0ptvK6y72qhKvQppCj+himsmXh+OjcXnIWHjCDAXlBFdQpgshokc6tTu2ZRoTZemBA9D9TlIlHyfmiHHtBgEzrbfuCibr/4Y9wLHHVFk9ZOxDtSAbfxO47KN2AFf9+m3gV4Gob13OsY0iyIHoBD6pgOdx7qWEfup1esKRuRimDJ+TFQjyfyH580CZb7CgalG8RPGyGL/k4Q4eVD3GZlivkzUN8t41mGP04xDJ+3t3+lAeV6oP2mux8yrqBWd/TBTSOQ0nUrQDMMdYg/bwOzrxjnbvK4BCA6BHIQrpQBTJiivyZs/eEHue+g8ACGE9/s2hN9uteUA9vb2/pHc3NyWDoj+E00Q98EdGQH73r21pUBEY7UJCb6n2ZMDEMnRXl9G5euyunpKGLVQKjFl1UjWoYaJBBOngJ8mH2lwSUq++nS9kRUOZAa1AplWQEkbWqc1gE1sA4+wp2F2VbD5y/m67ML3uBL2pb19G0qt55jKU0lKc4XErJoBRFaANnnzrUtyHdDlZTy/+Au/IM3VdalAYJxuFGUPfsp2eywtCIE8EZuc7wSgUf+FuzAGgeYDG8iiQUrzjsKgALFO0xdsrQxRLBDJCdSM3H/zRWi/vjq57U5HcsqEVdk62LTaA/9aHRsjGFAjg/GKuUB9K0O0j8IG11DybeVlH/dVKuakVqlpJaMGQR9/9PGvJFHYLCozRcBeJtltkikc4SYIayq1swQ972ci+X2ZsP1nYgqxlJ+jtbIMNs1k89AmxznuvRgTn2VMEtMibO9GFdqgULboDSQlpbcHyT86guQEo93Zasnm7TtYWF86eG9351Cu3NiWN69vywuXbshzl2/KhVMb8uSjG4A/Ef7f3pf2YVeKFUh+2OyjTgvEMNKMSKrzCIReBgrig9E8REGFGonnhoSmU86KKnX/cA0+HPIgXvbAmnmROurGQrfu/lmaaPF/h7Rx43PWwSRBbSwsyYXjJ2S92YT1N5Q7O1ty684taUFD9HG/XAt+dhV/r5QLsg9Gbx0eyPXbN+QU/IdGrQy4NaeicAAfhjDwYacnzUpViTEE4eVdigQlceTg5ohS27fRfdLMANKf9nwBJhWDi2TkOy8+K62rb2gsow0TiVVn3EdqH5pHe1hzJs7RLygU89KBIOqHY4tM4YqoqchgNC0rOQsNVyBYlpqLWNqiXgM1T/D4449+RbzJSK2flb7utZ8lTMk8s8Q89bl5GmDCJDKTEeUJxvImo8nTppvvmC9W/ZacvQmajuHpyfM75haTBIOtqs0mGtrPFCF515Zqiuiw9pkZjtYxtlBmB5qh1e7J869cku2dlua13Npty2vXt+R1SP1bbea8IBINafnU/atwPgfwlTu6iQzGdWHTjumwQ1ozMYzS8nD/QBYW4HiWapBmBfytoN8jA3jcVEhGmmiEd31nY/OKFYyJUzg8pnfbemoyBgkqhMlgiG6JtZN5v4HnueB3qA7kQrUm98IhvnBiA0SM6Gy3hSDVNq6zpTGEIRhzAYErwqF9EO3R4aG8fuWybABiXltZBFOVnYBhHXkOxDlSDcNr7IOQyXxjfK8P3J+wKCsGU0vCCiW+omnFax5u3pQ3v/0HkO6iGoHQNM8xhBnq58gEXekAnKAZRAYiUrQNjR2ntgxpStI88jyFShkPqoM5F2pN9V+oKYo5gg0wG9/7nke/kiW6OIDlvytBpk+lPX9W2s/4F7HTKybjA8hdtUYwpYVmNYVJHebMMVI7P8MERpLPzJ4rNYfMhGZgTXMEiQezpFBSh9QHMYk+QZjAq4lZH0C6b8Nhe/a1d+TGXluu7u5jM4AYwcldXF4FulGXA4T2jwHqW63mrfuBjToEQ9wB8zArtQJGCSBx+0d9uXZ9V06eXoNrADWeK1nkhzEH5jHBdCEOT8ZkMqEojCuKnChDkLiZTUktECYwgHVQQwsXa81GEFiic4wTm47ios81QJDnj0OLASm6/8wZCIMFzefhQjJ4VS4wUjuWw6OO7O4dyI07d0BcNTlzfE0F4hi2uwefpIhroc0esIECU57JzG5zaKfHEpQBrQKCd2QwDTTiOT7cl1e//s+AlsFkbB9qygmRnzLWqY1rGDHFGuvRxh50CVuD8akNuJ/MAWtTm+IzFTAVrYlGqaKMsFhv2lJerEMJa1ooWJMsePLxx75ibUc/yd4kkSX5+hlm8L05pkuW8J2WSBhDrNROJf5UZPkuxGlNICPzzKTU/5C5GieOKmdVg+d5M7+nz0zmqedlL05/nF2GiYIoqxcUbcAMEsiDucB4wQB+ASugBiCKl69clYM+E7qK0lyihFyX5cUlRGeLYJiBvPjGDcXYV1cWNIP34Ggk79xp43ubsgibl6ZDBw74zu6R1GolWQAhSnUNTjOYobagBMP4hQ8832Oe0ZhZqDm9fsVgvDhS7uvxiaEnSk7NBJMwvk1Fd4612JQUSuAJ/xCMXyqXZGNlWR4AMzx27wV534MPyIPnTmuxexvarAvQQBkCa/AGkLF7EIVfWqjLMp4kaDrodazdUberx2YQLkHxIvs6hMlHDcXqMdYcUPN1oRXv/Php+FSAnYcdRdhItIS8ewONp8OTMFq3sQ/wgr4DfSNqBTrGPVxTj2nupEacqw6htAJTaAUmYBVCjflheS3a8tS8Uuf8ifc+9hXPSfW7SV9ykCXm1PFMHFCnmmPVZhnCzEGQJqHZ+QzgJU7tPCJPjy1TRJ59Q5INjhkiOZa76ulze4lZmDIFw/7crHNLwO4h1QUErmkMkEbmqKf2e6/NAJRN9d2CSvaxyCvLyyD2ZVnDzwYkK7NJGXS7ur0lb9zal1vbbbm53YLptC9v3tmT63sduXh5W25vd2W3xdx5kV042ac2VqSwcka85ro6fB6hSMQX9Bph66qpxKBZpCpB0xJCQ4OJTBGos2sTy3z7DCyziMsS8CIbVIxzpUKaUKH9qe9zTUyUrA2JtQhp3IRpcgxmECX8busI2q6nqM8RtMP2QUt+5rEHIXlr2hiB36V5RJOsB2e7h3VigI2IVAzvUsKPmYNF2BSfG0PQ9K5flr3XnlO/4BCaoYmYgWbkmshBpvsIptUQADySI3yeTBBFMdDiS5vpIJo+AWbGc62xKMeW1tQhL8GJL0O7+Xo/tpUPfZMZ1Gj6ERP1PAgpTuf1vJjILENMfSo50t0e2UCcEZlM5Mrkxhjn8BlJGWC66spz3MrUBUpGoykPZlLaeVOfd9fnZ9qqeDaeo5BfIewx6QcoIuzKgoUzI2DeI0CQRFM6gBzpBJZAJEsLC7LcXJAmiYHXhk0uw4lj3vthpyuv3tpViaT5RMx7gUlAXP2dzSN7/yBEEs3m0Jff+NffZ1Ez4sJjnFdTi4nAwKnOVRFsgjTDnwZAhtogsn5vZINtNItCq/4jJWqjwSMeX6MsIBIvb1GmWIPSUqfTzoIXSmdVlJELwMXZBJGFaWvFsrz3wr1Sg6R9+sWX4BNdhy9g5KXX35DvP/sj+eXPLEGCl7R7hMdgGyT2YhlRaI2tRGouFbE+hHCJ8pBH1SHHGu9u3pbu2y+DadqKdJWwVvSfRqNI852OEPOg435ta0cLlkJN1YA/EFkHmTEEjbfQ3MIlr8IfOL64Ilq1HNIhR7AT60UzazQaa3yj3x/Z0GMqMaeJV+YHlGNiyX7P+8n55vOkfIaKk3ys9C0z8V3j8lnkJ5wnYSxKRc8G0IhUUAXGF2wmrinRbwmT0FSMINWO8JUFOsrquOKYFfgLUKchkZ4Og1Fd2YMq92CXEj1ZqBPaq2jXDE2zcCWZ3JwAxNGAeq6DCAokcGLvLvagVVSh7b1Dkn3+zdv4Dh12T+HeEQhqYCjpAw3q0QnX5gQkVGDylIRd+Ct9RLo9loMyO9a3Jq/RPJvIonm+JzZP0GlhJXgDQh6pQ00pTKc9FiCeM5sZC1DTJbK+RgU293mYQlWYT81GTZ57422N7v7+N5+WJx95RJbW1rEG+FutKN3uIYSGkUUgSzsAEBg0I1Pk9F5h8tDmh1TOM6nv0utytLsJdCqv65cDWEAtcgTtm4cgGkW21JLagw47ObbH+E5gAYIerpHMzkDcEuDRUytrml3Ke6pAQ7PZF5lKIlfzrFVrfcnFSQtzyCmmlHclNks0nm52NIcZsg53QtDyblQcn9lMSH0vPofzQ5IPi7hkwNlDxc5iXOLHY8ROo0yYf4HazB4L5hmlJZEoPO9B/Xfl1BCxgyLsdDCEdqEDISOuLyFME3adoGNGaK5WtNmOhJTGWFzi763WIcyGI9AqpLV4CiUWCeMFtmxzFBK9gLrGxtcWl2VpdUPyYKTq0rq08hti9n0X2CokPgw7Lvia+SoaNAtI5JocB/MG5x31sV6AWrTfz1TyYZxzRF/SZ2mob3F8JqeN8N0+tFEUWac2aZamDjhWndDnMPUlKtAIG6sr8pH3PA6UqSw/fPUNuYxg4R8+/UP5S7/6K9B8vl5ruWD3jqBBkccwOZXARMFo//dbBzKCRhu2D+TozhWYUwOsZR5rNgbYUJadvV2NORwCKm3Wy/jZVb+MYo3I0Ngl95Ghec8UKrV8Rc4AAVus15V5K+WiXo+BpmTsggE23nOoKfDqW9zNZPFmCD8hZGMm7WxJ3dOs2RJ/PskSzXw+mqLgKD6+TJou2XPG16R5QjY2FtPGhAmVPb9muSSRttDm8vDPYZYRwkQzaNWYb4mFhHDYAULU3bOSvbxubVHmAMGkqS0tyzIcwdw7l9QG7wJbH0J112AacV07kGJMANs9OATR1BTy2wfKUgbDHEeU+fwjj8qxc+dk4dgpqS4sqpQfu5QAXs+A0ntofaZwPEggR019j2yKtyb8MX1h3Nckv1Eftjj9GE25CPS79vY9m4YRP+lkhzk1gSIz1sAZbXdGlek40/wgEzB/KI/rJfRJITLQnKaR7hf/xmtdWQzkqYcfUon73Rcvyvd+9Lz84sc+LOsny7rszA5t94/02AGucbnaBFhwJGWYQr2Dfak1moirVKS9dwuaCUKF8QAIkTbQIk2qw/Uw4MjtP+z0NdWaGorJepoej2tX/8ZYAq9B8963flJOArWjL5WDRqDmCok8gSGoSdRP0axhmxKfm59f5M155exLB7GZDOGKI95Et3gZW1vmPxLPxKQFIZE7dqoy5tj/xpPUCXfur0sPtylM1qFWKND3EgdKiSaKnUfb9MlqAacJ1EH2Vbpmr7rVi6R1/R1pnr0f+nbRnie0BEiYr4DvaWVUGGADfATXbsjN27elCq0xgtilFBvhuMtgmhpMp5PnTsiHPvZxOXffA7oKTKnoQyMNad8jCGVs1ppEcORI675bFxK1BwnOvB3e28iECRxNJ55BPsYCyLw0o+js54pElKKUwalCKFpD0XoHX6PVOVsL7FvTYqwa0+h7zAYlsZP5aOqNxzYmoXUJ3ZHGChhB9vMWi38gss73i5cuy8tvvCmnz56Fow8Hm6cdMwxj07f7nQPpwdHOI24RAL4Me0dSxDGPbl+DxO6rGUcfr1RircUIezDSgCGMUzjHfTXBBpFN/2bTLptLaYVdCSbs+fUNObW2JkMIhCBnq/Yo/fvw5XyL8Ki/QWBgNLJ+Rs7z7kaqU4TsTJOJ9yaIfh5kOd+pzb4fH89LKd75Gxbqi+G22M6fRXym0B93KQnTiPUV7Pf5x7hw3k+YgXUDXNXAmy3V6eBYV0er8lhlJf0br4PxBNq2QJBqwPVhPCEIVpGTJ8/K3suvyNVrNxR+pOJdXIP58OmPy4c/+gFZXFoUhr9YBGPg7PZhehEaDIc9MEJHIiBHAfvzeKFGs8NCoD+pTRTJon3saUqeZXSXWJiDVM9rDpINVo0iX2xphtUAXM88EwbFRp1J9JqVH8VxhZwFF7hOJCoihepr2LQEfsY2zSrKCMRPDcL0/gIYKQcYNyj7NqCH49dgJr1z6ZK0DqBJWdyDa7lz54Zsbe2pfT4Y2lLJHUCjFChjaIfq4R58pp7WB1Ab9LEealHhiKNwCMc8r2nouXEAwQJwANqADvKQECwluiJEeTm7dlxOQRNQOPD9EDENKAIZ5mwgr0bNoJqJQfsc8TLpQuvnPO8nO7nTTmsYOdPBPeMahenPWeZIO5plmeJujJHN+5lEhCzLxChHElTzvBlfYgJl8tKyz+RcoZc40aGqRubKk0FCyZaC6rmIPjBHfhw56yqyEV2WU8JcoU09Zjdlv4ggWF6K5YKcPHVcWpeYhl2Qpz78M/Irv/5lWTu5Aands2uiKSWUxpS02IpBRwpmpCgLdy0a4h4GiFWAAEL6EiVCp4H2PxLXmoYQSOAam1nFGbF4EwEkBr1s6jKr2bjhahqpMylK2GQqRciCwDnPRv0kFsIofsSeoLSkNA8ndrwhKPI2v7eE6CwJecQGA/gbK8GKIFRPkTBPO0pcg1YkgvRzn/iktIYITJ44iWOWtGMEr81o9BnaBOfee+NVwND7WmwzjKzZw9SHAGvZ7/Q1S/egPZTFZlMO2/vqk4XGJvhxJckEFaz92ZUNOQYwgq8JPJDw1czjNZpA949mFd/PYz2JjnV6fTnqqbNsteVdid6YpKZrOlvTy7xneSNr00eSdXg1EBrFbrDTH1M+QOw3qAkfRVOaR2T61yRg50VztYRkmCL7IOZO80bb1vOnuuCxmRQm62CNNjAHoEuvewTcsGxNOjqg8A3GRI2wiITfAgTB1K7GijabDVkAjPrl3/ir8oGPfRAoU07v2DCTFATuuSQ+iQawvyFp2y0JIGGDMcwo2uu08YdkOJpLfQk7oP9GRSKYUTSz2Oa+RA0RSJLaHjIFnMEpA9QHpsYRotuMhjNCnS/Szi+qEwySkLj228rbwAbnXOozndnx2NNoME0fMjeJXdc7n9d1KYAhouLINUzzESi0QqCG44EEpV7OybFGTm6AeIkc1fyREibbrvRg5jAthWhNGZp058Z1GWxdww0MlLm7RILEVr8xPqMp2mDiBTjNVxDBDnB9I6w5Gxn02fTLJ5xblI3mihxH0IwgBLMS2tgfmnAV+CclrDE7HA7afRc8HMtBq6fQ7ZE7Vi5rz2cdzvh3K2skMYumcfuf5pGti03/n/37BLOZKd/lLhok8P3E5/acf5HUO8SOtG+x88BFWAPH+nFxeKBmRpQgSqqRCE0amxB2ZftQ7lstSlBZVHOGwR8W1AxgqzLNgglfOVf0Qxt04fi6/Fv//98AogIzaAT175Vt9qpnW/36hCBVinjaByoAQ/T3dmzRzUEb3iU+P7LF/WZAdEq09BJGrxJnAM3A1AxFfCJb6EL7fTig7d5GoO8QkOVIHfrQ5Cx8SuJixRojuCyWcVmX1sWwcecozkXifAnWQuTyyRyJeA8imkhweHMg4pwyiC10KeKa8sUq1ggMFBaxNvi90Mb5BupEd/sM2I0UvuwhKs1zHbRuSYRA4whoUaiZr2AuCBN2qQjAQJ1BW7NKc7iWOzv76rfYvCLR2Ism7OH8VZh8J5pLWuzDIv42fIExNMvSQk1TxdUXGNsMVN4nzbwBYkNkggHjHAHuJZHsdyHOeb8bkyZITX9vwpHW1ynUacwkEpQ9nm7EHMaaNbf89Bo8Sc00Z0ol8Kwzr/iIIocUeelgj8ljpshTYpox3MWf+PIW26jsH0p52TEPi3aI64Nw+7RB8Zmi66pXQdT1E3/xi1Kk9bJzw5ZqalAsb60iqm1sulco20AZpLfpwXm8c0v8KlEWSPIhaw6An4PJDMymiCC39jJi8C2nzDgK7ZrmcE9j2spgzC7zn+CctwFHMshGyVjQm7PdtuHeIjiYU6nqaYqGvZ9obDXqyM0KIE4fhTaNm2KCAiLIdA0kM3hEc1nh4NvocLVa0J+EQ4ddRoihiaDRQjBvbYECpK1QL8/FfKUqfA2alyE0LctVuUka62HpK5P0IM2L2p3Qrh93jR2sWXlGFCl09MQg3NmVY+pnVcolRYM6va6as7zuPUTpmZ1KSLUFDc7GXhGrBllvERk1B2vw7XKaqeeKp6M5BD+PIVSOOud5OhIsCXyZ2vMpwZmkMCNLtFGibaZZMjV37LU4dCi5lhQ+DcOYIdLvZJ1rbmIY19cGvsyUcUrs0Whtm/oBtkVkoFDk2/t9eSRk4KoI4oW5Qnu2bwtYaNPyEOVmWT78+Z+TYoS/73UlaB4Ts3dZ7XIp1dVctNqKfYt6tktza1tNowFgQh9Sn20KQ9jAw1bbxgmAkoD2gZnnbbsY4uTUVsW8OnphYLs80AE9gsmxe3gEKTdSpzRKpvFE2vWZ98LcHt+zUKQSmfsMfZ+RiyrTxMv1CSiOpVKtqrmnkXAXoCOUyoKXPDRSrUwmsAU6vLehKkYLd9IWZ4/R1lFLPz/inALc67mNdWkftlQQMHeoBG3Sh8bodDvKTIftLoizKHusa8A1boOxfVdr0cHaDMa26q2Ea3nk1Dk5trio9QfMUt0DVM3rsHUPeXtOCitsUBfMRV+B60MfJV8owcQsw0TLx3EELzbybcuPDNHL1OtYeouZhTZN5rvTEtdMMZoS6NS5ZhWCmTi+Xp9roBWbdMZM+gWRiRnHmkjWj4gSB1wcvKpJYMYGokj4mrBlaKYENoXZST9+JcR3tr0FRJWBHAEPJ3FSlRPZ6LLNIKRNuVmTj/+FL0utfgJfgElRZRAOhNtYEdPZtukZvF4N647VV4CxK2bzFgJJYJqiqB0dwL5mI4AQ5lK7O9ThFqO8HXox7raUIEogki4kLrWBRlnHkfY62j1oaQE+g3fMtTeAhQcIBoYG0nfs22i3+ImA4O9EetgxYkgUKLTBMgb5GFtgkiBLTvOFvEZ1NW2BjieYr1bkT0SYc1y3Icwh39ZqM6AHgu4geNaidjo6lDUQKmU6C2dqlSLQo5ty/coNWcY1sLsf+XGA+Ee5kFMHeAjC3WNBENs3QiMyG/YAa9Sh0HE5bDR179k4KWfX1zXbdIjvD4ZW8uc07TtU+IDMPhp1VYsUi4FG+FmYw/drMKlYwE/Nl9PIoXM2CSt7WZg0g77EEn6SWOcwSmwaxYSXZRiZYi57Fvf9u6NXE35LekIXvLNvZjWMJzKhlXz32vrqxjaeM3EmJD9j0wlsJwWTMAJ/Mt+FJzl3+gGtX5ZwC4QKRIeBKyBGLdijjWPH5ef/8l+T2vqDNgqr7USINMExhj1l9q6LHG2LX1+2ZtEAjjc0gAApGR7syvAIQaww0FaOHie5cLCFP5R2BAnfb+OjIIrI5lkt1CvQVkV18NjxgcGtEK8PO0M5gHN52APUWK/CSQxASJGLDTBnraRScsgUcpoEga8oVRjZnKzYP+qDkL2jSCPkTKMug+lK5aIW57OPKxPgqvWSJvxp6geT/ABpMrqrxTNggH3OemCREmIFx6AVhnCAN7d21SnvIVYyhAlXBQEO9rZgCg3Ys0A1UaVcldsIQDICrHuF7y0gyr4HX6zDon21532tiT69vIJ4wbqaRBQsNHm63YHGbqiB1erstdUX0nkfvtFodFfjBh5Ms7KaZyQGmoQ5SgW7CFZyWlPaTBC3o7vkGZPxpAlkH5FzQGPTJE7dNrE0j8NAzqxJfAeZInRJA2dm2lyKki+nFxebZf4sQ6VntSewWtCkcQV33CBInWXP1bmO8bMGp/PkiXO2WszaKzqbqwVpdeK9D8tn/9q/IzXYqSytZH4SC+UpLr0RPj8qCcV9tHnF1hvz0jqHYiApQxDMGITSPerIEU0bSPIDbP5uqyO3D45k/ewZSPuWXLq2DXPAyCJMkFEfyNWwrlKtM7TmDG+HNcC0m1l4wo4qzF/yFOMPbO0CqG1ADB+EwCqtoeYURep4UjrSvGPhDVsmUjozLZySlnY3tUtRETEwNxAxf1CwUW5i9yU7rNEw5QFSnImFB9AId3b3tN7iPlw3aw3qtars7O7LLgg9Ym4UiNQD/NxARLmD8y006rINs4axnBYn2YDAu9CMS7iHLmHn0PaaZWv3VTjED5w4oxqUpZuiKSFGu1pQgFErlIFQDYesUehrURAZ/gCMEvls2VnV1GwyldZIsK6ZGPBYCyZCVYfTyFFKa7PSPzVPps2kLG269AZJW6XENBxmzxGLcpP97uR5Js6dMZcyX03eNybNUs1e47zAXPbaVTPEjOD8icbSKsyDsjIBHcQxpPQNwm4X7pHP/KV/Q6oLa67sC39nLg6Jk1JtAEJDwC0YFDQAF157DTDrghJN2GvBLu5q+jJbFW4C7twGDPvazqG8dG1Tzi4VZen0cfEWjkO0FaUF1GR7a0feurMnS7WKdnIjEVuTxbZOOba6pMRMR55waaFkyzGJarHkss2aa9rljMYySsx19m0HPwbISEitVkuT7xhNZqc71v8WcK+absE2iq22okQ6tdS3EWUyImmIUWBWjBH23N3flX1oh4dg59/ji5ZZtqEhqC15jhqI33cmKbeBQTTyawvESsJlTXER17bfsz1MKcUJSrCe4Il772OoWM1MOsPa0YJ+oglVa1Hz7cIH4bG7uB7GHXowmwgJr1Qbqg20boEmLp10YTsacF7Wvp42X0gM2chulm6TAXQiUwRlPxHb745Ck2/GxzExYhObR9GcRDv31Qm/JQOpZj+nDBA5DeKkvjd1fdPIUuysa98kY/NV/Mh2Z4t0okoAqdWwgScEgkbYxGeubMsf7x7JX/4b/6Y0wQTW9xCtWjODsb1HRCtDbMYIpsCoA2vVwLltbYmBrcuNGmGDW4d0bnty66gvL9zYkd95/k25fNCRn71vRTa7kdy5eVke2GjLR04sSefUvfLO3gm5ubUlh/AFDuHv7oCwSBy+m/3w1s6RpkSUIO2KeNKXYJoCrTtKf8KQJiMI1FmmyQiCYncITQ6EhtIW+tQW2A8dvUrCD3KuHYpnhzPiuwWXg8T1I7H2iRiNxoraHMEpZk8hzRhhsTzg1kF/ZAv7QZz5yDZf2IGGWF0E5Ml0DZpwRVuayi2ludQ3oiNgO2DUBkyZx8/dKw0w+REbqYH6q2Vr49PRZnxg7NsO2EM3QpZalhHpeqkmy7UmmCCv+66mXGSjz6oRYozYOo/eBCNMwqBOmkoGKTIJnU48/CTpwsyFRJNH0iVykgFiCX/3r6XwbewkxASvPevieJrTQqGk9Q6WCVINk7SEjKJZFMkxjXU8IZhHffnDrz8tv/v0y/LF30CcoL6hiA5zgLTvERgBuhoMMdAGXszmHMGH6G/tyXjvpqwea8hwe1v6+OwR5/4edOXt24fytZevyrfevikDqPdHTzXkvlOrcnAA0wu29x+/fgv3dFOOryzIe+45Ie8/fa9stUN55dItefPadbm5e6haINSNtcRr8ykD3U/OCtDKQSan+T3dHUryeL400TYmw3VgYozcSCW2SlQrgTEX1vSyA53ToNpXKJ5XnbeMZFyEnuYVibA/6Ks9Tia6sUe/he1WRgqJLjQacPo7mnpNaiJitAPGZot2wptUczwqTTiiakTn+hAcZfgUD529R1bqDTBUX7Wzdu2gFghslkHk/FLOkyBkyuh3rch5FXX4OwVbazEa2eOGYQIXqybROlEToyRG80ICl1eSmg/2RHYgSEqQJsowTEZ6hxnpn9hJMmuGZMYuTEpq/u5JMh7VHjqtRzCOYRU6nWKbyGTPmTrNMqUbUk3i2YxSP2WMmI341Hwk/OsjUPXV3/yf5be//i3Jwz79mSc/YDezDom0hyAYEB7avmOYO0SV+JPoydHObdm68qLc/951PWQHdvoWfIAXrm7JH7x4SX5wZUvLCi+cWBACosdXG+po70OjrBKS1Rz6MTSAkT964SpQjqvSRNDqifOn5GOPfkh24Eg/88o78trlG7LnIraR6WvRiXckCo/S0SU0w1YuyfQgV7dMgrepCBbHp2RlVFbT1skw8Qw6z1MG0LaM8Qw6rZyzwobo01g1w1gZkygUYcpbgJG/C2beuXVDDjYhFDavy+mCr1mxjGdQAzMlYwv+Eh8j+A1MYjxiCjsDXnRkcQ8nV9dktdFU+Hf/YF8ajZpGjhnZ97QHsk00pDlGTVSAX7ZYq2OtarrX2pIG36XGLPqiXUNirdPVpmRqXzrM3DOZKZMp1m7TeCORGenuzTBFQoyS1ilM5O5MMIMkZk86gMQRtpGkO3dSu5bY9NMEnb6eZYLp8zoN4rRc6nyk5zZGJrRDu9OSp3/3H8k/+b0/kGfeuSofBHadA/H2CXtiXcIOiR82K8wLpmEPW5DS0ASb1y/LjVuvyoULS/LOpavy/Gtvy6s39+Tbb9yUFohlbaEoTz6wBsycEtWDOTGUcqVsTRI2EWMgC9dDJIglhj0QVh1m2hFs/acvXtJKryUw4hPnNuTn33cBzmAor13dlIuXbsid/T01PcbMuCWSEthu27E/EYMXcWyF90nzqNvvJVrSxpesIOB3CD3qsTTHKZ47lzb0VXBBJe1IzQ4Gv2xbykAn37OIqQE7vYNIMlMx2CisViloE4B8zleHn1fGWIDCpNC0AXD/jcUlObW4oq0e2UqTPU/pKNtA2ViDdFwL1ipzzerVJiBdm4RHq5XBRq1ZcIwfRmPVTqrForHC37l4rKq1c1MtkH3GhCNzrJwZhMaYpFA89RFSBzf+tKXRzKCK2EmOJbee1k9UkEP/E2L2nIaIMytlItbtTTjbsfOc/Zl9eBkGS+7b9dthJVn30kX5Z3/yA/nOq2+pxHvtpYvYKEgrwJ8hO99ppzuYFm0gLnASb167Jt/58XPy6u1LMkCQ7J2v7sOc6amdvt4A4Z5dgrQq2R4+sFmZ1NZiuSDsaEJ/TIJj5iozTfkd9gYiYTBNoIXz0GGk2VME+sGKrFdvgLlefFNWGlU5vbYof/6jDwDtqcstOBI/evUdubHb0uCU9j91DK/7FFpCt414h7ZEM17FKJMsqRsbm63ehHKNd4fH0SwTl99vAYcc7qMC+BdI0vamtHd3pYo7YelqJUet19EeZlVIaZ2BzEEghHbZ0Ldri2+WG4tyBoicwqw4J1MoqKFa7SOlCM1JQjCOqRcMtFXKNfVHSmD6cslGmplox/rknLHlmWQCvV+20IljKnbjfdvtPkMgCRO4QpXYkY1jClkHOLbZ1X/wUtvcTJtD2hc887tqmqlOexlSN7G6iOMDmc/GfkXajiiGac3k59x13o0Jpu83ZgIKBkKI9/hj+d6fPi/ffvkNKxFx7Gsg9N/6rd+Uv/LLn5M7b11DwKwrh9jk5197Xb7x7I/l+StXZB+mEXl4iHVbLPvy4IlFuXetLI1yzob2tVIrclMGfFlZXNApL6yNJvFrKoCxeT+lUk47QRQQAKLmGIe2Ts/H9RxBSnIaTKEApgCu/zo0zhhwK5PyaLq8/16YFD97PxjNyCtAo968ehvQ5r4cII4xDm2bl5E6xqHEtMBHGLl6Ds9meeo/z5vwocSbZyTY7xEGLUEyLyws2f5F1ByAQQm+ccooiZCBOZpljBscdhkQG2gWGLUD0Z/VZlVOrm1olL8E5mEz4i7W4QCR6mrJdrLbPWL26FDnR/BaiHQVgrwKQka42xBU1FJkPqVNTh6itqK5NLJNBIgC5CJ1kmXiBieIxXs3tzWVwSIyEQOwIt6NMvKSZJ+EMBNDaN455e7SPEu4Zsbs8lI3OHFNXKHOnMeM5uNXXQUXgzbnEFf48cWX5Gsvvq4EaLs9j5WA/vP/5u/KQhHIBOC7r3/nx/JDfGbgJmUah4jweI28kc8/eV4oJhZg2zP66RcDrUQrQbLntT9/6FICAtvQF5fbXKjaemJuLoJYHcCw7H1agmTrQpoRZ9dEQn4+tKhXNzRqMwd5mjEgFMYOrmxK64U35FijAmfzlHzqgcdlnKvJS9cP5fe/96dAobYtQ0ZWu2q3vchMmJzRNHThhF3ctifuQJi2/rG137V6U5bWVnW+WQ9oWz4a6/itbZiObCZmUyoKsnVo5zBQqjNANoAp00TcoVRqKBRcQPyEEejtnW0NlHm4r23EWQ4ggLTrNY6pwT+gSnnfVvBZE22gvoo6x5Ft90J4t4dYzQAxCvoGvNCyh7iIogwZxCS29RJrY5owMyZKbNvzRZRhADPz5ayjOp8o50aV/VTyJ9/LqGRP0pFCKUNI9gOSftMk5lSyn3NMJDuU3JezwPLeePlV+Z3vv6D2JSUVA0jReKQLfQg8/V/5d/+WNQFwmFIup92XNW0ksAU+ajOzWa0xmpRHJ79QsMl3+WLOsa2rHotswwBmSuah2mEZOU1otGlXY6mhsK7WDgQ2X4a/s0iH/YNo3+9qUlnexjG8MdCYjjxx4bx87Kl7AOci4rt/CGIMZW3tmJysRbKMc1xmUGo4dAzAJn7pAI94IXldOZdfFK+TTp0xvpP+XjK03bbut77m2rET2lXjAMw2hDNcBwF3e6GcAAK2C1ON99FiFRm1oNZy59SqaFar2s+J00k5ZHGoTcWY+xQqMtUFGKGmFP0PL9A8oyq0TJwHF7rZyYRyxfkyI6w9fZAjaOq++heh9kMielZn251M0aST7jEFxfZ7KDNpEYlZn03Ky5hNEhN/QmITxHa3VAp7zEyppJkMmun3M05G/Nlky6yTYb9vMrUIXhpUyxL/dAxCm5zh35mckc3Ll+Uf/MkPtZOE2FouRWSSdZpCu7hebNHOYFMpb0fT2U1DtBjIzunlutqzmtOjGcEhbPySmjlEcTimitoiD6nWc8fhMVhKKKFtZ0JGZN0BHWhqjxDnZA5OOOpp2jFLIdkmsg3n8+Ezp+TPvedxeeXNt+T3/8Uf6+yG82tN2bsRyusvPidtHOXoYKDQIZ3xOCY0b2vyeU+RIu2n6vyvLLZmp1/5en05NStZ1JOX5bUT0kUspXXnluSY84RnEcFAfocBPApgmmkLzZo6vmxzQ5TIeDnEFlYARnSwRjltS8Pl4PpsQ3tQMPXdWo0Qas57ee2wEfu7ZGhqFUp/pVLPNvGiOUjNoBrYuK5+xZLCqzl71YHmrHuKKBjNN4/bjk+YPlOr5E04pRmb3ZuffpF8L5HeUaJmJ5AgiWYQnyxRy8SnxZYwyhz73znr2slBiXW+r5A1j07ClDm4cUP+3jd/qBvCjFBKnlhIWC0Ya75JAUEJw9kFLDfMB7aVICe/vw3YcAXqvaiNuGz3CtYVhA6IU9PDRAksyURhRmy1cVVgbCmitnX0bd01TU43n+3W9p7UGgtAV1ghFsm968ty9pH75eW335H/6Xe/KjUcZwjosAHM8MatoVQAXRI+ZJOwE9Wc3O4EciuKZvYou0bavNcNUUxMaGN7lmr8yXWt40P7qUJKL66ekGMnz0nrYFe6e1vaXIDllo16VeuHuQhkhmatDJu/ow0ZuC7lYlXqiL7rrAmmSwNE4DBxagFmpR71B9bBxTUNEYUuctKQ2CwFP65n9zggpK8BvjhrlX5QfzxOuzXyXPjuKsw3bQsfmwO6CVGKD2tswRiHntgwfNwaxcwlbJu8lZKFTBLwBH1GCQF7M5GA+Y/pINe7aZX0miSGoiSGOuY5zHp+/HeMPbTu3Jb/9Q+/JyPP1upqhmb2nuMi+PiQxiTHNQ71GGo+T04KrITDMVqIA1BC8lg0iMYszwwd4hXawFAYxULBDkNn8XroNk40hXmk6RGMCRgNnHFMUgl2eE1uw/S4cOqkPHn+nNzZ2pH/7Wt/BHh2pBJUigNZhE9SzdseSHbQuo8oKzNYx7IGInt7p61BK0/eZV2ZtsxufyIawQ2zo7jwvaEL6BGVKeK9B07fh8hzUa6/dQOMsCclXH9JK9QQXxnZKZ3sVtEGk3IHCESU2Y6xVHG0N9b64hGb/2IJmLtE7J8mIQdsETItY00LOWtiRo45jGav9qVHx1sRMev4j92U0tDYqDJ9OHYi5GwHlQv8MjPztEVfENche47wPXFFetodLPLSzg9qthBvzuDtMchknGkyTZSpnxEXevtzUZzEXBFfshE87yc57sYiRpPIhqftV0zKyjKZzWp0OOCxiicNxAD+i699G4RrJ1vGgUYSMKVXiqp4yXfj80auZQxfMzJbiQpqJvAeuMnD0NbyEn7VGWeaPh26dppGNYgWomeqxCJX1EMMvljMazo4ayBse0Ooe2D+izA1PnjfPdok9/e+86eyeQQb2BWdcNPpP5CA9pm+gAMf9EGAuI6NtYrkipGcBiDw6mZBNtt9h8zNrrHGGrTzhU3Htg22xpagjS3BVebALwM697Vl2Th1L4CEPWltbsr+3racquYBaRa0MZqajOwdO7azGHgMAgcVwMFMCGRW79ragvS0RsPTdjhs3dLVVo6qjDQSXYdZwy/T7+K6U2t1wVgHRIomygpSuIS+UD9iy5e8duzLq5YNyQhu+rwWXqf2btz7xssE2OJ89aTAxW18kjvkUJoY9ZxWHVmG8L3pVpMx6uMnJo2W1pk0eW4ewjQrwUxiriXf8VOtEPsKCSSCjViHoKuDCf7Hr31LjoY2GY3YA+3KuMotztK1/VmdSZjct12TmDEsEmc7PmumK0ysW/st2WgsWXPH2JYygcsR0hYsY/t9XhVTGmg+UNpxZnClVND6Wi4wndZut68D+s6tLEt9tSBf/eGP5dLWgRIWJ0SOohT06EDqVzi7gA47jv/w6VXJVeryu69cR4xE5HSzbH0asVCpzFEIRMp6wx6i52xd09S26tTmLL6JQqudGPElXEl07YFHntB+p9s3r8rezibWaYTg4ZJi+UyCK5UK2hO1Q0g4Dz/JjHQyaMS6CPz94XMnlMlabTjaQMHY9bpHxotENSBNTA4b1J5NRjR5TgWK+g6DxJyPRRYFAWsZuCfaKU81Yl27bcTpQKlppNTHbgVRphEU2xJaWCxw+RmRS0jj6yxDxEl5KbE69MjM+grzCNkCTXF3jHhEqe/iErMMIHI3xztN9ku6u1FYK+Jh27a4EytBnyh6Uu0eyd/+2ndk+6hrz+/JROeLaQiXixdNnV9TP1x0XaWxs55ygQUddhA1DrQPUF4DRbmcbYliOy8albTU42QCVlSRiejIsl0hzQGtt1anAptYqMj9G+vyzMtvyo8u3UT8IcRGD9V3YOv548DfGUcgpLgB6LWJyPVKxTYKfv76rrz69mWNOQTghFXENdYq8DU6OddBe76/wJqCcWjjKHXOGajXpYzgldr6IVAnVtKBEXMwbY7DSabpoyYKAl8nKyVtwajj0CDtCRIwIY6FOt1RVxeP981+pGT6PVav4cCER7tM7e6CKYiS4V95EEljpe5qtPtqVgaejVNQ2qvgNq6mOcgpYtdmP9QYDcW5lisVjWVob6rAtq5XjaAmkEs7tsQT6DSXMZ5K9DnbXsMSfzrpJNYScTvFmPjSjFVxeH4G359a4MmYRYpaJI6a+MkA7YkPymzcY8J5NUZmI8oZ8wzXdKYeSAEb9d999ZtYcBsRH4NImbFJDcCcmZjx4+PEOTieSz1IzUIrLGwIP1R4jzZwTv0ro/UGFvG2ZpCF+OyMYc/1Jwp8G/nkSFRtM6MEwmbDns4HY67Pw8dPys72vvz9r30X0WprP5fhhK4iUsVUmXNghPWi0VnEYzYFAHPfPvTkKgtbIqP9jhQKhZQ+T22A7xxvluTKoKDp2b1+V9OwZcoXU78EIplNeDd3tnDNQIVWV2H3l/VexuyQhzVpLq5pG5jD/R3ZvH0TiE6kw/u0MRjs+jqkMCO9ZG5tG2OssKsVWPDPXkYFCcpVefP6DVxvJNtAjthun5M3V6sVWYJzyzXV1GnmKkW2IdmA+U2uNpnpJAUI9S7WUrtlmxQRJQOcWlzGffsKu1LI0pTNBZqP4WIJ7qcGWDT/aGzVnWMAX02FUGG76WBU0lM0Q4hO8GaI10q/2OSJ0zZM4i376eA/SZ1wT7JmVCZAIKnjnWWIeXau1RKu7Tt+udAsyhABmr/9jae1sosql8gHJd+Ej5E5dsyOqQ8zqdliU4eShybNAM4eJT1/ZzZlBwjIYq2o/Ym0wsxzM8Ti6w0tbMroJx274TDSnCOu7TqQlHOrK/K17/9YXri2pYmNFfYS4vA9bOQ+CIFS8RDMcQ5oULPgzFnNCDBuiox1dEmctXIg55ZrMmYiP9CXOrvOleradrLT3tdOErPa1tNz7cH21+5wYILG4pIS05BdL2B3L69vQNqDeMEsAwiZJVxjs5zX+zlkBZm2n7ejrLgGTK9eJkrEjtnYg3MnVzQ1m877Dvaljb/rNJ9K1Rb84146LOpxED91Mwv12QWbrfNDlwHL+A01QV/TKCyVrEOTMWepxO4cYrtv9DW7dWQr1NLkOivJw4QRrJZguWJIBtDib2oKeOChn9jQ2SF82ZYoKaw6XeLpAmDaWc3Y+bd6Y460slpB/5iR7O7z8TGyqd53g0ST38V2iHvPUl2uXLosv/3Mizp+SOcuh1FSp8xz8d5iQkh8IHug5FqyDBtrjliKUqKzeRSlNb/OSASdYaYTaD4NC3dCS6B8+K4psL0z2LVsdT6wnSkePndW2gdt+R9+7xuy1x1DOtqqM90LY6vM1BwwdsMvtYZyTwPOaWBbQzIviZ2lOceYaSNPHYdEhLny9OUtjcwea8JxxueI2PBKidT0x6HMdRh4b5DoB/v7Uqlvycbx41KGqUHouFpfUDRsb/MOYhS7MoDJWW9U9b0WTCBqSc45owVpYWJPEabmQkNBGaZcMBX7GjQeES3SEoGGRWgRSnLREtMAzvQAQca8BTAoP3wbaGSTBQbLdNi4sblHZDZ+5jh8mzMrK5rOzalDZCFWxu122nIDwT0tzEkjyi6niFFGTm500k27jqna91UjaKF2aBnAVrdNSsaYqSZUa8IJMczKp0VxlAeS9FOH97ufMewpGSKJYxQxEfpzHOmEETKvy7inJxHY+vYzz8vXXnjNtljhpMoglxB/zAgT85gzXJzec+rU3+2e6aSVopy17XGfB+2RHFuwzppOj2fOEAWJSU1LQtfsRMFIaBG27wcfeECefvF1+WP4A0ynaJQKFi40NmWA5kYc2DSxCYAXrxwMZQm3V2buD45///FFubCxpNrw4q19uXTzAEQTadc7nWoZ9mXgL4hfKOrE0AHnK4/D+agez0EHut9TjcZqODJ+DYzAXk/MwCUzjAfMzi0rIxbcPGWWT2qaCX5nk4FmfVF2AI0uNerKZJs7XXV4xYEJdaBJJ5tLCllznyiISLMkYk7rKRYKer9k+K6mbdsoeSwkCRufaCzKCrRNSUGJkYbOGFk+BLp0u92WzU6Px7aMwJRbIgvaaZpJdtQKQeQ2eOxsY1YuOYYIvBmpq2TupRI5a2KkrzNBOC/GrkXSIFzKMBnSz+yCl7ybYgPimMZMmS3uPaGD6cvjjZL8oz/+E/nTS7fUbmTWKIkrdv6Jjmjujkji90wGzfwEorVMZsc1hWLnLkTG5v7E3xs7iWaPYUP+7NBAB83TxgCebojtGeRpigadyD5MoqVaA4S7Jn/vX/yJIkINSPCc68LBzexpmrYtxKE0pqkUunbnZeCkT51ZlQdWq4Atca0IHDED9cXLd6Sto3XtsnUGoSxDu1ArNhFr6HGvtfKsJAEkZxj15/p2yXpElk5IoEz6Y5fp3Ts31DfYP9yTY7WCRsxZoOQ5p3S9viTbwyNty8K4ARmTw/7YlJdlsDuH+7LPGQ8iioKdaC4rdEKtV9RW8V0tNiID59WaCdVfaYN5uhq11yIbhZCbuI8lrFuN8QnfNisYqrDL25JSNkRz8Zuc7ztGiO12P40NqMmhPgOJBcyguTahc5K54UNV6dnxlOxI4OmNjZMgk/UDJqu/UuaZTMSbI4Csfe84zHgx4BWlRGkCF/WNMse2KpG26b1ggDLU9H/9O9+UK3tHSuRFLBI/RgeNFWhUs6oNAy+BQ2NtmV5HljmdNqLDG07/3T4iDTCF1vRSqWWUASkd27CXmSbMq2ZtQtQzaqYQxH7s3Dk5aB3Jf/6Pv6r3u1SvJAM+GKnm3ID+2M4FIBExM7OSD3S6DPsCrcE/OFEQRJJ35KZvg3oafaXmA/MMIjvvuGD7cGoa+BKQpf2wJ1G+BkYo66BxncQpmbyj7P3hNTNHmTjHHquEw2kOkQmYZEcbndpiHxK3TsgX8CvbSfb7A21ByaZeRNGqbCisDVqNlngyh45xge0jfK9oew7xbwQY6J9QUBjs0YDTd3DOMvwwZuaqo0wIG4c6wno2cYxjOgE0r/6tTt1JUtrB/KzhpuZhUzaCGrEpEG8c2xwmw7i5SBpBZMVaoM5z6Nlp6rEmGLugkRLfyEuYQO1mrRpyaJRYrZMlmERDaO6cc2QzToKSs/sv3oMU/bFYfFzTEGNMnnPGuXl1SI2HgYi8/vqb8jvPvCSHcFZJfB32EzKiqEN/0JJaldZqqIlfnCPMVF+mCVjs1kuCZfEjYTSV/DZHiTappnL4ZiLmwgCa7ya86Now1A+JNhpbVIcrU2Q3bDeP+D33X5Dv/Ogl+dbLb8nxxRrMFxupbuE7ti+om2VWKLg+n75GoAnZsgcre4seqkAqSKOQ01tgyaIGu8ZGTS5F/XD9BQc1NqAta/AnKsO2DIsN1ZAl+AujQScRZNMPrdoDMe0j2HX8uNGs2A4Y4OjwQKU7Z+HstbtSpbTF3xqlvJo8tCTGuE521Sa6VC0X5fCoD9OoInf2+tpmflsLcwD5Vus6jJEmD30LonjMIaLm5IyJkQMl6PdomapYLbVQIITc1Pvo8vMuCKr1BzrfeQhHeqAJi9rTKBfE9QjWnuLmmwTGybRR1MhhoG1KkoCbN06r2TzbVXnGcXYEYfNjjOYz2TwVR0hxYpyj/cQjyJg/kUyaU9M2q0WD4l9SQ+oE8PGT+Uh+71vfk2cv39J8njgvJk6bUAeXgTJjzQtxGYs8phUQWQfZm5L2k9V8kYkmoNSYaUPbTUA3IZ/zbISU3STYfjFvhVAPhLGOgNPZs+vym1//E7m2uy9NqPQ92K4HnEPA2gjwJRvhatCT0OjIjnKK3JAT3WrfTxj1Zi8EMQdS4WaTMVw3byb7sTFXTnOddECGLALVWSti70q+PPXe0/L7r2zKqwPGAEBsUT81jjL3ZTxbedYA4kNGvLO7LVu3b0u3c6TjYNklg10oaH/Xc1U1GtgwTClN17ok1WJB52NqajmYnEEz9kIimLBaqbtBHsZ2yeNMBjVrfCV6XVvCpmC6LivNjO1SXsF+LpQ0dVf3T7VEwBLZsbaM5H13h10wnK8M0iYjgflyxk9NlDjI5E87uNqrJzYHfLXlVAr6Yxt8C10kWiad2GxE2mf8wfNcUMMRjJlYX0d4KSKToDMmGxdIv2NMhl1cwlUeH35koSLtrdvy337zGQSK7EZSDSexiUzMxPNsz88Y/tT2Iv5US/o5dvIkGpU61ZFL7Y3PYd8zFq7TWcOROovcbH9gg0wXTp6UZeDj//3vfF1rmnuIaWzDkWPl1kK5qFegeV8uaj52SEicbZl9xIFAQobXD4fy0GpFSyK1w51YBuS58+q8crCGzUGib8hB3outd+Q/+PTD8g9+XJJ//MN9XG9fsjlIKXoXyNlzF2R97bgtltndUtOoAxOUdnqcyn8AJr9TsDEVxhOGmmZui2cYU+DQQH6QNRYKhUID5EG51ZxNpuNs5D3EJEYuQsmiHXbTphTXmXi4/r6bCMpRtjXA1fQdcjS5aC6xRQx8lAHOs9psaBCxAkaJBoFsH7alUGYsBRT9xS//+a9M4+/TMQKFNX2HztgdsFog+Uz8Hd9JdJk9jj95bH2djDFKPxOfLz7QtENuHLKkjOCYNq6P24DD9ygCSt/+4TPym9+/KAcDN8Y01mxibeMY9o1h0Rjy9TxJ6gv0iFN+epYJJrWT1XCRcWnhznSaiKbjfNd3O7LV6ulnaJawX+mHHnlYp9H/r4hs7/WYOjzSnKQmCIdwoh+bip7ry2o8yWbazkN13DcgAT3Nm2rkc8lsau1g4RkbxVWi8aQCFcGA1eX9rlRwlr07d+Qj9yzKuVOn5YdvXlOmUoEZWfAhB2I9d+9DcuG+h9RZ3tvb1LhBa39XzSK1dLG2PAe1DgNbmlQHIiYsW6k01CQquOyFLoJ4/BLjOcxuWEBATTtsw3xSMxuf4cDzDj7H3ClqV8YIijGMHNkgLyPpnPS53KwDfh7LFuINu/ApBkTFGM+olYmfyybbYo4jje7XcO+f/7kPSPClL335K1mbfx4jxMRpssQpac7N7Hcl0QZZzTB9/HnvyV0YMTF6PEmDKc50qQHdeg8DZFt35O9+9Y/l+Ru76Zgr1wJ9qLZlPrHV4ymbsZkUm2iUSpwiE8WDB+7ymDbTjMTpJZOmUXwPgVJiAFUM9d8ZKBP82ic/KJev3pT/7dt/CoINdWMrMBPUQI1cyreZbDMTa03jiD02KafXzbZMF3WMOyC+jUZB7XSaIWQ0/o1Slt3vyPw0l7ocLILXFWiOfq8jZ5oFeeT+B+WZd25oopz21Maxl5aPyQMPPq52fru1L3tY94O9LU15sF0SI4U7vcSkNDi27TlawH7UEXdo4lqOLdRlC8xDGJftbYgr5MEIFQAZxgk4jZXQacf3mIodYQ0POPBdjEaGyWT0u1YAv7LH6mKjJgew/w+JEHFNsL/LzapOPOWwFc6F5n3y2Gs4/xc+/UF56okHHSPEQu0uTDBP+sTDwZ3nHG+FC4g5vyH5N/mINyp7vuSYGfMl+zd7bFv+GJ+bcYHzHEoBtOPrTz8rvwWHeLc7TLRAGHfWMJIQPR0ua/9HiW8UOxqsMvs3/9pfl//mb/1tGXdCefmVl23K7hwmmHl4kxBxcuJ43VzsgK+XQAj/6i99XF5+/Q35Z8+8rJtCyRS4Y/vOBHKHTdbBmJQBPEn9l/jHrHawQompFTvdofpkJOgO/RTt/RNrU6OJcGx+dQ1a4cxCXoXBPuIZ966DwNY25LmrtxW1ai6uykOPPClNYPOHezuyeeuqmkXMNZLIjrMqMzuU8RYTT0C110FE6wQiuwwI8lycT8Bep3Sq2wOiSmVN6OOoWdYeqy+A7x0RMsV77PW6dQhEChKQmafU2IxML8HkWVlqSJ613WCaDks1GYdh0+FqURabNZ0ld+XmLhjKxowunNyQX/viZ+Te86e1FjxnJAZHJvNyZA7xxgRqad1MJD44Gej2xZsyG2TCBIoRlZioEp9BnJ/gTdqj8Ubzd7pB99SxaezOdrAnzz73pnzn9auyxQkxrlaW28uYQGwOEXf3tEAjDf7xGqghjEOEVupV+Zv/xX8pv/DlL8mgP5Z/7z/+D+Xkmfvlb/7N/xhw3JFM20gJYcbAAnVJogkko8VMAiPz/QunTsj/9+feLxcvvijfeOENTQO2tckxQOElYILvhIii2LHv5C5D8TEvjaRktYLKZJdawdujeX2I914DhMliHCJEoeMonTsAAi/CKV9lkQwkLLNAKwXbvuXmlavy6Ycfk7ceRWDvxp7cD5OojhjH9uYtoES7Usax9kJrDunkcBxxlTEP/NxU6WuFFzVFk/1GfdHUEDYO2949VEQpgjbI67COQHO98vgctVTgcrGIdrGnI5PwjJpyBTD3WJnj5NqKmlkDON28ijGOG41sIVPRab/bW/va7jIAHEtufuL+c/KLf+6jsrG+rOY86SAnnsg8H2EW708XOjYtjEnJw9NU57R95OS3TJxYmjyiTArzDCNM29cZJn3/wkgeXhjIN5+9Iq/v9OWlWwdyR9MkbOftRNK77ydRYJ7TNXwdR7asz16DZeh/79/+G/KpT39GOpd2ZdSF1IQt/ysf/zTs1Zr8Z//VV4Brb03cVXZ9sq91bUycZp4yCz/x6Lmz8q999sPy3PM/lm9dfCtxdjV+EVfqO6KPYeLpc03shTGJdoy8yXN5CSO6wTjMo8Lt3myPZRmSc6Fg/ao43aEDzqgSBuE4p/KGHK9DkHQPVINsXn9H/uqHHpPRq2x1X0GcYF9aB9vSOwI6xJFPvEaXOMjroYmXx/FWoGXudG2y4SLs/uOcbwbRu75QlYMjWzs80CxUMI6X16RCbekC7cB+UREc6n3OXzZs6dhDMHAkp9YWZZv9WXHdS4sN+BtFqTQ4kWek18DKNk9jAwUVBOwicjQYayyMKScfefIx+fxnPwEEqwqEq6tIJmMewZfgLMvdTeGJxZ+14SWx2T1nvyc2speq9dTsmn98pzxn1HvCUib9/f58V7bvbGoUcTkfyiceOinnT5ySN25sSY+NYfUSEsNBUkNCMr9LVoQqGvMbv/bnZaOyIeXlJSnWSlLkoDtQzkZzTd5z4TF54YUfyX7Ppgcn96PaK+niJCZz7NiP4Wsmo733gQflz3/gcTm8c1V+74cva+TTc+Wc8Tyz+DiSUcjWIPQy1xq31DQZYMLT8tFJU9b5Cp79m4k1JYj1EBLzYBgppMxzDyLROl5GpJk2fslflxuFU5BrZVnze4rjbyCmsTnMy5XdAzkCitNB5JhxBB3aHdc7i23lwp5FObGjunydVTDWDtbHaxUgN3VpI1jGnkbsJBE6+LgABgy0eF80Ak2o8wAR5oNeW6do1qolNX3u7LdkebEux1YXtJMHP18q593MZZvgWAVzsMXN1dtbcghLgVhIOe/LBx9/SH7tS58Ds/maXMh9ycHPYeFT8GUygsi0CJ+yz2ffzzqyfmwKJYScOolZd1L/n8LaEybIbn3KU8k5Y9Oh2+7IxZffluu3NmWEjcBuyNlKKJ8Epx/0I7m+fWADgiYmleSrdqvckMP4n6UpT05ioz70vo9KEYEdH5JMuz+zPBFO2kptUT7y0HtlpeLLAYI9uwgcxSZlfIwskmMRJHvdLK554N775C99+CF5aK0kf+f3vq12rW1baWc2jF07ldCkWjZG6bQ2QqxfZKsH7d/9if3xk6Zq8Z4kQsVzq+viIPFkJEKoR0AfD0fWiSVTVMEETcQT9mFGmOYJ2ZGadIKyHM8PZQz4MSxU5Pkrt6XfPtJWKbHHYl0ga5KNQxvf4DnLRKbg+zAF/eTCApihohFhdqk7xN7lYQr1h8a2ptHco4H2aerptE4E1tiiHgyxDKdWh7ng+CtLC7KyWNXGYey9ynQKpl4wzqWBwsCma9xWOrCJeXlc36d+9nH58hd+UaqNhjZD1laeAU00MA2Ch1YjxBR5l0cWicj+nrxOSDj7+ZgkxE3jSaPX0yiIZM0gxxjZx4SZhAtv9valAKJpIAq80lwAJgxYrbcrH3zwrNx7+py8c3sH6nDozu8lXbcl44ROPyp+Xr74i7+M8H9JxxJxQTVmHliCLEE6sujll//cByXXHcjr165qNun08VLzxN7FCdiwpyDBPnXfivzvX3sapkk3SfIbaug/bqAV37dJJDlXm1a3MoOX6RsU70NyThEzR5A5ZCH2VGJWiZ0YezyOicVrxi924BvtDUKbwwSnsg1pfLONKDiEwflGTrYgaF6DvT0KreZlZRrrJ0h4/MlgJGMyo8iuM0tDOYWI415XEA/Ie57m+zAlIoAjO+LkILGNztjtY8DpOb5tR78Ns6uL3xcXmzpl5xAMdOb4ur5mnpHOrcvZnCE2OqDPwfc5jHznsKt+BeskOKfok+9/RD7785+UxeU17cjN+nFGtUcADJheo/1gpxnhJyFG0+/5JmvOOGQnY5pYR9ESPGsbJnKOMvjfvKjxvAewA3WmVkuRrFUqiml7QCJeAyKwtbsrZxq+/PyTDwOhqMnVrT2VKPHtJakYXsps1oQBIRwdyZc/8wuy0FzShfJceoLeH6+fKdMjnNvsy0c+8CRiFjV5/q03tY42dYoloxl9Obuxro7lg2s1ufjWJXnphh34kdPEPpt7FCVME+tFC7Va6W+SaH1iyUnG6HPf1dxWk2qhrOCKGSjjcFgt7tsxrLH61R5Mkac2NTVEvkypyehyS64Bd3/07Cl56cotubJzoOncYzfom0UwJCpGZ9mmslKtaFp2HSaQai98dqlel3vWl2SlWpCjDssuR5pQ53t5zb2iJmApJTUlTUWmVYzZqwgAxmG/p9d4z4k1PT4Levg76zt4zqFrGECzqMUipJ0jm2rBvCIE0n7xo0/Jpz/1Mak1ljXPKNT5a3kVMXSS2VlQJ+b8JMK7G3FmHVg+sqWNyQZFadrFvKfOK5ZZBz37mH6Pps1+sSEenJ0TpaEUTj8kWwd9GR8U5aXXX5XfeuGifPSe6/Lxxx+Ujzz4c/LHr9ySH7xxGWZAqEU3lGbWmnFOtWdTPXbabfned78tp8/dI6bP4X8MGBLYZgFKTqe0V6o1ad3xZPl8Qz77iQ/LYqUp/9lv/0O5xKnxmQc3c3lxWRYXllX1PnR6Tf7u776kXRaoEdnRrRDYtIkwERJxewFL0H6CQLn3s+tjzCQzOCGfDVomTBA33uJKh5JoYYYF4smUVinHzrY1x973+GOytLYsd3Z2pAqHmGjPC29fk1Pn75NHn3wipgLtqhGbclqY5GAsdph445VX5eKPfiSnYa+zqVcHzqlW/xIJgrnEZDuaPP3I1hXomCvsRw7+wABgRRdMc//5U3qxFZiuPB+B0Bag4GatqExErUOGuHL9lpigZBFQIorYz1/65PvlF37uU7K8fkzbSXLISRl7SNOINdHah4lOta+ay4j8FJI4YQCRJDXCBv3NBFPo03VBS1T8PEbw4pB/ZkPNZIbqfIjVaDeV+zcqUlh6UB75+C/I3/hX/7p89BMfk3/jP/pPEOZvycsXL8rVt9+QzuVX5cljBTjUH5FnruzKs2/fhOQxmrPOeb+cx6sBK0pnnOfv/Z//RBBXgaPsa6G6BxXtj+x83nwlB0mHBayy5w5QECzuex8dy39a/evyX/3Tfyw/unopwfXPnzqrzh837NhCWaqEChFEIyqyWi9p12aONXUUmBCjL7FfM9kyJ0bUYiLPrkkMJsR+VZBZYx3o4WIXFn6NbDuTUei0iE1NUWebx9TPeaoBmdj2syB4+gbepZfl7//BN1T7caj5B9/3pDW5PM/NYPbd6zTWweug2XHn6jWpw+e6eXCk9Ql7MIuYV0SkiHUaLOZnhm4fZpCBZmHF2y60AB3nB+85JquID3DkFKcFnTi+puN1S0UWPY2kWLbtMQ/bbOGY0y6ETBndR6zhQ+95UD75ofdLbWlFZ6vRdCoBAQzANIOBHX6iIAKT9ThNJw2oZdzVKcaYQHKmbHq3K5ME7Ro+JVHRpK1klNY0R+nraKJg3MxljHTj7ejXtXFHnvjcX5AXf/yK/JOvf1X+6df/UP6Hv/M/yh/jNTsuHAde/7HPfk4+82t/WY6d3pCHT8BEQaR0HcEXzvOoVJuQ2utY1LJePwvN7yAu8d5Tx+XCfffb6+AUSm407FdhqrSOzusiXG8RIcYt4FYDFr0gr116S253WlpITluYo0vrCA7dswhzAMd9DmYFTaGqti5MfSXteBGlji4rJ8mHlLM6nSYWLo7m47WRRBBZS9TWMwRaGkqbmagJ08i1MZfvu6RIG+m102KME2KufsKtvu9ooQSz5LEH7pf89bfkd77xLXnu0k2bnoIPfuijH7aJavm8Eiy1As+rKAzNJL5PRoAfsAtG4Oznm5wh4RiP/gADrswkJXrG7tcRNGcegS/6XW0Q6unjqzC7jHb2W+NIrLFtMz9ynQHpD4S4mKube9LidCKdVjqUPTDcw+fPyP/v178oG6fOSKPRtMVPQAHzJSBELMLJ23vWfqhjN4kzS8DxZszD8LN0OglGzqakWQeakmKU7N48tCk9dzSH6GVGM9jXttKMqv3shfvlu9/8U9ndhWmCheVc4TutQ/k/fu/r8r//03+uXFvFxly457Q89fjD8v73PCAfv2csn3nfebl8fUe+/fptubaXl+FCUwNsbDX+t/7BP5SPffQTUls9Bo0AYj8awF8gukNpeAQJg9dAM9gcJYBqINS6MmrIv/6lX5N//+/9XeDmbU0gCzgwEFKueuZe+ep3n086SbPoZEHtb1t2yCQynZccRYk973uuR7bnAmeZ+EDcpsUaUS7/SKeBWulfKFjijweCxPsXmtDNovYVg2fnCRVYUQoze85XYE/V/Tt3xLz5nPzDb3xHnr286eoq5puwWUEZm8jMPO4cHEjQb0MLjLAvXTyZwjGSY7Wqzl/m1ZN5W/h6GTGBFrQFR8nef98JacAp7nZHOnONpqs2QSBBq78Gpx7Hu3FnF8gRexuBQSH8OljbZSBTX/rcZ2R1/TiOXbSdVoiKeZbJS2zhwgxWLRvFOTiMEPeTMIIrDZbp4M20E2vEyCTOLTMmjR7Mi2aYIMa2k9hBxsm+GzPM0xBsNlAs2LFFz7/4omLgmhOGRWr1hvrTfsmTNjbwudcvy/NvXJH/5bf+QKu8CL+dAAL0iQdOyyffd1xuHY7kje22XDGQLNiY3/0XfyC//hf+ipjtfc1VIRH7hYFUi4gjjLvMJ4aSMDrELl/IKTGfWFmVv/rpz8p/+/u/I6sra9A4i1Lzx3Dgt+F/9MRW4In2Na2XRQuAuAjakcGtseb1BsTfbb5RUiAlroxWxb8DUB3RGgddsitciWnaAQcI2tlm1sk2dn4a3mcfIWa+NkEslNZsisu63tBlbz58/yNy9folaYJR/6UPPSl//59/S169ua3doy2sYOTRxx/X2WnzQJW4ck8cM9186y3x8F0OPmSzXzq6dZx3A0KrUAJM24JZ1KgrYV7fvCOPP/YgIFfrt92EpH/g/Gm5hVgA27twSubuQUeq8B+uABXsjtnkAH4C66thSpHgGUX+0i/9OXn4EYAllapeM/1Udhxn2LTL7tvMPDW2j6oPiLaIvWS6d/DFL37pKwlBevO5fIL755lGUw8jqWmUNYNM5KazhHF6cpSYTHPNIFX5OR2goT11TOhMiUiOFQD3Qe2evfdB+dj7PySf/uindEBEAEI5wsLFvTRj5kuuDa91ODdgwhdvHsKRviSDzr584NyCPHlmVQZYrNeABn3yg0/oVHYDk8kArg16t0DFe+LXFxFnqKgGUieXCAbzdqCilhcWZXNnD8fuy8nFBXkCcO4fff8HioZkoU5KfVZexbURucCWYGrJIwd6522PH88xgEV0bI9U/qR5Qu+K3UHjIFK9UVObnO9Xq1U3e8GhQeOh1kIz+MXrpNYgYuJp9ZqfdIz+4he+IBvHz8qnfv6LcjNYlcrxB2X11L0IeA0UKi0jOvzZz/2SmkVqtrFXbmADgprbBenNvkWcgLMHm/6l731PWnv7cuuoJwcDOwbKuLjJAST4GGYLaxDYCvL8uVOghb7UOEeaMOvQtrukU6uVbJUSTKCOjtHagu/V08bFI22DbxtMBKCDp+RXfvHTIPCSEr628affENg680jNKgKqNn+MM5m10zYYJZdIW28+du9nIrDxIMGZHnWqtqPkZ9b2zxJ2lFHxWZs/YbLMb0ywevKx98rq8nkQRkNubl2XV179UzkD2PSpkycQvi/JjcuvyfV3viVjbNDGvQ/Jv/brvyjH7nkQsNuSvPLaG/LjZ56THz7zrLz4ykXZ2tuR0AlTba8C1Tz0RvCJfbn19p58481t2ajn5WP3ruP4y3Lr8vel/tgHxGcZ4hABNFZUrW7gJ5iDXdZ8BGqE6dRw3rBpbbZlBIH9yoc/LL/7g+/KUsXImzgv5w4nnabdvekIKDiQWnDDmV6FQOFAVgbkXCuXiDn0Q6N5QLRohpE1g0IzZYxC8zLXRp1i9S0C7fFDRrDxB+u0Ep9nY64K4FwSPmuTqyrBcyD+U3LfA4/JfRcekqVWX+HpGrTfwsnzsgyb+uQDTyB4CdOjfShXDsZy8/CWLECic44Zu8VxKDl9DcKgu7DRd/YPpHMHwMT+vmpBO7XGap2RH8odaKL1k+v4va9McBqoWhVR4609BERvwSk+tojvDDTvaAVxhFvQDh2c/8qdHWjoEgRdW/0dRrw10Q9MfvLYqnweTBAg3qNNv3yLaJXBQLz3Fq6FU0aVBtlxAxAvq9NYjtoDg+Vi0yc2ed4Ny58YJDhlv0dm0hmOC/4j1w1vWvLf9RzuJ8sXP4ho8fqxC4jmGjl78qS8/+yqnJQ9qcCOJG2dO7khT154QJ597gfy6o/+SK4+w/GkZbZ+knJzVR59+FF56l/+otz36H8E9ViXp7/3A3nlpVfku09/X55/6UXpc640CU8hwJxswwL4rVe35J9cvC1/cv1IfvvvPCpm8wbiFEvilZaZKyE+O9IZGxALTAXoal+KVaAOlQ4WtAXzyZfW1k158+0dWcJ1svd+3+Xoc4GJHLEajng9i27UT6CEDWypqDh8niZLB8zBVo9h5NqwO/MyrtpTaBQm0SICTY0GO89VkpGydJYJBBB7ZxOuEhAwnifP/kM5m15Ah7XeANFFBU3XZqc/dqHjxS5xoB87UYOQqiygGcCc4s++dW5v7eAeb1wBJNuXpWYTWqii2mYXRLq7tysFQMr+sK/1A303uE+7lsOmH8CcvLa5q4MTzx5fBqzZgonYgNAdaTUav3Ni45jchg9QQlj4FrSLtq4EE29u7ZLaVDNoHyx29IMW/eynPinrQPJ0vjSc4S4ClxHWgIl5titfRQt1cg6yZcUb74N7X0fUO5ciELOxgSzRe5LxB5L3XSsR7bU5duaOjeiFGQaY0Q5iZhzyxIF27zMZ69nXX5IvQPovL1elvTsGrg0MWBGmwMJ3sBcpST7WrMr7rp2VS5feltdv3pTN9r6021tyZfcKNq8qV/7ot0FUIs1jZ+SRc2fl/e//V+TC/Q/K3u6hfP+Hz2hN849feF7euXIZ7j2uFcjmN1+5Kq9dfAkxgOPwCRYsSuTbTtKKJDHBkF0rekbnB5QArRbg4B1cO5ClE/fKZZgE3cgHStXUhgcsrC/he+vHjokPSXr19m1pQ0ppp4vBMBkjZZGfgh3GDrVdzZV1ikwF5hirrgyr6MS23WHR4KnTp+RTn/qUNJYWlMDpG8ROsoWyfYmjiLEmVsGlE4Aqek/DLswQ5m4tLSohsLPJ5u4B0JpFNRmOIMHpB41xPaurK4An29iL07KwuCHbEBRXb10CQ9ywOVDM5mTRTDjUXKo94Pl21gZLQYHa4HjDowOsV11u73UUPj22Akf56DYwfggWaMpbt7ehaUo67umFt65KEwHTIzDOrTvbme4iopAoGeeDT71XPvrR98PvKDmQwAPxV1wfpaLGEDid1Ax6ev+j/kCXJOyNNAWD65qYRhPEb0wSeTUyD7nJOLDcFhcxniR8M2UazWoDz5uCZhOpZ6/hR8++IAv1pnzivT8DPBlXBOcKolJzyvVznJXlV2GuBNro9iEwxioW+/mXwRAgxE5uLP1i27YAxGe8zY4MD67KjRd8+f4/PJKjKJCFE6fkqScekr/4F39Zo8o7WOwfwJx64aWL8s0/fV0efOBeoEZFEecIcuCGR6SCjMgB43SCGX+j5FxekjOPvUf+pfsel8997OPy4msvynd++DQkJe1ZSH+YAblyXR6Cpnrw0Ufk4iuvyG0wxDI0ztLSkjQXKFlrYO6i3L50SW698SZiGnDGAf2FbAzMBDkyTmjTGphWztx9ZmfWFxdT0zIWVs7RFtUorpuIMLJNDQRHEeciklSH/buFiHGJ+05oUhsKwOTLWUebxTx8z8P9+cwLYi2xZ6f0rMKnWFw9Lq2dW3Kwc0MOd65r3GTca4k3HusEUIIZjBFouaU31MYAbBFpEBPYwfXv73XBVFU5U2ZEugL/gT2ThlpK2u0bOepuyz4QKA32ubiIlsPiWk/AJPrCL/+C03CeFhSN6RuAaUsIwuXhENOjGmi8wvpqZIoA+3bU7tiGYUD6gl+FsyyZhzeV6ZOBr+9iDoWZ2txJEyjGy9MYgqtDiOY7yt40w+FzV65c03nFxzlNPkdPsaOBIYbGPYZmGeKHBBUGv8D91QKkMG70DLDnFTpe+Gi7B7itPZKDkaeZlj7U+UrZyLmFvCwB2dm5/Jb84e//gfzzf/Z/yquw6wuIIv/iz39c3vvBj8hy1VOi8UA8Eg/cQ4yAUbUI9n8IO5WpyqEm0Hk6Zjbs2wEVJ0+elXOIVN+6s6nIhxdwU/I6pGPt2JqcBSpy7tw5uffee/H6rBw7viHLkLgNEHWBZuruliyyfw8TycCAZbjHK/lITldzcs9CSU4C+eJMZ3aHa0DzFLFGsVaPB6hLHLXW12yhXgZJ0zQq2VFSgBg5ILzI1inlojqnDDgtgjF9V3PCGmCauLVaWbUVO1bT/mYqik7LQXCQDL64chzmV0Vau7clB2lsekdyhxV5UF1D1+tVAYDQ+ZSxoAWDk/D39rua7sDI8MFhD6hST1MxDg+P7BCbvDPpxAZtLUr08/LIw/erALEt/APpA0YlTEpckdKeRUdsNW+iuAOK0aq3QrmojE4mCb7wq1/8ymSu0FT0MuPBZok0Ie6p/KGs1M9uiP1s5IJtMSOEk1oi870YhuP3r4GQtnd3ZBGit0rMt9/CJuAz7HlD1c+f7FpHW5+1rsCpF9YW5NhqVc6dWJILxxc0BTjCAt3ebcsmoLcjOOBDbBpEqtQhpc4tFeWJMytyponATv9Qnvnu9+U3/9FvSQNw5oOPMMCm85Bg4+bYeEdMF1AqxzZxlheIn3XH4TBUR5Y15YTmSGScKvnIQw9rwOn69Ws2xaI70OMtLC/A7q0qMMB1jgfeEd4rwal8sBzKiXogi4t1ObOxLmfPnJETp07J+sYJaa6sS6WxDGewiQj5UG7DjmYqMk0B+gfRhNa2JmsV5ojn5TWzk8TMa+3R/NL8IDBIZOc5D1g2yRwqVnnhupeaZWlUi5DcLdvMF7Y/+wnxXuiIs8HWWOu+YQICNl5YPgmtnZebN9+Rt0DQ/THh1yhDQ15sZ4udZ2HjD5TYZIBtnKdcqanEPgICxSMH2hAhSLIV+KVHHrggv/SZT8BntIMXtayTzQFcBSKrEZlOMQS8WoKQGGsHPVHG63bauM+ereGmj/arYAS9QJdGK3EUMxHLs45tauuHiUTPtoRP/Q4rhRLJH01+NopHDnFBzGxqRfZ8t4FEvHrjptwAtr8PiHIh6gGCHLsUhbHi/V6BmgFSEcSFXRcfPwvNutSgbldWa3L+WEPONcqyDIKJIKEZsNmHyXKYr0s/X1NVbPpHCATtSz4ayMZCFfZuTx5772OSqy1YQUFfiG0SCQHDyRtjs4aE8MAIsTxRDeVbHJ/ZrDVIq/P33CcX7r1fpdjh4aH2DuXmcuqNTo5XBCNEFLYnwzYIJ8zJuLgo/aUzUrvnMVm671E47UCtFoC2NNYlrK9KhN8LqyekuLiGjW4C1RnI7et3ZAvY+52b8EEQIIznJS8trMA/WVc/4ghOcQmoCYmYwANhT0p4LWVlwh3hVXyHkCU1kbY2wn0D8HWZm7YVKIvrdZA5TamCze2nNiGkHCByvwOo6/r1t+0ea5+oOM6U3VvXQMFB6zR3KP33sd9MprOp0gW9NjINYVJOv1kGmvQv/9qX5SS0KLUAqa0Df4RgQZV5SWp2W3g31L601lfioBWuu05HHdmeU2SS3Dwij6/03QgzljTTf09QqCln2KmaiePEPkIc4s8665PHiTT1gKH3i7fuyEUc7CKCKr/yYEvOAfv32AMHqhm7q/a8KSyIYQQxxM9hR1V0vneAjYL6B/y2Cpz90e5IHXwiMzsINF07HMqVTijbcKByUOeLMI/YiOp/+fpz8sQHX5Sf/YXTHPqF6DI2B46ggGG8IRxBlimyVSQuk/a8h+/lipQytgV75PJ+GiD4pWPLcv8Tj0AJDWR7a1PNAfaY5SQiSmHmJ61zE2mXQ52vwFllRFRb0agfsAAIGOYdGI8pxDokD2ZGE2YRO861YUKoVOSEnMMdufb2DbnuXZcHHn9MTp6qaSMt7kNJmc9i9USS/JxjAmZ/+hYW0Qo+gh40g3D+NrQpzaII515fWYTNDruav+PfLrTqkCnTzYZ20T6kVMZePPbUxxSKfe4HfwQU58Bm2XqTeWl8RM7kzLn2o0NWqPk5ZQD6YHYijqUPfjYP5nj/U0/JGaCGOohRW9OPNGWe98FUa6JkEXzEDvPJwAg99kSir+PuqwYhOeIYLvGcafSFX/2KmcozSpPqZMJcmWSW+BPz4dDYJjVRNo4QZUwll3UZ/z7FeNmF0rRh58DH84v3IW1e225JAept1cNmQYJ7zIbznMnEIXPsrYnFZDWSSqQgp2YIG03VVptS31gGIlWX42sNOb9Uk3OVnCyw0/NhR966sye3DlqAQIFewNF48okHxXBuADetD+Y6xMZiAYdQ3SNOf6Q/oo5oHKPydIRsAQRdBppUbVT0yQ2o1UrSgKnW5MANaIt6hQP08AQTNBbqiJ0syEID2gzHq7DtScEWkDB4Vsb3KMVotxOD5zmZl8+SRRKl9nLluRlBxbU+/J7H5eHHHtGoLpmFwbparaZ+jSY+Og09GtnmBgU3S7oCQcK0ijrOx+HnNjqdU+bRPKaczW2ipOXEHcKufQ5ZD+xrOtTUECtwpMtVxIGuXwaT9EXETAEkFtmKBeGob2MDnJipfkiQc4l9nu4d7cZSpSG//qu/rFVrNsXc1zhHA4yovVRdLpGmVzNwaF0lW4zDST+cw6AaRjPX1PxTHyErrf2ss+wIdF4u0SQzzNcaMSMo12ccaDMVj4imfIvpRwzdxguoVQ+edXzf3O/L1V0Q4gDIgz9UV8FigIHa6ck9aOKZdXo94MoeEBofkhQUCRMK6EIddnCzICeWm3J+pSkb7IEDy2sbAaU3rt2We2oI2pzZEBiXYo7gH3AoHlRxd2dX2xESk/Z1eIWvKSB+zrOJZyV2l85pigBTuYlxMzUj8G0KhY60peWgLc89xbzJLIx2cp6YcQKAaQKEBdUIYISUcCxMG6JYhBELSpQ5m07gGhfcd/95OXn2FHyAsjKF2smjsbPnLbHwGJrsx/5CbJPCMa/UALg337MStEMTEOekH5ELbFdDYMJKYHHzYqJyJQqZUl52YLqSgH03BLGxsCynz15AUGsHZuGuS+yTBEBhnyPtT+qq1+x9lGw5JSfp5Gzsg8zKzz/4np+Vhx64T1Zg5i4B8qX5xlQXmniMmWSHuyTnIoQNodZnUZAOCBFNFSEdafPmz0MjOIMqIbIsE0iGCCekdEKlKYEnxB1riWgSOo1M2hBYZApSzRTzZ0se7cvJNOQ45uA7jt6ldtiDuQFHaxEOXxUMkSmPsGWE2pYyp7a7hw01IAoDs8ArVthmGQGzsj4LIFhi0MS2z64uyBoDYlC1P3zpTTleDYDawC+CFuIA7SMwATegDEdSxrbdiCK7IHJWYJGw8wVL/Lm8Z3+y3SJDEcyW5DBBEmHOSjwGe+pgQDKMDmoUoyELA5OwUK24Qn1rKirh08Hu9W3mJ3Er5i7hzR42e/X4mmwgBsJja4NjEc2Izatm8RPCIqHWwCjUEHGmqpobXCPnwJPQa4Cx2XSL98CgH80WbUwMh7QDYcGOEZTGNNsYra3Xq0rQbDJN6dtcWpZT5x5ErGJNjlqHIMiO7nUB1zSA8x0O+6ptRQm0pKgWtUulUsk4/DBpFtbkvR/4qEbajy1UdfQsa6d1pFW1qggY6aN9dKT5Rh0EORUyZS3J/q5UoYXJ9BQkthO8bwOav/KrMI2mxK+SqZeK4nkaIfOLZD6aBt2iLKFHSQqGnQgpiWkUO9EyVyMYSThsznXEbypX48WdXiSvbjMVAOZSALjRJ/IRWqjVtxsodGSJLtHRYzyg6Ewo+A/0MSA2EPgpIThWBq5fkROIfp6Byi2BkW4jqMNW8j42hIO0C5D2zJpkjn6Qd02J9T5CbVOicw84lILFJmSOYqCawBtbE8t30VY6b4RjSdjsAFFgtQnzcjhaFaYIYeJ8XHJJZ31oP8vjUyOQgUjwEYvhCQvCxGquLmPTK0q8XA8SQuC7Tn863DsPou24ZsdGTbgKnGNNXmO3at/mOmlDSGMjsRYlymviGwOeNH8oZRkEs4MPh/odNtPKa4ZnH/5LTc0oZgrQzFo9dkqe+NmPyonT50GoDdmHrzSCr2VCl9LDpMFS1TrIvh1myTRpagouwMNPfhiI2RreCzRq3IQvRjOS99CGpub3uYZkSvZhpd9FGqO2oHNPTcccL2pHX7sNjtRHCj7/q9QIU9J2ltzmP7xUYotkzKNY6mdViiJDknwuhVBT5Cj7t9RUSqFV7y5XktVYlBRXW0N5YwvBEkjGlYDdkLFBrI/loSCphQEyOkpYJDKAl69YtIlP9twkQ0C60GQqQlquAFK979Qq1PFJ2PN5nRhZgBag8xVqnYJRTeDnlTrFp+1OwgShkRG8nI120nZV5ojjEZ7tiUqmMERImIJhWHKOdSGzMOGsbCPYdhbiWE2SSMdEGftkJJXmmLEZn2TwAIxAZ5oENBwZRYhYosgxVIQMGSUeaOygoH9jOsLIjYpiUI/OI53uItaGaI6aePBViAyRAbTlv7Pt+72BEjnNPTsu19V5+25UFe6hjHsosyM2u4NQC+P9RmNJ7n30SXnoPe+T06cvaL5Pq3VgOxPyM2KzaIdjG39gIVUTKNnj7/+YIoQDjqfqMv9oX5bBCD4sgVqdrSLz1uGnUIGQY5F/3FOKQUj6W9yTFpA7akXCwNQ8wec//4WvOC6YdGKmI77TxJegPbEpMxmDmGWoWWkfZbSGzIVP3e+RmasxkniHu37+1DXAYnaw8W/AXLq605EanLj6eE9z4T3VCjmbccmaVTrWORuHMIxUUyUTfWLBThFRa5hGKjG4yCvA7RcWpQINUXCw38jYOXOKzjHzAwzCwI9HzFqDSNY/CSp2sDWJn0yicDEZgLTNYnkQmOiAcbwPh5HMoqELY6uSqSRCMEfo0gNUM/GO6Q+MGJcYsys/oOO6qnoGxqgp6XSSMIkItWDr2wkzYguIQBR9IlBg7CprBNxQk6FWcOXUHufqUprS1BDfNmfj5zjngFN1yIT0S5jxSzOZZhWdUVugE6jQILxMP4WBUDI+mYuJhgHWkDlAizCXHvvZD8n5C4/Bn1iRfqejGbNc0DCyJh/N2vsfe58srW5oVJjoFJMLe5B8TNVgw4ECgqMjCB/6Y2RYzkfTQJrLLeK1VSncimkBEc/D67OM4GzuPwsjuA+5z2WGC05Br/bvKboU+w9xLpKJJpGk2XiEmXPaWWaLz+/HjYjd+/vwqF/d7SOyO0QUOZJaYDsoe+rsuYi2Bmp8az7RKKeTTWLlT4p6mlH0JRhLQADLhzTzqoxRwGRicQHn+9LmDWy7RgbpKLmDonXWyZwaEPJcKaU68Z5aaoyykhGYDmxvG5vWPVJ7mM4ce/mzIi9i+xQGuUJLnHltmRSpmUWkiJVcHgiK03H2j46U+cq4Rh1mqBg9I8N1DbjpbAF2+qMkLxTsbAYdqG6hEmoPTd8gksSmW+BWSueSXo9NCtQqODI8Lpo2OoNyjD4PukP1j8g8A52pXFRhQA1k67EjddAZTyGTMHPWOFOx1mjAZLpHzlx4UDaOn5H1tXW5eeOKbiaj1vc+/B7doyGIukDfgWOrCoHmFN2A2doeeLIAU6yBv1HgMXpMZiQTmjC2Ojx15BlPINpUqtSUToJf+YJlhCxxTUtzb4oIs0TvSbbiLHVys4QaxwJiYteWjxkmmEzMizLOtNimsmY+M0wzgj9zH/ZnqP6DkbcOsDHQLss+JJbRSR3qQ9juzePUPBPbec645ls0lyBmlCFMoaKNA9TRhm/h1xrqhLLtvVek3d3VTQ1Y/M+qsZgJxM2y5no51ML2NrLd+EZwOFlgwi5vQy35NDqomxmZ4vB8OtBEVlSTgNm07pbmEke1NhZk4LnxtPRxCLny/nVS6MimHGvCmp3pHEMjnHpDCJQwLaUkv28HHIbq7CqESbAhjFxHPjtmi9g9zTJm0waadjFUhIxrSAYoOj+DgImNYiOyzS4UvZ6euQa/wrgEzZI7B9eB18Fs0gUwdXN1BY58U69/49R5aSyt2FbwzlTc39vV2IamX+CN7f2OXIapxAGMHkylBddMjP7QIaDwJgUXmPAAQAeZIa4D4f0EnwMj3I0Jktd+huDnEqRd1NS5nYw5mDgNI06rmJOZykfcRpLHUklt7gKnzmHcVCMY17kh00jYfa4HYfomzKXru10Zd7rSBJEVfGuja14EiYr2vgWdbRVZ7KXTZNIUi4ItKnYmGO3ViKkNx09Jfn0DGgKScdwHwSIoVIBfACYJ6JjphvkamXUjgpKuE3Rw++1Dae0dAqo8hKnhu1nHIwexhm4qzjghfLZ25/glDw7yiBKusaiIGPPuKa0jZ74QgdGCQeeg8W/sDM6aZUpWLXzxc8o49BOIKPEniY8jd4OcZ6FNzrcwVlgU8laLcJQTexmxaGc4NohYHylq5SVBOV/arSNbCORZKLUOUyjSJY3U1GNkm44+5yfwEumw2zFmYyBPTVlaWZd7H3ocRLyg0CcbD4fQklynnGYB27gACZv5RWTsWztHcmP7QDNYq8WcBtuomRhXaCPmQ1+C98PvFIgeitMI78YIJAr/Lm5qGvCKk7qyEj3mhPQ9aw6Fc7RAxjk2YcbpvjsjZLvAiZcl+Nn7yHbW5hH3B9AOh6G8Bf+BATEyRJEDMWh6qN0+tsG5xLyTVNm5nqYKyWp/HHeNlPKluvoVBaAhQR3YOG1lSl9svk9837PoFTecHRco1UOYPP32vrTubMnB7p46yXmd9BmpHc0h4uOBNYvUtFAtEWpvUDMeKFrWaaxLdxTZ+WQs3qdJJoQMy+obUBuTqFknTeKn5OdwD9V6ka3WUphWbOEPo7JBEE8rZUZnT4trKH35ntZQ5O0xSFx0Su0+2slBcQyBg0eYocpcHjrbvmebghE6jkah1p1zZh9nwGmTLh3mYgeqkCF7nSOtvGN8wpbE5nUAO30U1hEQARpjDXnfB4BGiSzFAbo+jr/X9dQHOLZYVZCg3mhqQwb6IHWYYcyz4vVp6oaaRlNMMNHRTmYd38mob5QSbQKTygxjZP2BKEyzUFPzKJzImLSHNBPn8yauyTnGsaOeaIRJHyLLBGmOvg0KdcKcXO6M5E1Aru02UBSYHWUDpyrs22t35aHUFDr/jYiP2C7T2UR1bbHFtItxT2FQ1WS0g4Fjh8S4o776GowvsFeqlpyyAqvXlt7ulrRubcrO9q7WFBeBPFGb8KdxsQauC509M7Qt70tgkOGgo5DsYGEDgcEF267Fjb4iGlKrVBUq5TAMBtG0JkAHmueSwSmhYwKdTik2lUOlN4gup4hQD+gKHGyiYH6Q+AjKACNb/E/ziD/peNOxJYNwKhAPzBgJzTcSdQOCgcuieUEUrnnLTMy14iN0XclZTkpziwgVtWe5VJC4WbGWbMLvYVp4DMuzkS81N9NWlLHZWBhrTn+D3fC2WwOdo0btWfBsZLmCY9BcswNGjK3x/tznP/+VaVMjfgQyaybNM48sXpqNHFviyDrANriWagNKXm0EqY6cSWeQRWbGWdbmVBJPssm8zhB/3BZx+lrnPf1k3pun9vCIMQL4Tm/Aob552FdkphzCrAiHjshDJXDr3UY2qMVzsOWjEutQI5dsD+EpQ4dJ2oDPViVkpH4b3x2oFB+BAfpQ8Z3dbTkAA+xu7WkGqR2EbcBDtqW5Smmun3ZyiPQ4ESQgTS8OyRjBXxkuHNcCnTyxd/2CPbc2CRNbGab3yPpczU7Na2Icf5a1dDHSgBY/yAo5JWoSr2d7FlFocPZBwaU8aPxDpw0ZbbESp36TaUpaCC9yAOYJna+i00t1M0MNxtmiIdGAndaIiNUwNL8qYF4SpeZXsdMdg4iMTg8sc5B2yohhFMjoiMAvAMHrwAfYgzag6UU4mP5JTHOEc8l9B/2x9LB9pzcWtKcTQYLIjaJiHIGCABphfhwhzjmaJqJpzaAawWRTbCXhVn3toM/IMYF1lB1DuPhBNh170kxyKMwUM04TeTp5x9nec0y96c+nTbDSqi4G3lqhL1c7kVwGUzCvfcED8Wh3UMsEMbLjwtoq4f3IFhYrU6h6FscY1CC28zIx7GG3JSPg111lAusTtI/6WrhCSVnQDhR2YiS1SqBEOFTJZdRRHur7ZJKBB0m/dq/kYUeTQLnORElo31NqMuXjYP/Q2vT0U2jrj0eui148rzlUtKqxsKD1CHR2Y2hUpX0u5zI3A4Uy9R7AUMTmmXNko9FWeqswY24/YUqN3Ob1urRWA8coOec6UuYpKkFy7QlhaldrCBEW4nP0LM+v0G/gq+mi46LUf7OdUbgHI7aDwXGZcMgUlfvOnpb2IaL9iC2QaXlcmoHUglrvANORDddOrjTU/CTzUTP4bq52bjKlwe7x3fHSmAjjV1GS0JQ9gKuATn6PA2ZWU0hq4phZAheJTx85p2nyM3OZMXvuic/FZpPMMg21gRd3gwtmuvAd4bzPgY6uglAeXAjl/lVIuCrMnxI3A1Cq2JJN5Qed0Wf7aBqG+IcuuYwYPwuH1CSgpCsA0WhJ6+AI2PVI+zBVGwWp0WzCd8cjEp8ttB+xp3/k6yBvEhedQJti4WmqtLe0Kn2ctwDCt3Z6XlMhKkHVrZmNNpMgaVaRkdnLZ3ltUTF2rVfwROFUX5GTkUrRQt4W9BMYYHcOnTrK4Dyule3TWeLZ79kGy+xNyvgB08z1fl1nvVCDc74Lvo10/RmvIBRLhhn1BnofNJ008MiQCf5Wq+Z0jrJqBXyurTEOC89qxBlapItYCIOFZLqRJg56cvzESTCjr8mEu2D+zuG+DDr4vDrmI208HBNW8a078sR969LZ21fTK3KMkpsJUlnSSTpV3FULKK2mHeqyDm6sDZyzINlUi7hAY+bhPmuZKEowqPmm2N0e01wcm1mTWsD6Cb5KhZgJssxg79G+d4ivP3PoyQ0s/ofXh9KQjvPIefi8tc11vJQbEMLAHLUCiYHYfmjbvbMEMhcUpbF6QmogYja44gbTiaODSulLKRwUiurUVoMaJBokLCcBBSWNPagZjY3rdgZSby6ok2pN7sAOTafpA4eWiNDB7i4+Y/uF8l5t6/Wc+g2+9YyhNTyp5qtK2Aw88fh0kvN5yxzMVmUsQmMzPmenLWnxT492eeSpuUWipdTWAeYM1rl1oBnHnCcGsNQ5B1FzQmbS1ZCZrwy2DY11yGmuacxDtKOKMhShXd/mBNFZ9/rWUNZy0gAaZezZ+Ad2odclXLqsa7yHCDXPxz5GdKbri0uqVbY2t1TbsH794eM1WRjbBD/6Q3NrlnVItZjE5p6lt5gZplAdE0o23SLubaTMEMbO8mSmqUkYILLmhzETTJBl1Gxc4m6awbuLnzBD7O/GCL4NEycahBg1NPO3tkU+6o1l0euqtGfeku2s7Oop4FMQDVJoldCrKdoxWIOBQp/imJyaIApsdzrGIzR2wIAc/wH/LjM71h+pOTGqs0cPW5gjHoDNJgP1BrDti9Y2VwkLid8ajTWNm0U/DBKFMVLHaZaAEUmUqk0Y5HLzjjVmoNrApjHo+ThnWogmg4CYusDqMyYA+lbDsNtlv2O0mTKPx0j10dGeM31yejza6RFb1jTqLlhpZ+qRFrjOjAXQpKrA3ifOr39nsRPjIqOxmjbdblsd6Xa7l04TpZnHbhTQKDmNOruu3CNO2RkpFLoCP0NTwnGO27euQ9DkpNfuSn2hof146Ytc3TqQg1YHvmFe7lmva+rLjEaISzNTTGSKSYxFTRQZiQnVuIQwSTvWeSabTxRNOMqzMxKiDEGnqOk8gs8S9/TrLNqV/s1PnONsG0T7ey5jGgWO6AOL9/v+lP8h0sJlfnPbyM8Abj1VtakO2kpQGT3UKK9xEyAZTvVBHKywEnfv2oSXqc5cMhbdK/F72q2LTEnsnj1Ye8De82yxzuJzbLyXq4JoyjKA6UAi8OsnlBHYR4j2OeshlpebSmDs9ckcI3azo01Th0TWgnaYWs2lBZW8tNtpP2vkHPdGv8TzCjoVswp0RyPEw8hGqxmTYAwBT2oC/Ty0T6c7wPVVNJbADFGaPZ5Lx6CPUNIYhGt0TH+jbFM62M5Se6TmC2puMcClE2uMy0UjY/dtXIDNe3kNmtAHCd8fjnUfRqEr+4UmZM1HCcRvaqHC/Ex5Z9oHBe/ygr2XK9euya3bN2wAsGBNxVEvL09fvCL9+0/IsUZh1keI89+NN2lmWHPFE9fqTiYZyEaOJzRExuHVhZwq05zrHE8R+zwGuNvrCbMneVqnUFMbHBNkJb++jp9a1udpZ715kGvMpX0w/fd3I7mvHcmFAgin6AJyDIqB4Bhh1TaR/Efm0kEUtgiE/9Fh1UGthPQiG+hiSvCYnbwCZzj6BW0CMBjty7jYknJzEZqmKGWYLCFNlWpDNU5eC1VCWUMEllHwvHOAcy71Oq9TROkP+Joh2sP1cTqMTrUJfb3v0dgOIbfhEaMR9p7m7Oe0uJ0MyvvSHKKhnUennS0qRbX/d3d2pbG4oK0r+4rLO2fZtyNi6VyX2S6Fe8BqPATeqKECB7tWahWV7Do9ZzDS9SCxDgBUMFBGqgu1e3hOA4sDbRxQ1pb2gxGbgPV0HkMRqBk7bXAP63SgSasM9EHYnDt9Rucv375zS9qIKtOJD/O2UcG3fnQka8sLd5uPYKZyhtzT8UGMomeT4xKnNmYCMZkms5N5RJGZDKiljW3tIxkQ7v3koYbTKJDv7P/U1p9tTa9aQRkgl2gG/Vvgu5lms5CrdTU8Zzbm5I1BTm5D7Z4wLVk2QDsGXa3AMoAwaHtT0zAwFoUwezw7B8Fi5ZY5PYeAqBKLLKTLifPaSpLagxHavK+YPmwRnQo0hBTtl+vS1f48lnHVv9D+qaLOOjtwkPhIRMVmQ7SgHnEA1lRo6Ca0iW6ENUnEjAnkizbbs77Q1NRpojWaFmEixcuYrUpfgVBji13m3MQfRpKZrEcrUFsr+p7WIajJmbOd/Igo8jPcijaCl5odiqtiqogW7EfjZK/CsSv2wQEJGZMhhq4kNdS0ikC1D2MlvBmiTwzGBa62gktQMIFO6CTcTYS0UGtKDVq5CWZllxA2BDhEIO6IFYaMjAN73tlvz3bDVsIxCXm799IagqzJJDHRO98gKbAxca9TmxYQw6NJr6OJdi4pE00T/LS2mgeFZs2Xaca4K7Mo0duuCNNaImtexQPWLeFOjWvCswXJfSQrunkB0Am/EGrUl48A911kIpkPcyUH88EfaGcKGdtSRJ1FwPuLrFGpEtIRXeDl1QdjjYO2cjS2Ii2CVOwFDXVAO21bjMLrGGkcwAaTOEEmIFzq2Sh0D461HyAuUq0robGGd6zZpsDhF5u6V4QmmZ4wGvZ0fxmRNr5NrdBMUWgRSnpKUkZ6OfUm9itYTceAHX0G3kMc+CJEzs5yNH96MAcZrWbHPGooOvsVSGieh84rmwRoVDzn6RQdRtFZsz2Aiagt8jX9e6hrxpYzOa+nhM/cL2agkjGYTq2akJ3I2cSB9eJOqNZg7rERGJl/bf2YBSl61vc4BMpEFsr5Jt3cGHA0M06w/d33pt92UVWRCew/6xvEWaZhGGUYIg6qRWlS3V2g1Oy5skwwN2LsiDbLOBNMoFogb3P4E20QzCJKDhVKGS8e4Tf1cJ8j6jF0DBT7R5GLN2y5e2OtQB6EWUJQrQH4o4nNrPtDqRUDG6zjqnu2qbCmKfhe0oFBc2r4Ca+gUr/bdnOfDRPcRjoWiQxDgmC6dHEcKQGyKKVn+uqb0P4fK0oSqCPcOhzZIhZmhw4DRZvY9oTFNcbYAhnWLdPZVvu8b0c2Ba7wZRfIDLUEYxdDtoHUBMBI0RnVJNAoWndcyDunfaxFPLzOWi2nDMbvsAdpPFqXgnNsAoWDA0XRqgpGaANoj0zEbNWKDLSNj6egw2BYVAedEWhG7MNx4PxCnrekmi02jU25YBkdPlEAn4rm4wobIvBasgQ277VoSoDzYH1/lkkY8nLtHsX1LspK/ZTwUyawQbVxgiopM3mSENvdnOT42qalt17FPLvekyl/IJf6BHMg0+Tpx1010lnJ2csxWXPJJeX5WU3pxS3dU68pog1MLB5qe980bDId7r0wCJU5sM1S9YZSDxCwgoyqaNQo0s9FrmfnqBDpnAO2+rW1A572/+Fldjqw/0FUS0tNLZ2saPJfCPu9mWDuZFA6lgPNYI20LQqd6BK0AyWwTR0xmtej8wtC266HkpTTTNlXlP4CnWWWd9Kk4jlyedt5gjtZVieY9juuWVuzm0RYaEF/3hoh/B5HSdkeRGJLPb2KvjcAczGOwRRtQsmE2Ni+JdIAng9mD5UR6GiPdJZaXumTfYsC7c9kO2PoZJxiTq9B58sxw5XvkV40LQRwL+e1QaPOoEYThOjFVWVRihBJRlLqZzMxg2hSG0wn1k2+NommmUf008yQRXEm8P45jDD9mQQtyiBHdzOHrJSPyfruZtrEOky9b0z8XhZYMAnzaBEkh53o+CyYO35RDpRaRImVkq0MGLUByd30oT1gVtVgeg16+E5xrJVjg7CvmPqg105KKIfdI0VxVo+fkg7scebteBqUK+igwCrgzFCzTak9rOmiuVkQZG1IeK1hKNmW7yU6sXSqOeEG5hTLPlWjOFueRMiGyLkSyzvLcjA+1P1nHIJmJPuQshlxpBNpxolQGPRtky2uf7cF2xxQsQbVKCCZcYtPsaaABM54iA9CDuhEs6eSas9IKuW8lfS47kY5p8KafhELoygw6KcR9GBi4mBgj6mduHEcNjDTgJ3YOhE6+BxImYtNmmlIMg5qiXFTVKYcWJdhIFnfIJpgApv/nn1Opl1PokXziCx7XfMI3F5nOnM4azL9tD6BqmU/NaviUUox8cd4GB/BDLHL3Mc8Jz+VN0ZnN/DdyY4hlu9sJlOAsF0Z0e2y3KSZAyKokvhCtpPvaUv3GpxAnuOQUGvBfcvZ6K39A+tka1vhwDm+sJGreU1AUyibuVQu2Y6mD39S8nOftHKLWZ29gR6BvgejurwVhT45dISQp2dnDBCGrYCgqeV95/sUWcfMKDVNrrFYp9ftN+uF6cnW2EEkFyTJlrpvZBYgPQQz2MHOypOxXj+7g3Q5ZRN322f8gXlHQUUBBzKFCj23rxpzoNPtHF6ep1ouWIYzQyuMOClVLAT+fwF89kkBJt/7kwAAAABJRU5ErkJggg=="></img>
                        </Col>
                    </Row>
                </Col >
            </CustomTabs >
        </>
    )
}
export default DebtInformation;