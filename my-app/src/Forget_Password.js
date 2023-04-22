import React, { useEffect, useState } from 'react';
import { Form, Tooltip, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RollbackOutlined, HeartOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
const ForgetPassword = () => {
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        document.title = '高師大記債系統';
        document.body.style.backgroundColor = '#D7F5FF';
    }, [])
    const navigate = useNavigate();
    return (
        <>
            <Col span={24} style={{ padding: '80px' }}>
                <Row>
                    <Col><RollbackOutlined style={{ fontSize: '20px' }} onClick={e => navigate(-1)} /></Col>
                </Row>
                <Row gutter={[8, 40]} justify={'center'}>
                    <Col>
                        <div style={{ fontSize: '3rem', fontWeight: 500, textAlign: 'center' }}>忘記密碼</div>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                            <Col md={{ span: 10 }} sm={{ span: 24 }}>
                                <Row gutter={[16, 24]} justify={'center'} align={'middle'}>
                                    {/* <Form
                                    // form={form}
                                    onFinish={(values) => {
                                        console.log(values)
                                    }}
                                    wrapperCol={{
                                        span: 18
                                    }}
                                    labelCol={{
                                        span: 6
                                    }}
                                >
                                    <Form.Item
                                        name={'account'}
                                        // label={'帳號'}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請記得填寫電子郵件喔'
                                            }
                                        ]}
                                    >
                                        <Row gutter={[8, 16]}>
                                            <Input placeholder='請輸入您的電子郵件' />
                                            <Col >
                                                <Button htmlType="submit"
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                // onClick={e => navigate('/Register')}
                                                >
                                                    傳送驗證碼至電子郵件
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item
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
                                            <Col span={6}>
                                                <Input placeholder='驗證碼' />
                                            </Col>

                                            <Col>
                                                <Button htmlType="submit"
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => navigate(-1)}
                                                >
                                                    驗證驗證碼
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item>
                                        <Row gutter={[24, 16]} justify={'center'}>
                                            <Col>
                                                <Button htmlType="submit"
                                                    size='large'
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => navigate(-1)}
                                                >
                                                    確認
                                                </Button>
                                            </Col>
                                            <Col>
                                                <Button htmlType="submit"
                                                    size='large'
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => navigate(-1)}
                                                >
                                                    返回登入
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Form.Item>
                                </Form> */}
                                    <Col span={22}>
                                        <Row gutter={[10, 10]}>
                                            <Col>
                                                <Input placeholder='請輸入您的電子郵件' />
                                            </Col>
                                            <Col>
                                                <Button htmlType="submit"
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                // onClick={e => navigate('/Register')}
                                                >
                                                    傳送驗證碼至電子郵件
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={22}>
                                        <Row gutter={[10, 10]}>
                                            <Col>
                                                <Input placeholder='驗證碼' />
                                            </Col>

                                            <Col>
                                                <Button htmlType="submit"
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => setSuccess(true)}
                                                >
                                                    驗證驗證碼
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {success ? <><Col span={22}>
                                        <Form
                                            // form={form}
                                            onFinish={(values) => {
                                                console.log(values)
                                            }}
                                            wrapperCol={{
                                                span: 18
                                            }}
                                            labelCol={{
                                                span: 6
                                            }}
                                        >
                                            <Form.Item
                                                name={'password'}
                                                // label={'驗證碼'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '請記得填寫密碼喔'
                                                    }
                                                ]}
                                            >
                                                <Input.Password placeholder='請輸入新密碼' />
                                            </Form.Item>
                                            <Form.Item
                                                name={'password'}
                                                // label={'驗證碼'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '請記得填寫密碼喔'
                                                    }
                                                ]}
                                            >
                                                <Input.Password placeholder='請再次輸入新密碼' />
                                            </Form.Item>
                                            <Form.Item>
                                                <Row gutter={[24, 16]} justify={'center'}>
                                                    <Col>
                                                        <Button htmlType="submit"
                                                            size='large'
                                                            style={{ backgroundColor: '#B3B9F0' }}
                                                        // onClick={() => {
                                                        // form.validateFields()
                                                        //     .then(() => {
                                                        //         message.success('123')
                                                        //         form.submit();
                                                        //     })
                                                        //     .catch(() => {
                                                        //         message.success('456')
                                                        //     })
                                                        // }}
                                                        >
                                                            確認送出
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </Form.Item>
                                        </Form>
                                    </Col></> : null}
                                </Row>
                            </Col>
                            <Col md={{ span: 10 }} sm={{ span: 24 }}>
                                <img src="./forget.png" width="100%" height="auto"></img>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </Col >
        </>
    )
}
export default ForgetPassword;