import React, { useEffect, useState } from 'react';
import { List, Avatar, Layout, Menu, Row, Col, Drawer, Badge, Button, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { BellOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';
const { Header, Footer, Sider, Content } = Layout;
const Outline = styled.div`
    .ant-menu-light .ant-menu-item-selected, :where(.css-dev-only-do-not-override-1fviqcj)
    .ant-menu-light>.ant-menu .ant-menu-item-selected{
        background-color:#5574A9;
        color:white;
    }
`;
const MainOutlet = () => {
    const [count, setCount] = useState(0);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [menu_sider, setMenuSider] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [selecte_keys, setSelectedKeys] = useState(window.location.pathname);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const titles = {
        "/Debt_Information": '債務資訊',
        '/Charts': '數據化圖表',
        '/Friends': '查看好友',
    }
    const item = [
        {
            key: '/Debt_Information',
            label: '債務資訊',
        }, {
            key: '/Charts',
            label: '數據化圖表',
        }, {
            key: '/Friends',
            label: '查看好友',
        }]
    useEffect(() => {
        const debouncedHandleResize = function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };
        window.addEventListener("resize", debouncedHandleResize);

        return _ => {
            window.removeEventListener("resize", debouncedHandleResize);
        };
    }, [])
    const onSelect = (e) => {
        navigate(e.key)
        document.title = titles[e.key]
        setSelectedKeys([e.key])
        setCollapsed(false);
    }
    useEffect(() => {
        setSelectedKeys([window.location.pathname])
        document.title = titles[window.location.pathname]
    }, [window.location.pathname])
    const [data, setData] = useState([]);
    const handleLogout = () => {
        axios
            .get('/backend/logout.php')
            .then((response) => {
                if (response.data.status == 'success') {
                    navigate('/')
                }
            })
    }
    useEffect(() => {
        getNotice();
    }, [])
    const getNotice = () => {
        axios
            .get('/backend/3days_ago.php')
            .then((response) => {
                let user_id = response.data.user_id;
                let data_tmp = [];
                response.data.data && response.data.data.map((item) => {
                    let data_json = {};
                    if (item.debt_user_id_1 == user_id.toString()) {
                        data_json['title'] = item.back_name;
                        data_json['content'] = `你還有${item.money}元沒還給${item.back_name}~~`;
                    } else {
                        data_json['title'] = item.debt_name;
                        data_json['content'] = `${item.debt_name}已還你${item.money}元~~`;
                    }
                    data_tmp.push(data_json);
                })
                setData(data_tmp);
                setCount(response.data.total);
            })
    }
    return (
        <>
            <Outline>
                <Layout className="layout" >
                    <Header style={{ backgroundColor: '#A6B3D2', position: 'relative' }}>
                        {dimensions['width'] > 500 ? <>
                            <Row justify={'center'} >
                                <Col >
                                    <Menu
                                        theme="light"
                                        mode="horizontal"
                                        defaultSelectedKeys={['/cramSchool']}
                                        selectedKeys={selecte_keys}
                                        onSelect={onSelect}
                                        right
                                        disabledOverflow
                                        items={item}
                                        style={{ backgroundColor: '#A6B3D2', fontSize: '1.2rem' }}
                                    />
                                </Col>
                                <Col style={{ position: 'absolute', right: '20px', top: '5px' }}>
                                    <Row gutter={[8, 8]} align={'top'}>
                                        <Col>
                                            <Button className='btn' onClick={e => handleLogout()}
                                                style={{ backgroundColor: '#F0E2FF' }}>登出</Button>
                                        </Col>
                                        <Col>
                                            <Badge count={count} size='small'>
                                                <BellOutlined style={{ fontSize: '30px', cursor: 'pointer' }} onClick={e => setOpen(true)} />
                                            </Badge>
                                        </Col>
                                    </Row>
                                    <Drawer title="訊息通知" placement="right" onClose={e => setOpen(false)} open={open}>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={(item, index) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                                        title={<a href="https://ant.design">{item.title}</a>}
                                                        description={item.content}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </Drawer>
                                </Col>
                            </Row>
                        </> :
                            <>
                                <Row justify={'end'}>
                                    <Col >
                                        <MenuOutlined
                                            onClick={e => { setCollapsed(!collapsed) }}
                                            style={{
                                                marginBottom: 16,
                                                cursor: 'pointer'
                                            }} />
                                    </Col>
                                </Row>
                            </>}
                    </Header>
                    <Content
                        style={{
                            padding: '30px 50px',
                            fontSize: "18px",
                            // background: '#f5f5f5'
                            background: '#D7F5FF',
                            minHeight: '85vh'
                        }}
                    >
                        {/* {dimensions['width'] <= 1200 ?
                        <> */}
                        {collapsed && (
                            <>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={['/']}
                                    selectedKeys={selecte_keys}
                                    onClick={onSelect}
                                    items={item}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        width: '100%',
                                        textAlign: 'center',
                                        background: '#D7F5FF'
                                    }}
                                />
                                <Col span={24}>
                                    <Button block className='btn' onClick={e => handleLogout()}
                                        style={{ backgroundColor: '#F0E2FF' }}>登出</Button>
                                </Col>
                            </>
                        )}
                        <Col span={24}>
                            <Outlet />
                        </Col>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Create by NKNU
                    </Footer >
                </Layout >
            </Outline>
        </>
    )
}
export default MainOutlet;