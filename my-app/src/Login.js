import React, { useEffect, useState } from 'react';
import { Form, Tooltip, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
const Login = () => {
    useEffect(() => {
        document.title = '高師大記債系統';
        document.body.style.backgroundColor = '#D7F5FF';
    }, [])
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const getlogin = (values) => {
        axios
            .post('/backend/login.php', { email: values.email, password: values.password })
            .then((response) => {
                if (response.data.status == 'success') {
                    navigate('/Debt_Information')
                }
            })
    }
    return (
        <>
            <Col span={24} style={{ padding: '80px' }}>
                <Row gutter={[8, 40]} justify={'center'}>
                    <Col>
                        <div style={{ fontSize: '3rem', fontWeight: 500, textAlign: 'center' }}>高師大記債系統</div>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                            <Col md={{ span: 10 }} sm={{ span: 24 }}>
                                <Form
                                    // form={form}
                                    onFinish={(values) => {
                                        // console.log(values)
                                        getlogin(values);
                                    }}
                                    wrapperCol={{
                                        span: 18
                                    }}
                                    labelCol={{
                                        span: 6
                                    }}
                                >
                                    <Form.Item
                                        name={'email'}
                                        // label={'帳號'}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請記得填寫帳號喔'
                                            }
                                        ]}
                                    >
                                        <Input placeholder='帳號' />
                                    </Form.Item>
                                    <Form.Item
                                        name={'password'}
                                        // label={'密碼'}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請記得填寫密碼喔'
                                            }
                                        ]}
                                    >
                                        <Row gutter={[8, 8]} align={'bottom'}>
                                            <Col md={{ span: 18 }} sm={{ span: 24 }}>
                                                <Input.Password placeholder='密碼' />
                                            </Col>
                                            <Col>
                                                <Tooltip title="忘記密碼嗎？點此進入">
                                                    <a href='/Forget_Password'>忘記密碼</a>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    {/* <Form.Item
                                        name={'password'}
                                        // label={'驗證碼'}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請記得填寫驗證碼喔'
                                            }
                                        ]}
                                    >
                                        <Row gutter={10} align={'middle'}>
                                            <Col span={12}>
                                                <Input placeholder='驗證碼' />
                                            </Col>
                                            <Col span={10} style={{ backgroundColor: "bisque", width: "100px" }}>
                                                <label >1244</label>
                                            </Col>
                                            <Col span={2}>
                                                <RedoOutlined />
                                            </Col>
                                        </Row>
                                    </Form.Item> */}
                                    <Form.Item>
                                        <Row gutter={[24, 16]} justify={'center'}>
                                            <Col>
                                                <Button className='btn' htmlType="submit"
                                                    size='large'
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={() => {
                                                        form.validateFields()
                                                            .then(() => {
                                                                // message.success('123')
                                                                form.submit();
                                                                // navigate('/Debt_Information')
                                                            })
                                                            .catch(() => {
                                                                // message.success('456')
                                                            })
                                                    }}
                                                // onClick={e => navigate('/Debt_Information')}
                                                >
                                                    登入
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button className='btn' htmlType="submit"
                                                    size='large'
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => navigate('/Register')}
                                                >
                                                    註冊
                                                </Button>
                                            </Col>
                                            {/* <Col>
                                                <Button
                                                    className='btn'
                                                    size='large'
                                                    style={{ backgroundColor: 'white' }} onClick={e => window.location.href = "https://reurl.cc/klWk7K"}>以GMAIL方式登入</Button></Col> */}
                                        </Row>

                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col md={{ span: 10 }} sm={{ span: 24 }}>
                                <img src="./money.png" width="100%" height="auto"></img>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </Col >
        </>
    )
}
export default Login;