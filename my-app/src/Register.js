import React, { useEffect, useState } from 'react';
import { Form, Upload, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RedoOutlined, HeartOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
const Register = () => {
    useEffect(() => {
        document.title = '高師大記債系統';
        document.body.style.backgroundColor = '#D7F5FF';
    }, [])
    const navigate = useNavigate();
    return (
        <>
            <Col span={24} style={{ padding: '80px' }}>
                <Row gutter={[8, 40]} justify={'center'}>
                    <Col>
                        <div style={{ fontSize: '3rem', fontWeight: 700, textAlign: 'center' }}>歡迎加入</div>
                    </Col>
                    <Col span={24}>
                        <Row gutter={[16, 16]} justify={'center'} align={'middle'}>
                            <Col md={{ span: 10 }} sm={{ span: 24 }}>
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
                                        name={'account'}
                                        // label={'帳號'}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請記得填寫電子郵件喔'
                                            }
                                        ]}
                                    >
                                        <Input placeholder='請輸入您的電子郵件' />
                                    </Form.Item>
                                    <Form.Item
                                        name={'password'}
                                        // label={'密碼'}
                                        rules={[
                                            {
                                                required: true,
                                                message: '請記得填寫帳號喔'
                                            }
                                        ]}
                                    >
                                        <Input placeholder='請輸入帳號名稱' />
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
                                        <Input.Password placeholder='請輸入密碼' />
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
                                        <Input.Password placeholder='請再次輸入密碼' />
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
                                            <Col>
                                                <Button htmlType="submit"
                                                    size='large'
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => navigate(-1)}
                                                >
                                                    返回
                                                </Button>
                                            </Col>
                                        </Row>

                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col md={{ span: 10 }} sm={{ span: 24 }}>
                                <img src="./register.png" width="100%" height="auto"></img>
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </Col >
        </>
    )
}
export default Register;