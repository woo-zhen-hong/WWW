import React, { useEffect, useState } from 'react';
import { Form, Tooltip, Layout, Modal, Row, Col, Button, DatePicker, Radio, Card, Input, Popconfirm, Checkbox, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RollbackOutlined, HeartOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import axios from 'axios';
const ForgetPassword = () => {
    const [success, setSuccess] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    const [password_show, set_password_show] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        document.title = '高師大記債系統';
        document.body.style.backgroundColor = '#D7F5FF';
    }, [])
    const navigate = useNavigate();
    const handleOnCheck = () => {
        axios
            .post('/backend/forget_password.php', { email: email })
            .then((response) => {
                if (response.data.status == 'success') {
                    setPassword(response.data.password);
                    set_password_show(true);
                }
            })
    }
    return (
        <>
            <Modal
                style={{ pointerEvents: 'auto' }}
                open={password_show}
                onCancel={() => set_password_show(false)}
                setOpen={set_password_show}
                width={250}
                footer={false}
                className="modalStyle2"
                wrapClassName={"modalStyle2"}
                modalRender={(e) => <>
                    <Col span={24} style={{ backgroundColor: '#D7F5FF' }}>
                        <Row justify={'center'} align={'middle'} style={{ padding: '10px' }}>
                            <Col style={{ fontSize: '1.2rem', fontWeight: 400 }}>提醒通知</Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ backgroundColor: '#ffffff', padding: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
                        <Row gutter={[8, 16]} justify={'center'}>
                            <Col span={24}>
                                你的密碼為：{password}
                            </Col>
                            <Col>
                                <Button className='btn' style={{ background: '#D7F5FF', color: 'black' }} onClick={(e) => set_password_show(false)} block>返回</Button>
                            </Col>
                        </Row>
                    </Col>
                </>}
                centered
            />
            <Modal
                style={{ pointerEvents: 'auto' }}
                open={modalSuccess}
                onCancel={() => setModalSuccess(false)}
                setOpen={setModalSuccess}
                width={250}
                footer={false}
                className="modalStyle2"
                wrapClassName={"modalStyle2"}
                modalRender={(e) => <>
                    <Col span={24} style={{ backgroundColor: '#D7F5FF' }}>
                        <Row justify={'center'} align={'middle'} style={{ padding: '10px' }}>
                            <Col style={{ fontSize: '1.2rem', fontWeight: 400 }}>更新成功</Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ backgroundColor: '#ffffff', padding: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
                        <Row gutter={[8, 16]} justify={'center'}>
                            <Col span={24}>
                                更新成功，點擊返回進行登入～
                            </Col>
                            <Col>
                                <Button className='btn' style={{ background: '#D7F5FF', color: 'black' }} onClick={(e) => setModalSuccess(false)} block>返回</Button>
                            </Col>
                        </Row>
                    </Col>
                </>}
                centered
            />
            <Modal
                style={{ pointerEvents: 'auto' }}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                setOpen={setModalOpen}
                width={250}
                footer={false}
                className="modalStyle2"
                wrapClassName={"modalStyle2"}
                modalRender={(e) => <>
                    <Col span={24} style={{ backgroundColor: '#D7F5FF' }}>
                        <Row justify={'center'} align={'middle'} style={{ padding: '10px' }}>
                            <Col style={{ fontSize: '1.2rem', fontWeight: 400 }}>寄送成功</Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ backgroundColor: '#ffffff', padding: '20px', fontSize: '1.2rem', textAlign: 'center' }}>
                        <Row gutter={[8, 16]} justify={'center'}>
                            <Col span={24}>
                                已寄送驗證碼至您的信箱，請盡快至信箱進行確認～～
                            </Col>
                            <Col>
                                <Button className='btn' style={{ background: '#D7F5FF', color: 'black' }} onClick={(e) => setModalOpen(false)} block>返回</Button>
                            </Col>
                        </Row>
                    </Col>
                </>}
                centered
            />
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
                                    <Col span={22}>
                                        <Row gutter={[10, 10]}>
                                            <Col>
                                                <Input placeholder='請輸入您的電子郵件'
                                                    onChange={e => setEmail(e.target.value)} />
                                            </Col>
                                            <Col>
                                                <Button className='btn' htmlType="submit"
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    // onClick={e => setModalOpen(true)}
                                                    onClick={handleOnCheck}
                                                >
                                                    {/* 傳送驗證碼至電子郵件 */}
                                                    確定
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    {/* <Col span={22}>
                                        <Row gutter={[10, 10]}>
                                            <Col>
                                                <Input placeholder='驗證碼' />
                                            </Col>

                                            <Col>
                                                <Button className='btn' htmlType="submit"
                                                    style={{ backgroundColor: '#B3B9F0' }}
                                                    onClick={e => setSuccess(true)}
                                                >
                                                    驗證驗證碼
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col> */}
                                    {/* {success ? <><Col span={22}>
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
                                                name={'password2'}
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
                                                        <Button className='btn' htmlType="submit"
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
                                                            onClick={e => setModalSuccess(true)}
                                                        >
                                                            確認送出
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </Form.Item>
                                        </Form>
                                    </Col></> : null} */}
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